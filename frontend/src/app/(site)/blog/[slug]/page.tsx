import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/features/site/article/article-view";
import { findStory, stories } from "@/features/site/stories/data";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return stories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = findStory(slug);
  if (!story) notFound();
  const metadata = pageMetadata(story.title, story.excerpt, `/blog/${story.slug}`);
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: story.publishedAt,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const story = findStory(slug);
  if (!story) notFound();
  return <ArticleView story={story} />;
}
