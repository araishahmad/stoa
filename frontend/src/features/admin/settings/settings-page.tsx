import Link from "next/link";
import { LuBookOpen, LuGlobe, LuInfo, LuLockKeyhole, LuShieldCheck } from "react-icons/lu";
import { storyCategories } from "@/features/site/stories/data";
import { AdminPageHeading } from "../shared/page-heading";
import styles from "../shared/admin.module.css";

const sections = [
  { title: "Publication", description: "A publication built for curious people and a range of ideas. These details describe the current prototype.", icon: LuBookOpen, values: [["Publication name", "Stoa"], ["Launch categories", storyCategories.join(", ")], ["Language", "English"], ["Content", "Original sample articles"], ["Article URL", "/blog/[slug]"]] },
  { title: "Privacy & advertising", description: "The public consent interface is a demonstration. It does not activate tracking or store preferences on a device.", icon: LuShieldCheck, values: [["Ads & analytics", "Not connected"], ["Browser storage", "Not used by the prototype"], ["Consent preview", "In memory only"], ["Privacy wording", "Draft for owner review"]] },
  { title: "Access & publishing", description: "This workspace is a visual preview, accessible without signing in. All content and figures are illustrative.", icon: LuLockKeyhole, values: [["Authentication", "Not connected"], ["Publishing", "Disabled"], ["Draft changes", "This admin session only"], ["Database", "Not connected"]] },
  { title: "Hosting & discovery", description: "The project is prepared for a Node.js VPS deployment. Production configuration and launch checks still need to be completed.", icon: LuGlobe, values: [["Deployment target", "VPS"], ["Domain", "To be configured"], ["Search indexing", "Disabled for this preview"], ["Admin search visibility", "Noindex, nofollow"]] },
];

export function AdminSettingsPage() {
  return (
    <>
      <AdminPageHeading
        title="Behind the publication."
        description="A read-only view of your publication setup and what remains before launch."
      />
      <div className={styles.settingsGrid}>
        {sections.map(({ title, description, icon: Icon, values }) => (
          <section className={styles.panel} key={title}>
            <div className={styles.settingIcon}><Icon size={20} aria-hidden="true" /></div>
            <h2>{title}</h2>
            <p>{description}</p>
            <dl className={styles.settingsList}>
              {values.map(([label, value]) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>
          </section>
        ))}
      </div>
      <aside className={styles.settingsNote}>
        <LuInfo size={20} aria-hidden="true" />
        <div>
          <strong>Get the foundations right before launch.</strong>
          <p>Replace sample content, confirm your domain and audience, connect secure publishing, and review the <Link href="/privacy">draft privacy page</Link> before enabling search indexing or advertising. AdSense approval cannot be guaranteed by a layout.</p>
        </div>
      </aside>
    </>
  );
}
