"use client";

import { useCallback, useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import styles from "./interactive-art.module.css";

type ArtBounds = { left: number; top: number; width: number; height: number };
type ArtTilt = { x: number; y: number };

/** Pointer movement stays within three degrees, including out-of-bounds events. */
export function calculateArtTilt(clientX: number, clientY: number, bounds: ArtBounds): ArtTilt {
  if (![clientX, clientY, bounds.left, bounds.top, bounds.width, bounds.height].every(Number.isFinite)
    || bounds.width <= 0 || bounds.height <= 0) return { x: 0, y: 0 };

  const clamp = (value: number) => Math.max(-1, Math.min(1, value));
  return {
    x: -clamp(((clientY - bounds.top) / bounds.height - .5) * 2) * 3,
    y: clamp(((clientX - bounds.left) / bounds.width - .5) * 2) * 3,
  };
}

/** A client-only interaction around fully server-rendered artwork and links. */
export function InteractiveArt({ children, className }: { children: ReactNode; className?: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const animationFrame = useRef<number | null>(null);
  const motionEnabled = useRef(false);
  const nextTilt = useRef<ArtTilt>({ x: 0, y: 0 });

  const reset = useCallback(() => {
    if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current);
    animationFrame.current = null;
    frameRef.current?.removeAttribute("data-active");
    artRef.current?.style.removeProperty("--art-rotate-x");
    artRef.current?.style.removeProperty("--art-rotate-y");
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      motionEnabled.current = finePointer.matches && !reducedMotion.matches;
      if (!motionEnabled.current) reset();
    };
    const handleVisibility = () => { if (document.hidden) reset(); };
    updatePreference();
    finePointer.addEventListener("change", updatePreference);
    reducedMotion.addEventListener("change", updatePreference);
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      finePointer.removeEventListener("change", updatePreference);
      reducedMotion.removeEventListener("change", updatePreference);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", handleVisibility);
      reset();
    };
  }, [reset]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!motionEnabled.current || event.pointerType === "touch" || !frameRef.current) return;
    nextTilt.current = calculateArtTilt(event.clientX, event.clientY, frameRef.current.getBoundingClientRect());
    if (animationFrame.current !== null) return;
    animationFrame.current = requestAnimationFrame(() => {
      animationFrame.current = null;
      artRef.current?.style.setProperty("--art-rotate-x", `${nextTilt.current.x}deg`);
      artRef.current?.style.setProperty("--art-rotate-y", `${nextTilt.current.y}deg`);
      frameRef.current?.setAttribute("data-active", "true");
    });
  }

  return <div
    ref={frameRef}
    className={`${styles.frame}${className ? ` ${className}` : ""}`}
    onPointerMove={handlePointerMove}
    onPointerLeave={reset}
    onPointerCancel={reset}
    onBlurCapture={reset}
  ><div ref={artRef} className={styles.art}>{children}</div></div>;
}
