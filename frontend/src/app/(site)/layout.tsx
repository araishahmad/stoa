import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/site-footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <div id="top"><SiteHeader /><main id="main-content">{children}</main><SiteFooter /></div>;
}
