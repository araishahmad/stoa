import Link from "next/link";
import { LuArrowUpRight, LuMessageCircle, LuPenLine, LuShieldCheck } from "react-icons/lu";
import { SiteContainer } from "@/components/layout/site-container";
import { ContactPreview } from "./contact-preview";
import styles from "./contact.module.css";

export function ContactView() {
  return (
    <SiteContainer>
      <header className={styles.header}>
        <p className="eyebrow">Get in touch</p>
        <h1>Good stories start<br />with a conversation.</h1>
        <p>An idea we should explore, a detail we should correct, or a perspective we haven’t considered. We’re here for all of it.</p>
      </header>
      <div className={styles.layout}>
        <div className={styles.introduction}>
          <h2>What’s on your mind?</h2>
          <p>Thoughtful publications grow through conversation. The contact experience is designed for a few kinds of notes.</p>
          <div className={styles.reasons}>
            <div><LuPenLine aria-hidden="true" /><div><h3>Stories & ideas</h3><p>A subject you would like us to explore, or an idea for the journal.</p></div></div>
            <div><LuMessageCircle aria-hidden="true" /><div><h3>Feedback & corrections</h3><p>Something we could explain more clearly or get right.</p></div></div>
            <div><LuShieldCheck aria-hidden="true" /><div><h3>Privacy & general enquiries</h3><p>Questions about your choices and the way the website works.</p></div></div>
          </div>
          <aside className={styles.previewNote}>
            <strong>This is a contact preview.</strong>
            <p>There is no connected inbox yet. Please use sample details to try the form. It checks entries locally and does not send or save a message.</p>
            <Link className="text-link" href="/privacy">Read the draft privacy policy<LuArrowUpRight aria-hidden="true" /></Link>
          </aside>
        </div>
        <ContactPreview />
      </div>
    </SiteContainer>
  );
}
