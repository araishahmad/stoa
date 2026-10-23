import Image from "next/image";
import Link from "next/link";
import { LuArrowDown, LuArrowUpRight, LuAsterisk, LuMessagesSquare, LuMousePointer2, LuShapes } from "react-icons/lu";
import { SiteContainer } from "@/components/layout/site-container";
import { StoryCard } from "@/features/site/components/story-card";
import { InteractiveArt } from "@/features/site/components/interactive-art";
import { TopicRibbon } from "@/features/site/components/topic-ribbon";
import { ScrollComposition } from "@/features/site/components/scroll-composition";
import { stories } from "@/features/site/stories/data";
import styles from "./home.module.css";

const topics = [
  { name: "Technology", description: "The tools changing our world. And our place in it.", Icon: LuMousePointer2 },
  { name: "Relationships", description: "The wonderfully human business of connecting.", Icon: LuMessagesSquare },
  { name: "Culture", description: "Ideas, everyday rituals, and things that move us.", Icon: LuShapes },
];

export function HomePage() {
  const [featured, relationship, culture] = stories;
  return <>
    <SiteContainer>
      <section className={styles.introduction} aria-labelledby="home-heading">
        <div className={styles.titleComposition}><h1 id="home-heading"><span>Stay</span>{" "}<span>curious.</span></h1><LuAsterisk className={styles.heroAsterisk} size={68} strokeWidth={1.7} aria-hidden="true" /></div>
        <div><p>Technology. Relationships. The world in between.<br />Fresh perspectives for a life that doesn’t fit in one box.</p><a href="#latest" className="text-link">Find your next read <LuArrowDown size={16} aria-hidden="true" /></a></div>
      </section>
      <section className={styles.featured} aria-label="Featured stories">
        <article className={styles.leadStory}>
          <InteractiveArt className={styles.leadImage}><Link className={styles.leadImageLink} href={`/blog/${featured.slug}`} tabIndex={-1} aria-label={`Read ${featured.title}`}><Image src={featured.image} alt={featured.imageAlt} fill quality={90} style={{ objectPosition: featured.imagePosition }} sizes="(max-width: 760px) 100vw, (min-width: 1440px) 740px, 58vw" loading="eager" fetchPriority="high" /><span className={styles.imageBadge} aria-hidden="true"><LuAsterisk size={15} />The big idea</span><span className={styles.heroSticker} aria-hidden="true"><span>Tune in.<br />Think bigger.</span><LuArrowUpRight size={27} /></span></Link></InteractiveArt>
          <div className={styles.leadCopy}>
            <div className={styles.storyMeta}><Link href={`/blog?category=${featured.category}`}>{featured.category}</Link><span>{featured.readTime} min read</span></div>
            <h2><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2>
            <div className={styles.leadBottom}><p>{featured.excerpt}</p><Link href={`/blog/${featured.slug}`} className={styles.readCircle} aria-label={`Read ${featured.title}`}><LuArrowUpRight size={26} /></Link></div>
          </div>
        </article>
        <div className={styles.sideStories}>
          <article className={styles.relationshipStory}>
            <Link href={`/blog/${relationship.slug}`} className={styles.sideImage} tabIndex={-1} aria-label={`Read ${relationship.title}`}><Image src={relationship.image} alt={relationship.imageAlt} fill quality={90} style={{ objectPosition: relationship.imagePosition }} sizes="(max-width: 760px) 100vw, 38vw" loading="eager" /><span className={styles.sideBadge} aria-hidden="true">Off the group chat.</span></Link>
            <div className={styles.storyMeta}><Link href={`/blog?category=${relationship.category}`}>{relationship.category}</Link><span>{relationship.readTime} min read</span></div>
            <h2><Link href={`/blog/${relationship.slug}`}>{relationship.title}</Link></h2><p>{relationship.excerpt}</p>
          </article>
          <article className={styles.cultureStory}>
            <div><span className={styles.cultureLabel}>{culture.category}</span><h2><Link href={`/blog/${culture.slug}`}>{culture.title}</Link></h2><Link href={`/blog/${culture.slug}`} className="text-link">Read the story <LuArrowUpRight size={18} aria-hidden="true" /></Link></div>
            <div className={styles.cultureImage}><Image src={culture.image} alt={culture.imageAlt} fill quality={90} style={{ objectPosition: culture.imagePosition }} sizes="(max-width: 760px) 40vw, 20vw" /></div>
          </article>
        </div>
      </section>
      <div className={styles.editorialNote}><LuAsterisk size={25} aria-hidden="true" /><p>A little outside your usual feed.</p><span>Different subjects. One curious point of view.</span><Link href="/about" className="text-link">Meet Stoa <LuArrowUpRight size={16} aria-hidden="true" /></Link></div>
    </SiteContainer>
    <TopicRibbon className={styles.topicRibbon} />
    <SiteContainer>
      <section id="latest" className={styles.latest} aria-labelledby="latest-heading">
        <div className={styles.sectionHeading}><h2 className="section-title" id="latest-heading">Worth your attention.</h2><Link href="/blog" className="text-link">Browse all stories <LuArrowUpRight size={18} aria-hidden="true" /></Link></div>
        <div className={styles.latestLayout}>
          <div className={styles.storyGrid}>{stories.slice(3, 5).map(story => <StoryCard key={story.slug} story={story} />)}</div>
          <aside className={styles.readingList} aria-labelledby="reading-list-heading"><div className={styles.readingListHeading}><LuAsterisk size={23} aria-hidden="true" /><h3 id="reading-list-heading">Take a different turn</h3></div><p>A few more places to start.</p>{stories.slice(5).map(story => <article key={story.slug}><span>{story.category}</span><h4><Link href={`/blog/${story.slug}`}>{story.title}</Link></h4><span className={styles.listReadTime}>{story.readTime} min read <LuArrowUpRight size={18} aria-hidden="true" /></span></article>)}</aside>
        </div>
      </section>
    </SiteContainer>
    <section className={styles.topicSection} aria-labelledby="topic-heading"><SiteContainer>
      <div className={styles.sectionHeading}><div><h2 className="section-title" id="topic-heading">Pick a rabbit hole.</h2><p className={styles.sectionSummary}>Start with what you love. Stay for something unexpected.</p></div><LuAsterisk className={styles.topicAsterisk} size={64} strokeWidth={1.5} aria-hidden="true" /></div>
      <ScrollComposition className={styles.topics}>{topics.map(({ name, description, Icon }) => <Link href={`/blog?category=${name}`} key={name} className={styles.topic} data-topic={name}><div className={styles.topicTop}><Icon size={34} strokeWidth={1.5} aria-hidden="true" /><LuArrowUpRight className={styles.topicArrow} size={23} aria-hidden="true" /></div><h3>{name}</h3><p>{description}</p></Link>)}</ScrollComposition>
    </SiteContainer></section>
    <SiteContainer><section className={styles.aboutStrip} aria-labelledby="about-strip-heading"><div><h2 id="about-strip-heading">Life has more than one subject.</h2><p>So do we. Stoa brings different ideas into the same conversation.</p></div><Link href="/about" className="button button-primary">Get to know Stoa <LuArrowUpRight size={17} aria-hidden="true" /></Link></section></SiteContainer>
  </>;
}
