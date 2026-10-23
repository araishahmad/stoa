import Image from "next/image";
import Link from "next/link";
import { LuArrowLeft, LuArrowUpRight, LuChevronRight, LuClock3 } from "react-icons/lu";
import { SiteContainer } from "@/components/layout/site-container";
import { editorialByline, formatStoryDate, stories } from "@/features/site/stories/data";
import type { Story } from "@/features/site/stories/types";
import { CopyArticleLink } from "./copy-article-link";
import styles from "./article.module.css";

export function ArticleView({ story }: { story: Story }) {
  const related = stories.filter((item) => item.slug !== story.slug).slice(0, 3);

  return (
    <SiteContainer>
      <article className={styles.article} data-category={story.category}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <LuChevronRight aria-hidden="true" />
          <Link href="/blog">The journal</Link>
          <LuChevronRight aria-hidden="true" />
          <span aria-current="page">{story.title}</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.labels}>
            <Link href={`/blog?category=${story.category}`} className={styles.category}>{story.category}</Link>
            <span className={styles.demoLabel}>Demo story</span>
          </div>
          <h1>{story.title}</h1>
          <p className={styles.dek}>{story.excerpt}</p>
          <div className={styles.byline}>
            <div className={styles.authorMark} aria-hidden="true">s.</div>
            <div>
              <Link href="/about#editorial-preview">{editorialByline}</Link>
              <p>Published <time dateTime={story.publishedAt}>{formatStoryDate(story.publishedAt)}</time></p>
            </div>
            <span className={styles.readTime}><LuClock3 aria-hidden="true" />{story.readTime} min read</span>
          </div>
        </header>

        <figure className={styles.figure}>
          <div className={styles.heroImage}>
            <Image src={story.image} alt={story.imageAlt} quality={90} fill sizes="(max-width: 768px) 100vw, 1200px" loading="eager" fetchPriority="high" style={{ objectPosition: story.imagePosition }} />
          </div>
          <figcaption>Illustrative image created for this editorial preview.</figcaption>
        </figure>

        <div className={styles.readingLayout}>
          <aside className={styles.sidebar} aria-label="Article contents">
            <div className={styles.sidebarInner}>
              <p className={styles.sidebarTitle}>In this story</p>
              <ol>
                {story.body.map((section, index) => <li key={section.heading}><a href={`#section-${index + 1}`}>{section.heading}</a></li>)}
              </ol>
              <CopyArticleLink />
            </div>
          </aside>

          <div className={styles.prose}>
            {story.body.map((section, index) => (
              <section key={section.heading} id={`section-${index + 1}`} className={styles.storySection}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}
            <div className={styles.endMark} aria-hidden="true">s.</div>
            <aside className={styles.editorialNote}>
              <strong>A note on this preview</strong>
              <p>This original, AI-assisted demonstration story shows the reading experience. The byline and publication date are sample labels. A person must review and approve the content and supply an accountable author before publication.</p>
            </aside>
            <Link className={`text-link ${styles.backLink}`} href="/blog"><LuArrowLeft aria-hidden="true" />Back to the journal</Link>
          </div>
        </div>
      </article>

      <section className={styles.related} aria-labelledby="related-heading">
        <div className={styles.relatedHeader}>
          <div><p className="eyebrow">Keep exploring</p><h2 id="related-heading" className="section-title">Follow your curiosity.</h2></div>
          <Link href="/blog" className="text-link">All stories<LuArrowUpRight aria-hidden="true" /></Link>
        </div>
        <div className={styles.relatedGrid}>
          {related.map((item) => (
            <Link key={item.slug} href={`/blog/${item.slug}`} className={styles.relatedStory} data-category={item.category}>
              <div className={styles.relatedImage}><Image src={item.image} alt={item.imageAlt} quality={90} fill sizes="(max-width: 650px) 100vw, 33vw" style={{ objectPosition: item.imagePosition }} /></div>
              <div className={styles.relatedMeta}><span>{item.category}</span><span>{item.readTime} min read</span></div>
              <h3>{item.title}<LuArrowUpRight aria-hidden="true" /></h3>
            </Link>
          ))}
        </div>
      </section>
    </SiteContainer>
  );
}
