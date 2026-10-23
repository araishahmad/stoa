import { AdminEditorPage } from "@/features/admin/posts/editor-page";
import { emptyPost } from "@/features/admin/shared/data";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Write a story", "Try the Stoa story editor. Drafts remain in this preview session only.", "/admin/posts/new");

export default function NewPostPage() { return <AdminEditorPage post={emptyPost} />; }
