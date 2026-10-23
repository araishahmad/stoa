import { AdminPostsPage } from "@/features/admin/posts/posts-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Story collection", "Browse and filter the Stoa sample story collection in the editorial workspace.", "/admin/posts");

export default function PostsPage() { return <AdminPostsPage />; }
