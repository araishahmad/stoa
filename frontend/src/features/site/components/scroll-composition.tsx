"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** A one-time paper-fan settle; layout and content never depend on JavaScript. */
export function ScrollComposition({ children, className }: { children: ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | null = null;
    let played = false;
    const animations = new Set<Animation>();

    function cancelAnimations() {
      for (const animation of animations) animation.cancel();
      animations.clear();
    }

    function observeComposition() {
      if (!container || played || preference.matches) return;
      observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= .15)
          || preference.matches || played) return;
        played = true;
        observer?.disconnect();
        // Never move a link while a keyboard user is interacting with it.
        if (container.contains(document.activeElement)) return;
        Array.from(container.children).forEach((child, index) => {
          if (!(child instanceof HTMLElement) || typeof child.animate !== "function") return;
          const animation = child.animate([
            { transform: `translateY(20px) rotate(${index % 2 === 0 ? -3 : 3}deg) scale(.98)` },
            { transform: "translateY(0) rotate(0deg) scale(1)" },
          ], {
            duration: 650,
            delay: index * 80,
            easing: "cubic-bezier(.22, 1, .36, 1)",
            fill: "backwards",
          });
          animations.add(animation);
          animation.onfinish = () => { animations.delete(animation); };
        });
      }, { threshold: .15 });
      observer.observe(container);
    }

    function handlePreferenceChange() {
      observer?.disconnect();
      observer = null;
      cancelAnimations();
      if (!preference.matches) observeComposition();
    }

    observeComposition();
    preference.addEventListener("change", handlePreferenceChange);
    container.addEventListener("focusin", cancelAnimations);
    container.addEventListener("pointerdown", cancelAnimations);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", handlePreferenceChange);
      container.removeEventListener("focusin", cancelAnimations);
      container.removeEventListener("pointerdown", cancelAnimations);
      cancelAnimations();
    };
  }, []);

  return <div ref={containerRef} className={className}>{children}</div>;
}
