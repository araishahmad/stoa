import { AdminSettingsPage } from "@/features/admin/settings/settings-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Site settings", "Review the Stoa prototype configuration, privacy controls, publishing access, and VPS readiness.", "/admin/settings");

export default function SettingsPage() { return <AdminSettingsPage />; }
