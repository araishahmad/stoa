"use client";

import { useState } from "react";
import { LuArrowUpRight, LuCheck, LuRotateCcw } from "react-icons/lu";
import styles from "./contact.module.css";

type Fields = { name: string; email: string; topic: string; message: string; website: string };
type Errors = Partial<Record<keyof Fields | "acknowledgement", string>>;
const emptyFields: Fields = { name: "", email: "", topic: "Story idea", message: "", website: "" };

export function ContactPreview() {
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [acknowledged, setAcknowledged] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [previewed, setPreviewed] = useState(false);

  function updateField(field: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function previewMessage() {
    const nextErrors: Errors = {};
    if (fields.name.trim().length < 2) nextErrors.name = "Enter a sample name with at least 2 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) nextErrors.email = "Enter a valid sample email, such as reader@example.com.";
    if (fields.message.trim().length < 20) nextErrors.message = "Write at least 20 characters for your sample message.";
    if (!acknowledged) nextErrors.acknowledgement = "Confirm that you understand this is a preview.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      document.getElementById(`contact-${Object.keys(nextErrors)[0]}`)?.focus();
      return;
    }
    // The honeypot has the same visible outcome, and nothing is transmitted.
    setFields(emptyFields);
    setPreviewed(true);
  }

  function resetPreview() {
    setPreviewed(false);
    setAcknowledged(false);
    setErrors({});
  }

  if (previewed) {
    return (
      <div className={styles.formPanel}>
        <div className={styles.success} role="status">
          <span className={styles.successIcon}><LuCheck aria-hidden="true" /></span>
          <span className="pill">Preview complete</span>
          <h2>Your message<br />looks good.</h2>
          <p>Your sample details passed the local checks. No message was sent, no subscription was created, and nothing was saved. The entries have been cleared from this preview.</p>
          <button type="button" className="button button-secondary" onClick={resetPreview}><LuRotateCcw aria-hidden="true" />Try another sample</button>
        </div>
      </div>
    );
  }

  return (
    <div role="form" aria-labelledby="contact-form-heading" aria-describedby="contact-form-note" className={styles.formPanel}>
      <div className={styles.formHeading}><h2 id="contact-form-heading">Start a conversation.</h2><span className="pill">Preview</span></div>
      <p id="contact-form-note" className={styles.formNote}>Try the fields with sample details. All fields are required; nothing is sent.</p>
      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label htmlFor="contact-name">Your name</label>
          <input id="contact-name" value={fields.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Sample reader" maxLength={80} autoComplete="off" aria-required="true" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />
          {errors.name && <p id="contact-name-error" className={styles.fieldError}>{errors.name}</p>}
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-email">Email address</label>
          <input id="contact-email" type="email" value={fields.email} onChange={(event) => updateField("email", event.target.value)} placeholder="reader@example.com" maxLength={254} autoComplete="off" aria-required="true" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />
          {errors.email && <p id="contact-email-error" className={styles.fieldError}>{errors.email}</p>}
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="contact-topic">What’s on your mind?</label>
        <select id="contact-topic" value={fields.topic} onChange={(event) => updateField("topic", event.target.value)}>
          <option>Story idea</option><option>Feedback or correction</option><option>Privacy question</option><option>General enquiry</option>
        </select>
      </div>
      <div className={styles.field}>
        <div className={styles.messageLabel}><label htmlFor="contact-message">Your message</label><span>{fields.message.length}/2,000</span></div>
        <textarea id="contact-message" value={fields.message} onChange={(event) => updateField("message", event.target.value)} placeholder="I’d love to see a story about…" rows={6} maxLength={2000} aria-required="true" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} />
        {errors.message && <p id="contact-message-error" className={styles.fieldError}>{errors.message}</p>}
      </div>
      <div className={styles.honeypot} aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" value={fields.website} onChange={(event) => updateField("website", event.target.value)} tabIndex={-1} autoComplete="off" /></div>
      <label className={styles.acknowledgement} htmlFor="contact-acknowledgement">
        <input id="contact-acknowledgement" type="checkbox" checked={acknowledged} onChange={(event) => { setAcknowledged(event.target.checked); setErrors((current) => ({ ...current, acknowledgement: undefined })); }} aria-required="true" aria-invalid={Boolean(errors.acknowledgement)} aria-describedby={errors.acknowledgement ? "contact-acknowledgement-error" : undefined} />
        <span>I understand this is a preview and my message will not be sent.</span>
      </label>
      {errors.acknowledgement && <p id="contact-acknowledgement-error" className={styles.fieldError}>{errors.acknowledgement}</p>}
      <button className={`button button-primary ${styles.submit}`} type="button" onClick={previewMessage}>Preview message<LuArrowUpRight aria-hidden="true" /></button>
      <p className={styles.bottomNote}>No account, cookies, or mailing-list signup.</p>
    </div>
  );
}
