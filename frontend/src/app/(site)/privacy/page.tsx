import { LegalView } from "@/features/site/legal/legal-view";
import { privacySections } from "@/features/site/legal/data";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Privacy policy", "A clearly labelled draft explaining data, cookies, and privacy choices in the Stoa website preview.", "/privacy");

export default function PrivacyPage() {
  return <LegalView title="Privacy policy" description="Clear information about your data, your choices, and what this preview does." sections={privacySections} related={{ href: "/terms", label: "Read the terms of use" }} />;
}
