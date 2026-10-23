"use client";

import { useState, type FormEvent } from "react";
import { LuCheck, LuEye, LuLockKeyhole, LuSave, LuSquarePen } from "react-icons/lu";
import type { StoryCategory } from "@/features/site/stories/types";
import { useAdminPreview } from "../shared/preview-provider";
import type { AdminPost } from "../shared/types";
import styles from "../shared/admin.module.css";

export function StoryEditor({ initialPost, categories }: { initialPost: AdminPost; categories: readonly StoryCategory[] }) {
  const { drafts, saveDraft } = useAdminPreview();
  const [post, setPost] = useState(drafts[initialPost.id] ?? initialPost);
  const [preview, setPreview] = useState(false);
  const [message, setMessage] = useState("");
  const wordCount = post.body.trim() ? post.body.trim().split(/\s+/).length : 0;

  function updateField(field: "title" | "excerpt" | "body", value: string) {
    setPost((current) => ({ ...current, [field]: value }));
    setMessage("");
  }

  function updateCategory(value: string) {
    const category = categories.find((option) => option === value);
    if (!category) return;
    setPost((current) => ({ ...current, category }));
    setMessage("");
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (post.title.trim().length < 3) {
      setMessage("Give your story a title of at least 3 characters before saving.");
      return;
    }
    if (post.body.trim().length < 20) {
      setMessage("Add at least 20 characters to your story before saving a draft.");
      return;
    }
    if (!categories.includes(post.category)) {
      setMessage("Choose a category from the story details before saving.");
      return;
    }
    const savedPost: AdminPost = { ...post, title: post.title.trim(), excerpt: post.excerpt.trim(), body: post.body.trim(), status: "Draft" };
    saveDraft(savedPost);
    setPost(savedPost);
    setMessage("Saved for this preview; reloading resets changes. Leaving the admin area also clears this draft.");
  }

  return (
    <form onSubmit={handleSave}>
      <div className={styles.editorActions}>
        <button type="submit" className="button button-primary"><LuSave aria-hidden="true" /> Save draft</button>
        <button type="button" className="button button-secondary" aria-pressed={preview} onClick={() => setPreview((current) => !current)}>{preview ? <LuSquarePen aria-hidden="true" /> : <LuEye aria-hidden="true" />}{preview ? "Back to writing" : "Preview story"}</button>
      </div>
      <p className={styles.formMessage} role="status" aria-live="polite">{message}</p>
      <div className={styles.editorLayout}>
        <div className={`${styles.panel} ${styles.editorPanel}`}>
          {preview ? (
            <section className={styles.articlePreview} aria-label="Unsaved story preview">
              <span className="pill">{post.category}</span>
              <h2>{post.title || "Your story title"}</h2>
              <p>{post.excerpt || "Your introduction will appear here."}</p>
              <p className={styles.panelDescription}>Stoa editorial preview · {Math.max(1, Math.ceil(wordCount / 220))} min read</p>
              <div className={styles.previewBody}>{post.body || "A blank page, full of possibility. Your story will appear here as you write."}</div>
            </section>
          ) : (
            <>
              <div className={styles.field}><label htmlFor="story-title">Story title</label><input id="story-title" className={styles.titleInput} value={post.title} onChange={(event) => updateField("title", event.target.value)} placeholder="A story worth spending time with" maxLength={160} /></div>
              <div className={styles.field}><label htmlFor="story-excerpt">A short introduction</label><textarea id="story-excerpt" rows={3} value={post.excerpt} onChange={(event) => updateField("excerpt", event.target.value)} placeholder="Tell readers what they’ll discover…" maxLength={350} aria-describedby="excerpt-note" /><small id="excerpt-note">Shown beneath the title and on story cards. Up to 350 characters.</small></div>
              <div className={styles.field}><label htmlFor="story-body">Your story</label><textarea className={styles.bodyInput} id="story-body" rows={16} value={post.body} onChange={(event) => updateField("body", event.target.value)} placeholder="Start with something you noticed." maxLength={50000} aria-describedby="body-note" /><small id="body-note">Plain text editor for this prototype. Separate paragraphs with a blank line.</small></div>
            </>
          )}
          <div className={styles.wordCount}><span>{wordCount.toLocaleString("en")} words</span><span>Only stored in this admin preview</span></div>
        </div>
        <aside className={styles.editorAside} aria-label="Story options">
          <section className={styles.panel}>
            <h2>Story details</h2>
            <div className={styles.field}><label htmlFor="story-category">Category</label><select id="story-category" value={post.category} onChange={(event) => updateCategory(event.target.value)}>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select></div>
            <span className={styles.status} data-status="Draft">Preview draft</span>
            <p>Saving updates this preview session. It does not change any article on the public site.</p>
          </section>
          <section className={styles.panel}>
            <h2>Before you publish</h2>
            <ul className={styles.checklist}>
              <li><LuCheck size={15} aria-hidden="true" /><div><strong>Make it original</strong><p>Add your own observations and perspective.</p></div></li>
              <li><LuCheck size={15} aria-hidden="true" /><div><strong>Check every detail</strong><p>Verify claims and credit your sources.</p></div></li>
              <li><LuCheck size={15} aria-hidden="true" /><div><strong>Read it as a reader</strong><p>Check clarity, images, and accessibility.</p></div></li>
            </ul>
            <button className="button button-secondary" type="button" disabled aria-describedby="publishing-note"><LuLockKeyhole aria-hidden="true" /> Publish story</button>
            <p id="publishing-note">Publishing is unavailable in the static prototype. Authentication and a content backend must be connected first.</p>
          </section>
        </aside>
      </div>
    </form>
  );
}
