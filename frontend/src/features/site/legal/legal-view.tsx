import Link from "next/link";
import { LuArrowUpRight, LuFileText } from "react-icons/lu";
import { SiteContainer } from "@/components/layout/site-container";
import styles from "./legal.module.css";

type LegalSection = { heading: string; paragraphs: string[] };
type LegalViewProps = { title: string; description: string; sections: LegalSection[]; related: { href: string; label: string } };

export function LegalView({ title, description, sections, related }: LegalViewProps) {
  return (
    <SiteContainer>
      <div className={styles.layout}>
        <aside className={styles.navigation} aria-label="Policy pages">
          <LuFileText aria-hidden="true" />
          <p>Reading the small print</p>
          <Link href="/privacy" aria-current={title === "Privacy policy" ? "page" : undefined}>Privacy policy</Link>
          <Link href="/terms" aria-current={title === "Terms of use" ? "page" : undefined}>Terms of use</Link>
          <Link href="/contact">Contact</Link>
        </aside>
        <article className={styles.document}>
          <header>
            <span className="pill">Draft for review</span>
            <h1>{title}</h1>
            <p className={styles.description}>{description}</p>
            <p className={styles.date}>Draft prepared <time dateTime="2026-10-23">October 23, 2026</time></p>
          </header>
          <div className={styles.notice}><strong>For this design preview only.</strong><p>This draft describes the current demonstration website. It needs the site owner’s details, chosen providers, audience requirements, and professional review before launch. It does not certify legal or Google AdSense compliance.</p></div>
          {sections.map((section) => (
            <section key={section.heading} className={styles.section}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
          <div className={styles.related}><Link href={related.href} className="text-link">{related.label}<LuArrowUpRight aria-hidden="true" /></Link><Link href="/about" className="text-link">About this preview<LuArrowUpRight aria-hidden="true" /></Link></div>
        </article>
      </div>
    </SiteContainer>
  );
}
