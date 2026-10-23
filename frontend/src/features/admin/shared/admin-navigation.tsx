"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuFileText, LuLayoutDashboard, LuSettings2, LuSquarePen } from "react-icons/lu";
import styles from "./admin.module.css";

const items = [
  { href: "/admin", label: "Overview", icon: LuLayoutDashboard },
  { href: "/admin/posts", label: "All stories", icon: LuFileText },
  { href: "/admin/posts/new", label: "Write a story", icon: LuSquarePen },
  { href: "/admin/settings", label: "Site settings", icon: LuSettings2 },
];

export function AdminNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Editorial workspace" className={styles.navigation}>
      {items.map(({ href, label, icon: Icon }) => {
        const active = href === "/admin/posts"
          ? pathname === href || (pathname.startsWith(`${href}/`) && pathname !== "/admin/posts/new")
          : pathname === href;
        return (
          <Link key={href} href={href} aria-current={active ? "page" : undefined}>
            <Icon aria-hidden="true" size={19} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
