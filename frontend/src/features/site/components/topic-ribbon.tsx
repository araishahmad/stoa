"use client";

import { useState, useSyncExternalStore } from "react";
import { LuAsterisk, LuPause, LuPlay } from "react-icons/lu";
import styles from "./topic-ribbon.module.css";

const topics = ["Technology", "Relationships", "Culture", "Stay curious"];
const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToMotion(onChange: () => void) {
  const preference = window.matchMedia(motionQuery);
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

function motionIsAllowed() { return !window.matchMedia(motionQuery).matches; }
function serverMotionIsAllowed() { return false; }

export function TopicRibbon({ className }: { className?: string }) {
  const motionAllowed = useSyncExternalStore(subscribeToMotion, motionIsAllowed, serverMotionIsAllowed);
  const [paused, setPaused] = useState(false);
  const running = motionAllowed && !paused;

  return <div className={`${styles.ribbon}${className ? ` ${className}` : ""}`} data-running={running}>
    <div className={styles.viewport} aria-hidden="true">
      <div className={styles.track}>
        {[0, 1].map(copy => <div className={styles.group} key={copy}>
          {topics.map(topic => <span className={styles.topic} key={topic}>{topic}<LuAsterisk size={24} strokeWidth={1.5} /></span>)}
        </div>)}
      </div>
    </div>
    <button
      className={styles.control}
      type="button"
      onClick={() => setPaused(previous => !previous)}
      disabled={!motionAllowed}
      aria-label={!motionAllowed ? "Topic animation off: reduced motion" : paused ? "Resume topic animation" : "Pause topic animation"}
      title={!motionAllowed ? "Animation stays still for your motion preference" : undefined}
    >
      {paused || !motionAllowed ? <LuPlay size={15} aria-hidden="true" /> : <LuPause size={15} aria-hidden="true" />}
      <span>{!motionAllowed ? "Motion off" : paused ? "Resume" : "Pause"}</span>
    </button>
  </div>;
}
