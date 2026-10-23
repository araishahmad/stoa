import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import type { Story } from "@/features/site/stories/types";
import styles from "./story-card.module.css";

export function StoryCard({ story, headingLevel = "h3" }: { story: Story; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return <article className={styles.card}>
    <Link href={`/blog/${story.slug}`} className={styles.imageLink} tabIndex={-1} aria-label={`Read ${story.title}`}><Image src={story.image} alt={story.imageAlt} width={1536} height={1024} quality={90} style={{ objectPosition: story.imagePosition }} sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw" /><span className={styles.arrow} aria-hidden="true"><LuArrowUpRight size={21} /></span></Link>
    <div className={styles.meta}><Link href={`/blog?category=${story.category}`} data-category={story.category}>{story.category}</Link><span>{story.readTime} min read</span></div>
    <Heading className={styles.title}><Link href={`/blog/${story.slug}`}>{story.title}</Link></Heading><p>{story.excerpt}</p>
    <span className={styles.byline}>Stoa editorial preview</span>
  </article>;
}
