import { AboutView } from "@/features/site/about/about-view";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("About Stoa", "Meet Stoa, a publication concept exploring technology, relationships, culture, and the connections between them.", "/about");

export default function AboutPage() {
  return <AboutView />;
}
