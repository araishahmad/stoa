import { LuArrowUpRight, LuBookmarkPlus } from "react-icons/lu";
import { siteConfig } from "@/lib/site-config";
import { preferredSourceHref } from "./preferred-source-link";
import styles from "./preferred-source.module.css";

export function PreferredSource({ variant = "compact" }: { variant?: "compact" | "article" }) {
  const href = preferredSourceHref(siteConfig.url, siteConfig.preferredSourceEnabled);
  const content = <>
    <span className={styles.mark} aria-hidden="true"><LuBookmarkPlus size={22} /></span>
    <span className={styles.buttonCopy}><span>Google Search</span><strong>Add Stoa as a preferred source</strong></span>
    <LuArrowUpRight size={18} aria-hidden="true" />
  </>;

  return <aside className={`${styles.root} ${variant === "article" ? styles.article : styles.compact}`} aria-label="Stoa on Google">
    {variant === "article" && <div className={styles.introduction}>
      <h2>Keep a little Stoa in your search.</h2>
      <p>Choose Stoa as a preferred source in your Google Search experience.</p>
    </div>}
    <div className={styles.action}>
      {href ? <a className={styles.badge} href={href} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer">
        {content}<span className="sr-only"> (opens Google in a new tab)</span>
      </a> : <button type="button" className={styles.badge} disabled>{content}</button>}
      <p className={styles.note}>{href ? "Opens Google in a new tab. You choose your preferences there." : "Coming at launch. This preview does not change your Google preferences."}</p>
    </div>
  </aside>;
}
