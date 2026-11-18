import type { Metadata } from "next";
import AdminDashboard from "../_components/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin — A&A Market",
  description: "Manage A&A Market products.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
