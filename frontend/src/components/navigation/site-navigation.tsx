"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";
import { LuArrowUpRight, LuMenu, LuSearch, LuX } from "react-icons/lu";
import styles from "./navigation.module.css";

type NavigationItem = { label: string; href: string };
type NavigationProps = { links: NavigationItem[]; onNavigate?: () => void };

function ActiveNavigationLinks({ links, onNavigate }: NavigationProps) {
  const pathname = usePathname();
  const category = useSearchParams().get("category");
  return links.map(({ label, href }) => <Link key={label} href={href} onClick={onNavigate} aria-current={pathname === "/blog" && (category ? label === category : href === "/blog") ? "page" : undefined}>{label}</Link>);
}

export function NavigationLinks(props: NavigationProps) {
  // Static HTML retains crawlable links while query-aware active state hydrates.
  return <Suspense fallback={props.links.map(({ label, href }) => <Link key={label} href={href} onClick={props.onNavigate}>{label}</Link>)}><ActiveNavigationLinks {...props} /></Suspense>;
}

type SearchStory = { slug: string; title: string; category: string };

export function HeaderControls({ stories, navigation }: { stories: SearchStory[]; navigation: NavigationItem[] }) {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const results = stories.filter(story => `${story.title} ${story.category}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <div className={styles.controls}>
    <Dialog.Root open={searchOpen} onOpenChange={setSearchOpen}>
      <Dialog.Trigger className="icon-button" aria-label="Search stories"><LuSearch size={18} /></Dialog.Trigger>
      <Dialog.Portal><Dialog.Backdrop className="dialog-backdrop" /><Dialog.Popup className="dialog-popup">
        <div className="dialog-heading"><Dialog.Title>Follow a thought.</Dialog.Title><Dialog.Close className="icon-button" aria-label="Close search"><LuX size={18} /></Dialog.Close></div>
        <Dialog.Description className="dialog-description">Find a story by title or subject. This search stays in your browser.</Dialog.Description>
        <label className="sr-only" htmlFor="story-search">Search stories</label><input id="story-search" className="field" value={query} maxLength={100} onChange={event => setQuery(event.target.value)} placeholder="Try technology, conversations, or culture…" autoComplete="off" />
        <p className={styles.resultCount} role="status">{results.length} {results.length === 1 ? "story" : "stories"}</p>
        <div className={styles.searchResults}>{results.map(story => <Link href={`/blog/${story.slug}`} key={story.slug} onClick={() => setSearchOpen(false)}><span><small>{story.category}</small>{story.title}</span><LuArrowUpRight /></Link>)}</div>
        {results.length === 0 && <p className={styles.empty}>No stories match that search. Try a broader subject, such as technology or culture.</p>}
      </Dialog.Popup></Dialog.Portal>
    </Dialog.Root>
    <Link href="/about" className={`button button-secondary ${styles.aboutButton}`}>About Stoa <LuArrowUpRight size={15} /></Link>
    <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
      <Dialog.Trigger className={`icon-button ${styles.menuButton}`} aria-label="Open navigation"><LuMenu size={20} /></Dialog.Trigger>
      <Dialog.Portal><Dialog.Backdrop className="dialog-backdrop" /><Dialog.Popup className={`dialog-popup ${styles.mobileMenu}`}>
        <div className="dialog-heading"><Dialog.Title>Explore Stoa</Dialog.Title><Dialog.Close className="icon-button" aria-label="Close navigation"><LuX /></Dialog.Close></div>
        <Dialog.Description className="dialog-description">Technology, relationships, culture. Find your next perspective.</Dialog.Description>
        <nav aria-label="Mobile navigation"><NavigationLinks links={navigation} onNavigate={() => setMenuOpen(false)} /><Link href="/about" onClick={() => setMenuOpen(false)}>About Stoa</Link><Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></nav>
      </Dialog.Popup></Dialog.Portal>
    </Dialog.Root>
  </div>;
}
