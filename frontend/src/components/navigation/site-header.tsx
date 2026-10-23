import Link from "next/link";
import { SiteContainer } from "@/components/layout/site-container";
import { Brand } from "@/components/ui/brand";
import { stories, storyCategories } from "@/features/site/stories/data";
import { HeaderControls, NavigationLinks } from "./site-navigation";
import styles from "./navigation.module.css";

export function SiteHeader() {
  const navigation = [{ label: "All stories", href: "/blog" }, ...storyCategories.map(label => ({ label, href: `/blog?category=${label}` }))];
  return <header className={styles.header}>
    <SiteContainer className={styles.topbar}><span>Technology, people, and everything in between.</span><span className={styles.preview}><i /> Editorial preview</span></SiteContainer>
    <SiteContainer className={styles.navigation}>
      <Link href="/" aria-label="Stoa home" className={styles.logo}><Brand /></Link>
      <nav aria-label="Main navigation" className={styles.desktopNav}><NavigationLinks links={navigation} /></nav>
      <HeaderControls navigation={navigation} stories={stories.map(({ slug, title, category }) => ({ slug, title, category }))} />
    </SiteContainer>
  </header>;
}
