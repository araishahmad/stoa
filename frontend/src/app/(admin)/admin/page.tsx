import { AdminDashboard } from "@/features/admin/dashboard/dashboard";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Editorial overview", "The Stoa editorial workspace preview with sample content and publishing readiness.", "/admin");

export default function AdminPage() { return <AdminDashboard />; }
