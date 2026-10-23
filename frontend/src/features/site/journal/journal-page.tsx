import Link from "next/link";
import { LuArrowRight, LuSearch } from "react-icons/lu";
import { SiteContainer } from "@/components/layout/site-container";
import { StoryCard } from "@/features/site/components/story-card";
import { stories, storyCategories } from "@/features/site/stories/data";
import styles from "./journal.module.css";

export function JournalPage({ category, query }: { category?: string; query?: string }) {
  const filtered = stories.filter(story => (!category || story.category === category) && (!query || `${story.title} ${story.excerpt} ${story.category}`.toLowerCase().includes(query.toLowerCase())));
  return <SiteContainer><header className={styles.intro}><h1>{category || "A world of good reads."}</h1><p>{category === "Technology" ? "The tools changing our world. And our place in it." : category === "Relationships" ? "The wonderfully human business of connecting." : category === "Culture" ? "Ideas, everyday rituals, and things that move us." : "Technology, relationships, culture. Follow what interests you—or discover something new."}</p></header>
    <div className={styles.toolbar}><nav aria-label="Filter stories by subject" className={styles.filters}><Link href="/blog" aria-current={!category ? "page" : undefined}>All stories</Link>{storyCategories.map(name => <Link key={name} href={`/blog?category=${name}`} aria-current={category === name ? "page" : undefined}>{name}</Link>)}</nav>
      <form action="/blog" method="get" className={styles.search}>{category && <input type="hidden" name="category" value={category} />}<label htmlFor="journal-search" className="sr-only">Search the journal</label><input id="journal-search" name="q" defaultValue={query} maxLength={100} placeholder="Search the journal" /><button type="submit" aria-label="Search the journal"><LuSearch size={17} /></button></form>
    </div>
    <p className={styles.count}>{filtered.length} {filtered.length === 1 ? "story" : "stories"}{query ? ` matching “${query}”` : " to explore"}<span>Sample editorial collection</span></p>
    {filtered.length ? <div className={styles.grid}>{filtered.map(story => <StoryCard key={story.slug} story={story} headingLevel="h2" />)}</div> : <div className={styles.empty}><LuSearch size={32} /><h2>No stories found, just yet.</h2><p>Try a different word, or take a look around the full journal.</p><Link href="/blog" className="button button-primary">Explore all stories <LuArrowRight /></Link></div>}
  </SiteContainer>;
}
