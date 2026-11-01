import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Addis Eats | Ethiopian Food Delivery",
    template: "%s | Addis Eats",
  },
  description:
    "Discover delicious Ethiopian food, explore traditional dishes, and enjoy a simple online ordering experience with Addis Eats.",
  openGraph: {
    title: "Addis Eats",
    description: "A simple and beautiful Ethiopian food ordering experience.",
    siteName: "Addis Eats",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
