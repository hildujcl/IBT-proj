import { announcements } from "@/lib/data";
import AnnouncementsClient from "@/components/AnnouncementsClient";

export const metadata = {
  title: "Campus Announcements",
  description:
    "Read campus notices, academic updates, and student opportunities.",
};

export default function AnnouncementsPage() {
  return <AnnouncementsClient initialAnnouncements={announcements} />;
}
