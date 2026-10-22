import DashboardClient from "@/components/DashboardClient";

export const metadata = {
  title: "Dashboard | CampusConnect",
  description: "Your CampusConnect student dashboard.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardClient />;
}
