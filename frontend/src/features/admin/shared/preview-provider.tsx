"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { AdminPost } from "./types";

type PreviewState = {
  drafts: Record<string, AdminPost>;
  saveDraft: (post: AdminPost) => void;
};

const PreviewContext = createContext<PreviewState | null>(null);

export function AdminPreviewProvider({ children }: { children: ReactNode }) {
  const [drafts, setDrafts] = useState<Record<string, AdminPost>>({});

  function saveDraft(post: AdminPost) {
    setDrafts((current) => ({ ...current, [post.id]: post }));
  }

  return (
    <PreviewContext.Provider value={{ drafts, saveDraft }}>
      {children}
    </PreviewContext.Provider>
  );
}

export function useAdminPreview() {
  const context = useContext(PreviewContext);
  if (!context) throw new Error("Admin preview components require AdminPreviewProvider.");
  return context;
}
