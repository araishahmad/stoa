import Link from "next/link";
import { Brand } from "@/components/ui/brand";

export default function NotFound() {
  return <main id="main-content" className="not-found-page"><Link href="/" aria-label="Stoa home"><Brand /></Link><p className="eyebrow">404 · A small detour</p><h1>This page took<br />the scenic route.</h1><p>We couldn’t find that story. There’s plenty more to discover in the journal.</p><Link href="/blog" className="button button-primary">Back to the journal</Link></main>;
}
