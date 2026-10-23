import Link from "next/link";
import type { CSSProperties } from "react";
import { LuArrowRight, LuCheck, LuCircle, LuFileCheck2, LuFilePenLine, LuFileText, LuPlus, LuSquarePen } from "react-icons/lu";
import { AdminPageHeading } from "../shared/page-heading";
import { AdminStoryTable } from "../shared/story-table";
import { adminPosts } from "../shared/data";
import styles from "../shared/admin.module.css";

const activity = [
  { day: "Mon", edits: 4 }, { day: "Tue", edits: 7 }, { day: "Wed", edits: 5 },
  { day: "Thu", edits: 9 }, { day: "Fri", edits: 12 }, { day: "Sat", edits: 6 }, { day: "Sun", edits: 3 },
];

export function AdminDashboard() {
  const stats = [
    { label: "Total stories", value: adminPosts.length, detail: "Across your sample publication", icon: LuFileText },
    { label: "Published", value: adminPosts.filter((post) => post.status === "Published").length, detail: "Sample publication status", icon: LuFileCheck2 },
    { label: "In review", value: adminPosts.filter((post) => post.status === "In review").length, detail: "A fresh perspective helps", icon: LuFilePenLine },
    { label: "Drafts", value: adminPosts.filter((post) => post.status === "Draft").length, detail: "Ideas with room to grow", icon: LuSquarePen },
  ];

  return (
    <>
      <AdminPageHeading title="Good stories start here." description="Your ideas. Your publication. A clear view of what’s next. All figures are sample data." action={<Link className="button button-primary" href="/admin/posts/new"><LuPlus aria-hidden="true" /> New story</Link>} />
      <section className={styles.stats} aria-label="Sample editorial overview">
        {stats.map(({ label, value, detail, icon: Icon }) => <div className={styles.stat} key={label}><div className={styles.statTop}><span>{label}</span><Icon aria-hidden="true" /></div><strong>{value}</strong><p>{detail}</p></div>)}
      </section>

      <div className={styles.dashboardColumns}>
        <section className={styles.panel} aria-labelledby="activity-title">
          <div className={styles.panelHeader}><h2 id="activity-title">Your week in stories</h2><span className={styles.chartKey}>Sample edits</span></div>
          <p className={styles.panelDescription}>An illustration of your future editorial activity view.</p>
          <div className={styles.chart} role="img" aria-label={`Illustrative activity only: ${activity.map(({ day, edits }) => `${day} ${edits} edits`).join(", ")}. No activity is being tracked.`}>
            {activity.map(({ day, edits }) => <div className={styles.chartDay} key={day} aria-hidden="true"><div className={styles.chartBar} style={{ "--bar-height": `${edits / 12 * 150}px` } as CSSProperties} /><span>{day}</span></div>)}
          </div>
          <p className={styles.chartCaption}>Illustrative figures only. Analytics and activity tracking are not connected.</p>
        </section>

        <section className={styles.panel} aria-labelledby="checklist-title">
          <div className={styles.panelHeader}><h2 id="checklist-title">Your launch checklist</h2></div>
          <p className={styles.panelDescription}>Three foundations for a publication that lasts.</p>
          <ul className={styles.checklist}>
            <li><LuCheck aria-hidden="true" /><div><strong>Give your publication a home</strong><p>Your visual identity and reading layouts are in place.</p></div></li>
            <li><LuCircle className={styles.mutedIcon} aria-hidden="true" /><div><strong>Make the stories your own</strong><p>Replace sample content with reviewed, original work.</p></div></li>
            <li><LuCircle className={styles.mutedIcon} aria-hidden="true" /><div><strong>Connect your publishing tools</strong><p>Authentication, storage, and live publishing come next.</p></div></li>
          </ul>
          <Link href="/admin/settings" className={styles.checklistLink}>View site readiness <LuArrowRight aria-hidden="true" /></Link>
        </section>
      </div>

      <section className={styles.panel} aria-labelledby="recent-title">
        <div className={styles.panelHeader}><h2 id="recent-title">Recent stories</h2><Link href="/admin/posts">All stories <LuArrowRight aria-hidden="true" /></Link></div>
        <p className={styles.panelDescription}>A few recent stories from the sample collection.</p>
        <AdminStoryTable posts={adminPosts.slice(0, 4)} />
      </section>
    </>
  );
}
