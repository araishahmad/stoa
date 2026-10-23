import { HomePage } from "@/features/site/home/home-page";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata("Stay curious", siteConfig.description, "/");
export default function Page() { return <HomePage />; }
