import Link from "next/link";
import type { ReactNode } from "react";
import { LuArrowUpRight, LuBookOpen, LuShieldCheck } from "react-icons/lu";
import { Brand } from "@/components/ui/brand";
import { SiteContainer } from "@/components/layout/site-container";
import { AdminNavigation } from "./admin-navigation";
import { AdminPreviewProvider } from "./preview-provider";
import styles from "./admin.module.css";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <AdminPreviewProvider>
      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <Link href="/admin" className={styles.brandLink} aria-label="Stoa editorial overview"><Brand /></Link>
          <span className={styles.workspaceLabel}>Studio / Editorial workspace</span>
          <AdminNavigation />
          <div className={styles.sidebarBottom}>
            <div className={styles.sidebarNote}>
              <LuBookOpen size={23} aria-hidden="true" />
              <p>Big ideas.<br />Your next story.</p>
              <Link href="/admin/posts/new">Start writing <LuArrowUpRight aria-hidden="true" /></Link>
            </div>
            <Link href="/" className={styles.siteLink}>View the publication <LuArrowUpRight aria-hidden="true" /></Link>
          </div>
        </aside>

        <div className={styles.mainColumn}>
          <header className={styles.topbar}>
            <span><span className={styles.statusDot} /> Stoa Studio</span>
            <span className={styles.previewPill}>Static preview</span>
          </header>
          <div className={styles.previewNotice}>
            <LuShieldCheck size={16} aria-hidden="true" />
            <span>Admin preview · sample data · authentication is not connected</span>
          </div>
          <main id="main-content" className={styles.main}>
            <SiteContainer className={styles.container}>{children}</SiteContainer>
          </main>
          <footer className={styles.footer}>A home for every good idea. <span>Stoa Studio · Editorial preview</span></footer>
        </div>
      </div>
    </AdminPreviewProvider>
  );
}
