import type { StoryCategory } from "@/features/site/stories/types";

export type AdminPostStatus = "Published" | "Draft" | "In review";

export type AdminPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: StoryCategory;
  image: string;
  imageAlt: string;
  dateLabel: string;
  status: AdminPostStatus;
  body: string;
  isNew?: boolean;
};
