import { notFound } from "next/navigation";
import { AdminEditorPage } from "@/features/admin/posts/editor-page";
import { adminPosts } from "@/features/admin/shared/data";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() { return adminPosts.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = adminPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  return pageMetadata(`Edit ${post.title}`, `Edit the sample story “${post.title}” in the Stoa preview workspace.`, `/admin/posts/${slug}`);
}

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = adminPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  return <AdminEditorPage post={post} />;
}
