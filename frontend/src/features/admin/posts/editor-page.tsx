import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import { storyCategories } from "@/features/site/stories/data";
import { AdminPageHeading } from "../shared/page-heading";
import type { AdminPost } from "../shared/types";
import { StoryEditor } from "./story-editor";
import styles from "../shared/admin.module.css";

export function AdminEditorPage({ post }: { post: AdminPost }) {
  return (
    <>
      <Link className={styles.backLink} href="/admin/posts"><LuArrowLeft aria-hidden="true" /> Back to the collection</Link>
      <AdminPageHeading
        title={post.isNew ? "What’s your next big idea?" : "Make a good story better."}
        description="Write, refine, and preview your story. Drafts stay in this preview session."
      />
      <StoryEditor key={post.id} initialPost={post} categories={storyCategories} />
    </>
  );
}
