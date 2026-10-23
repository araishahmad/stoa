import Link from "next/link";
import { LuPlus } from "react-icons/lu";
import { adminPosts } from "../shared/data";
import { AdminPageHeading } from "../shared/page-heading";
import { PostsBrowser } from "./posts-browser";

export function AdminPostsPage() {
  return (
    <>
      <AdminPageHeading
        title="Every story, in one place."
        description="From your first idea to the final edit. Explore the sample editorial workflow."
        action={<Link className="button button-primary" href="/admin/posts/new"><LuPlus aria-hidden="true" /> New story</Link>}
      />
      <PostsBrowser initialPosts={adminPosts} />
    </>
  );
}
