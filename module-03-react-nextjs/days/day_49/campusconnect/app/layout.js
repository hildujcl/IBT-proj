import "./globals.css";

export const metadata = {
  title: {
    default: "CampusConnect",
    template: "%s | CampusConnect",
  },
  description:
    "CampusConnect helps students discover campus events, learning resources, and announcements.",
  openGraph: {
    title: "CampusConnect",
    description: "Discover campus events, resources, and announcements.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
