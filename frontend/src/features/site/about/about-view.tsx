import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight, LuMessageCircle, LuMousePointer2, LuSparkles } from "react-icons/lu";
import { SiteContainer } from "@/components/layout/site-container";
import styles from "./about.module.css";

export function AboutView() {
  return (
    <SiteContainer>
      <header className={styles.header}>
        <p className="eyebrow">About Stoa</p>
        <h1>The world is connected.<br />So are our stories.</h1>
        <p className={styles.intro}>Technology changes how we live. Relationships shape who we are. Culture gives us something to talk about. Stoa follows the connections.</p>
      </header>

      <section className={styles.story} aria-labelledby="story-heading">
        <div className={styles.image}>
          <Image src="/images/stoa-genz-weird-web.png" alt="A translucent lilac retro desktop computer showing a chrome asterisk on a blue screen, set on a metal desk" quality={90} fill sizes="(max-width: 760px) 100vw, 50vw" loading="eager" fetchPriority="high" />
          <span className={styles.imageLabel}>Good ideas don’t live in boxes.</span>
        </div>
        <div className={styles.storyText}>
          <p className="eyebrow">Different subjects. A shared curiosity.</p>
          <h2 id="story-heading">For the way<br />we live now.</h2>
          <p>A new tool can change a working day. A conversation can change the way we see a friend. A strange little corner of the internet can remind us to make something of our own.</p>
          <p>Stoa is a publication concept for readers who are curious about these everyday connections. We’re starting with technology, relationships, and culture, with room to follow worthwhile ideas further.</p>
          <p>The promise is simple: something useful, something interesting, and a perspective worth taking into your day.</p>
          <Link href="/blog" className="text-link">Explore the journal<LuArrowUpRight aria-hidden="true" /></Link>
        </div>
      </section>

      <section className={styles.subjects} aria-label="Our starting subjects">
        <Link href="/blog?category=Technology" data-category="Technology"><LuMousePointer2 aria-hidden="true" /><h2>Technology</h2><p>The tools, habits, and ideas changing our everyday lives.</p><span>Explore technology<LuArrowUpRight aria-hidden="true" /></span></Link>
        <Link href="/blog?category=Relationships" data-category="Relationships"><LuMessageCircle aria-hidden="true" /><h2>Relationships</h2><p>Friendship, conversation, and the ways we connect.</p><span>Explore relationships<LuArrowUpRight aria-hidden="true" /></span></Link>
        <Link href="/blog?category=Culture" data-category="Culture"><LuSparkles aria-hidden="true" /><h2>Culture</h2><p>Creative ideas and fresh perspectives worth sharing.</p><span>Explore culture<LuArrowUpRight aria-hidden="true" /></span></Link>
      </section>

      <section id="values-heading" className={styles.values} aria-labelledby="standards-heading">
        <div className={styles.valuesIntro}><p className="eyebrow">Our editorial direction</p><h2 id="standards-heading">Curious.<br />Clear. Human.</h2></div>
        <div className={styles.valuesList}>
            <div><h3>Make it worth the read.</h3><p>Each story should give you a useful idea, a new question, or a perspective that goes beyond the obvious.</p></div>
            <div><h3>Be clear about what we know.</h3><p>Separate experience, opinion, and verified facts. A compelling headline is a promise the story needs to keep.</p></div>
            <div><h3>Put a person behind the words.</h3><p>Accurate authorship, honest dates, meaningful review, and a clear distinction between editorial content and any future advertising.</p></div>
        </div>
      </section>

      <section id="editorial-preview" className={styles.preview} aria-labelledby="preview-heading">
        <span className={styles.previewMark} aria-hidden="true">s.</span>
        <div>
          <p className="eyebrow">You are viewing a design preview</p>
          <h2 id="preview-heading">The publication is taking shape.</h2>
          <p>The stories and images on this website are original, AI-assisted demonstration material. “Stoa editorial preview” identifies the sample content; it is not a real author profile. Dates are sample publication labels.</p>
          <p>Before launch, each article will need human review, an accountable author, and approval. This preview has no live advertising, analytics, subscriptions, or message delivery.</p>
          <Link href="/contact" className="text-link">View the contact page<LuArrowUpRight aria-hidden="true" /></Link>
        </div>
      </section>
    </SiteContainer>
  );
}
