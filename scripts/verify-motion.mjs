// Source-level math, SSR and mocked browser-API checks. These do not launch a
// browser or establish actual animation rendering, hydration, focus or scrolling.
import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = fileURLToPath(new URL("../", import.meta.url));
const componentRoot = path.join(root, "frontend/src/features/site/components");
const results = [];

function loadComponent(name, globals = {}, reactMock) {
  const filename = path.join(componentRoot, `${name}.tsx`);
  const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
    fileName: filename,
  }).outputText;
  const exported = {};
  vm.runInNewContext(compiled, {
    exports: exported,
    require(name) {
      if (name.endsWith(".css")) return {};
      if (name === "react" && reactMock) return reactMock;
      return require(name);
    },
    ...globals,
  }, { filename });
  return exported;
}

function check(name, run) {
  try {
    run();
    results.push({ name, passed: true });
    console.log(`PASS ${name}`);
  } catch (error) {
    results.push({ name, passed: false });
    console.error(`FAIL ${name}: ${error instanceof Error ? error.message : error}`);
  }
}

check("Art tilt is centered, bounded and safe for invalid coordinates", () => {
  const { calculateArtTilt } = loadComponent("interactive-art");
  // JSON normalizes cross-realm objects and the harmless negative-zero result.
  const tilt = (x, y, bounds) => JSON.parse(JSON.stringify(calculateArtTilt(x, y, bounds)));
  const bounds = { left: 10, top: 20, width: 100, height: 200 };
  assert.deepEqual(tilt(60, 120, bounds), { x: 0, y: 0 });
  assert.deepEqual(tilt(10, 20, bounds), { x: 3, y: -3 });
  assert.deepEqual(tilt(110, 220, bounds), { x: -3, y: 3 });
  assert.deepEqual(tilt(-900, 900, bounds), { x: -3, y: -3 });
  assert.deepEqual(tilt(60, 120, { ...bounds, width: 0 }), { x: 0, y: 0 });
  assert.deepEqual(tilt(60, 120, { ...bounds, height: -1 }), { x: 0, y: 0 });
  assert.deepEqual(tilt(Infinity, 120, bounds), { x: 0, y: 0 });
  assert.deepEqual(tilt(60, NaN, bounds), { x: 0, y: 0 });
});

