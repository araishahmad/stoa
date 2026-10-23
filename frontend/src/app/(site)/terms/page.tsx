import { LegalView } from "@/features/site/legal/legal-view";
import { termsSections } from "@/features/site/legal/data";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Terms of use", "Draft terms for exploring Stoa’s demonstration journal and static website prototype.", "/terms");

export default function TermsPage() {
  return <LegalView title="Terms of use" description="A few details about exploring the journal and its demonstration features." sections={termsSections} related={{ href: "/privacy", label: "Read the privacy policy" }} />;
}
