import AdminResourceRequestsClient from "@/components/AdminResourceRequestsClient";

export const metadata = {
  title: "Admin Dashboard | CampusConnect",
  description: "Review and manage student report requests.",
};

export default function AdminPage() {
  return <AdminResourceRequestsClient />;
}
