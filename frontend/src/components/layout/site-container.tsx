import type { ReactNode } from "react";

export function SiteContainer({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`site-container ${className}`}>{children}</div>;
}
