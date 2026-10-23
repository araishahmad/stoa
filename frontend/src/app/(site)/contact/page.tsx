import { ContactView } from "@/features/site/contact/contact-view";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Contact Stoa", "Explore Stoa’s contact page preview for story ideas, feedback, corrections, and general enquiries. No messages are sent.", "/contact");

export default function ContactPage() {
  return <ContactView />;
}
