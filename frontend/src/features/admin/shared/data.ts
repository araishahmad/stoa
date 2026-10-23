import { stories, storyCategories } from "@/features/site/stories/data";
import type { AdminPost } from "./types";

export const adminPosts: AdminPost[] = stories.map((story, index) => ({
  id: story.slug,
  slug: story.slug,
  title: story.title,
  excerpt: story.excerpt,
  category: story.category,
  image: story.image,
  imageAlt: story.imageAlt,
  dateLabel: new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(story.publishedAt)),
  status: index < 4 ? "Published" : index === 4 ? "In review" : "Draft",
  body: story.body.flatMap((section) => [section.heading, ...section.paragraphs]).join("\n\n"),
}));

export const emptyPost: AdminPost = {
  id: "new-preview-draft",
  slug: "new-preview-draft",
  title: "",
  excerpt: "",
  category: storyCategories[0],
  image: "",
  imageAlt: "",
  dateLabel: "This preview",
  status: "Draft",
  body: "",
  isNew: true,
};
