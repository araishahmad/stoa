import type { ReactNode } from "react";
import styles from "./admin.module.css";

export function AdminPageHeading({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className={styles.pageHeading}>
      <div><p className={styles.kicker}>Stoa Studio</p><h1>{title}</h1><p>{description}</p></div>
      {action}
    </div>
  );
}
