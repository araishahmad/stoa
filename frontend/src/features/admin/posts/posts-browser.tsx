"use client";

import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useAdminPreview } from "../shared/preview-provider";
import { AdminStoryTable } from "../shared/story-table";
import type { AdminPost, AdminPostStatus } from "../shared/types";
import styles from "../shared/admin.module.css";

const filters: ("All stories" | AdminPostStatus)[] = ["All stories", "Published", "In review", "Draft"];

export function PostsBrowser({ initialPosts }: { initialPosts: AdminPost[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof filters)[number]>("All stories");
  const { drafts } = useAdminPreview();
  const posts = initialPosts.map((post) => drafts[post.id] ?? post);
  const newDraft = drafts["new-preview-draft"];
  if (newDraft) posts.unshift(newDraft);
  const filtered = posts.filter((post) => (status === "All stories" || post.status === status) && `${post.title} ${post.category}`.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <section className={styles.panel} aria-label="Manage sample stories">
      <div className={styles.filterbar}>
        <div className={styles.tabs} role="group" aria-label="Filter stories by status">
          {filters.map((filter) => <button type="button" aria-pressed={status === filter} key={filter} onClick={() => setStatus(filter)}>{filter}</button>)}
        </div>
        <label className={styles.search}><LuSearch aria-hidden="true" /><span className="sr-only">Search stories by title or category</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search your stories…" type="search" /></label>
      </div>
      <p className={styles.resultCount} role="status">{filtered.length} {filtered.length === 1 ? "story" : "stories"}{query ? ` matching “${query}”` : " in this view"}. Statuses are illustrative.</p>
      {filtered.length > 0 ? <AdminStoryTable posts={filtered} /> : <div className={styles.empty}><LuSearch size={29} aria-hidden="true" /><h2>No matching stories</h2><p>Try another title or category, or clear your filters to see everything.</p><button className="button button-secondary" type="button" onClick={() => { setQuery(""); setStatus("All stories"); }}>Clear filters</button></div>}
    </section>
  );
}
