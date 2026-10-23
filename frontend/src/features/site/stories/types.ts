// Launch subjects; extend this union and storyCategories as reviewed sections grow.
export type StoryCategory = "Technology" | "Relationships" | "Culture";

export interface Story {
  slug: string;
  title: string;
  excerpt: string;
  category: StoryCategory;
  image: string;
  imageAlt: string;
  imagePosition?: `${number}% ${number}%`;
  publishedAt: string;
  readTime: number;
  body: { heading: string; paragraphs: string[] }[];
}
