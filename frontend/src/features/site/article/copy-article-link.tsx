"use client";

import { useState } from "react";
import { LuCheck, LuLink } from "react-icons/lu";
import styles from "./article.module.css";

export function CopyArticleLink() {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}`);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <div className={styles.share}>
      <button type="button" onClick={copyLink} className={styles.copyButton}>
        {status === "copied" ? <LuCheck aria-hidden="true" /> : <LuLink aria-hidden="true" />}
        {status === "copied" ? "Link copied" : "Copy story link"}
      </button>
      <p role="status" className={status === "failed" ? styles.shareError : "sr-only"}>
        {status === "copied" && "The story link has been copied to your clipboard."}
        {status === "failed" && "Copying is unavailable. You can copy the address from your browser."}
      </p>
    </div>
  );
}
