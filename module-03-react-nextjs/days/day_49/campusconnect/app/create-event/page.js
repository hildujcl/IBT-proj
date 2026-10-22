import CreateEventClient from "@/components/CreateEventClient";

export const metadata = {
  title: "Create an Event | CampusConnect",
  description: "Share an event with your campus community.",
  robots: { index: false, follow: false },
};

export default function CreateEventPage() {
  return <CreateEventClient />;
}