check("Ribbon SSR is static with decorative repeats hidden from assistive technology", () => {
  const { TopicRibbon } = loadComponent("topic-ribbon");
  const html = renderToStaticMarkup(React.createElement(TopicRibbon));
  assert.match(html, /data-running="false"/);
  assert.match(html, /aria-hidden="true"/);
  assert.match(html, /<button[^>]+disabled=""/);
  assert.match(html, /aria-label="Topic animation off/);
  assert.match(html, /Motion off/);
});

check("Art and topic composition SSR preserve visible content and links exactly once", () => {
  const { InteractiveArt } = loadComponent("interactive-art");
  const { ScrollComposition } = loadComponent("scroll-composition");
  for (const Component of [InteractiveArt, ScrollComposition]) {
    const html = renderToStaticMarkup(React.createElement(Component, { className: "layout-class" },
      React.createElement("a", { href: "/blog?category=Technology" }, "Visible server content")));
    assert.match(html, /layout-class/);
    assert.match(html, /href="\/blog\?category=Technology"/);
    assert.equal((html.match(/Visible server content/g) || []).length, 1);
    assert.doesNotMatch(html, /opacity|hidden/);
  }
});

function createScrollFixture({ reduced = false, supportsObserver = true, supportsAnimation = true } = {}) {
  const observers = [];
  const calls = [];
  const listeners = new Map();
  let effect;
  class Element {
    animate(frames, options) {
      const animation = { cancelled: false, cancel() { this.cancelled = true; } };
      calls.push({ frames, options, animation });
      return animation;
    }
  }
  const children = [new Element(), new Element(), new Element()];
  if (!supportsAnimation) children.forEach(child => { child.animate = undefined; });
  const container = {
    children,
    contains: () => false,
    addEventListener: (event, callback) => listeners.set(event, callback),
    removeEventListener: event => listeners.delete(event),
  };
  const preference = {
    matches: reduced,
    addEventListener: (event, callback) => listeners.set(`media:${event}`, callback),
    removeEventListener: event => listeners.delete(`media:${event}`),
  };
  class Observer {
    constructor(callback, options) { this.callback = callback; this.options = options; observers.push(this); }
    observe(node) { assert.equal(node, container); }
    disconnect() { this.disconnected = true; }
    emit(ratio) { this.callback([{ isIntersecting: ratio > 0, intersectionRatio: ratio }]); }
  }
  const { ScrollComposition } = loadComponent("scroll-composition", {
    window: { matchMedia: () => preference },
    IntersectionObserver: supportsObserver ? Observer : undefined,
    HTMLElement: Element,
    document: { activeElement: null },
  }, { useEffect: callback => { effect = callback; }, useRef: () => ({ current: container }) });
  ScrollComposition({ children: "server content", className: "topics" });
  const cleanup = effect();
  return { observers, calls, listeners, preference, container, cleanup };
}

check("Scroll settle uses the intersection threshold, finite stagger and one-time playback", () => {
  const fixture = createScrollFixture();
  assert.equal(fixture.observers[0].options.threshold, .15);
  fixture.observers[0].emit(.14);
  assert.equal(fixture.calls.length, 0);
  fixture.observers[0].emit(.15);
  assert.equal(fixture.calls.length, 3);
  assert.deepEqual(fixture.calls.map(call => call.options.delay), [0, 80, 160]);
  assert.ok(fixture.calls.every(call => call.options.duration === 650 && call.options.fill === "backwards"));
  assert.match(fixture.calls[0].frames[0].transform, /rotate\(-3deg\)/);
  assert.match(fixture.calls[1].frames[0].transform, /rotate\(3deg\)/);
  assert.ok(fixture.calls.every(call => call.frames.every(frame => !("opacity" in frame))));
  fixture.observers[0].emit(1);
  assert.equal(fixture.calls.length, 3);
  fixture.cleanup();
  assert.ok(fixture.calls.every(call => call.animation.cancelled));
  assert.equal(fixture.listeners.size, 0);
});

check("Reduced-motion preference prevents playback and cancels running animations", () => {
  const fixture = createScrollFixture({ reduced: true });
  assert.equal(fixture.observers.length, 0);
  fixture.preference.matches = false;
  fixture.listeners.get("media:change")();
  fixture.observers[0].emit(.3);
  assert.equal(fixture.calls.length, 3);
  fixture.preference.matches = true;
  fixture.listeners.get("media:change")();
  assert.ok(fixture.calls.every(call => call.animation.cancelled));
  fixture.cleanup();
  assert.equal(fixture.listeners.size, 0);
});

check("Keyboard focus and pointer interaction cancel the settling animation", () => {
  for (const event of ["focusin", "pointerdown"]) {
    const fixture = createScrollFixture();
    fixture.observers[0].emit(.3);
    fixture.listeners.get(event)();
    assert.ok(fixture.calls.every(call => call.animation.cancelled));
    fixture.cleanup();
  }
  const focused = createScrollFixture();
  focused.container.contains = () => true;
  focused.observers[0].emit(.3);
  assert.equal(focused.calls.length, 0);
  focused.cleanup();
});

check("Missing animation or observer APIs leave content static without errors", () => {
  const withoutObserver = createScrollFixture({ supportsObserver: false });
  assert.equal(withoutObserver.observers.length, 0);
  assert.equal(withoutObserver.calls.length, 0);
  assert.equal(withoutObserver.cleanup, undefined);
  const withoutAnimation = createScrollFixture({ supportsAnimation: false });
  withoutAnimation.observers[0].emit(.3);
  assert.equal(withoutAnimation.calls.length, 0);
  withoutAnimation.cleanup();
});

const passed = results.filter(result => result.passed).length;
console.log(`\n${passed}/${results.length} source-level motion check groups passed. Browser rendering and hydration are not tested here.`);
if (passed !== results.length) process.exitCode = 1;
