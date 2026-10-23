import Link from "next/link";
import { SiteContainer } from "@/components/layout/site-container";
import { Brand } from "@/components/ui/brand";
import { ConsentPreferences } from "@/features/site/privacy/consent-preferences";
import { storyCategories } from "@/features/site/stories/data";
import styles from "./navigation.module.css";

export function SiteFooter() {
  return <footer className={styles.footer}><SiteContainer>
    <div className={styles.footerMain}><div className={styles.footerIntro}><Link href="/" aria-label="Stoa home"><Brand /></Link><p>For a world that won’t sit still.<br />And minds that won’t either.</p></div>
      <div><h2>Explore</h2><Link href="/blog">All stories</Link>{storyCategories.map(name => <Link key={name} href={`/blog?category=${name}`}>{name}</Link>)}</div>
      <div><h2>Stoa</h2><Link href="/about">Our story</Link><Link href="/about#values-heading">Editorial approach</Link><Link href="/contact">Get in touch</Link></div>
      <div><h2>The details</h2><Link href="/privacy">Privacy policy <span className={styles.draft}>Draft</span></Link><Link href="/terms">Terms of use <span className={styles.draft}>Draft</span></Link><ConsentPreferences /></div>
    </div>
    <div className={styles.footerBottom}><span>© 2026 Stoa. A space for perspective.</span><span>Design preview. Sample stories and generated imagery.</span><a href="#top" className="text-link">Back to top ↑</a></div>
  </SiteContainer></footer>;
}
