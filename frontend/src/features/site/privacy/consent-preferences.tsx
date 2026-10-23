"use client";

import { useState } from "react";
import Link from "next/link";
import { Dialog } from "@base-ui/react/dialog";
import { LuCheck, LuShieldCheck, LuX } from "react-icons/lu";
import styles from "./privacy.module.css";

const initialPreferences = { analytics: false, advertising: false };

export function ConsentPreferences() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(initialPreferences);
  const [draft, setDraft] = useState(initialPreferences);
  const [message, setMessage] = useState("");
  function save(preferences: typeof initialPreferences) {
    setSaved(preferences); setDraft(preferences); setOpen(false);
    setMessage("Preview preferences updated. No tracking is enabled; choices reset on reload.");
  }
  return <>
    <Dialog.Root open={open} onOpenChange={next => { setOpen(next); if (next) setDraft(saved); }}>
      <Dialog.Trigger className={styles.trigger}><LuShieldCheck size={15} /> Privacy choices</Dialog.Trigger>
      <Dialog.Portal><Dialog.Backdrop className="dialog-backdrop" /><Dialog.Popup className="dialog-popup">
        <div className="dialog-heading"><Dialog.Title>Your privacy, your choice</Dialog.Title><Dialog.Close className="icon-button" aria-label="Close privacy choices"><LuX size={18} /></Dialog.Close></div>
        <Dialog.Description className="dialog-description">This is a consent interface preview. Stoa currently sets no optional cookies and runs no advertising or analytics. Choices here are held in memory only.</Dialog.Description>
        <div className={styles.option}><div><strong>Essential functionality</strong><p>Page navigation and temporary interface state. No cookies are currently needed.</p></div><span className={styles.required}><LuCheck /> Active</span></div>
        <label className={styles.option}><div><strong>Analytics</strong><p>Preview permission for understanding readership. No analytics provider is connected.</p></div><input type="checkbox" role="switch" checked={draft.analytics} onChange={event => setDraft({ ...draft, analytics: event.target.checked })} aria-label="Allow analytics in this preview" /></label>
        <label className={styles.option}><div><strong>Personalized advertising</strong><p>Preview permission for relevant ads. No advertising provider is connected.</p></div><input type="checkbox" role="switch" checked={draft.advertising} onChange={event => setDraft({ ...draft, advertising: event.target.checked })} aria-label="Allow advertising in this preview" /></label>
        <p className={styles.note}>Nothing is activated by accepting. This preview is not a certified consent management platform. <Link href="/privacy" onClick={() => setOpen(false)}>Read the draft privacy policy</Link>.</p>
        <div className={styles.actions}><button className="button button-secondary" onClick={() => save(initialPreferences)}>Reject optional</button><button className="button button-secondary" onClick={() => save({ analytics: true, advertising: true })}>Accept optional</button></div>
        <button className={`button button-primary ${styles.save}`} onClick={() => save(draft)}>Save my choices</button>
      </Dialog.Popup></Dialog.Portal>
    </Dialog.Root>
    <span className={styles.saved} role="status">{message}</span>
  </>;
}
