import { notFound } from "next/navigation";
import { JournalPage } from "@/features/site/journal/journal-page";
import { storyCategories } from "@/features/site/stories/data";
import { pageMetadata } from "@/lib/metadata";

type PageProps = { searchParams: Promise<{ category?: string | string[]; q?: string | string[] }> };
export async function generateMetadata({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = typeof params.category === "string" ? params.category : undefined;
  return pageMetadata(category ? `${category} stories` : "The journal", category ? `Explore sample ${category.toLowerCase()} stories in the Stoa journal.` : "Explore Stoa’s stories about technology, relationships, culture, and the connections shaping everyday life.", "/blog");
}
export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  if (Array.isArray(params.category) || Array.isArray(params.q)) notFound();
  const category = params.category;
  if (category && !storyCategories.some(value => value === category)) notFound();
  const query = params.q?.trim().slice(0,100);
  return <JournalPage category={category} query={query} />;
}
