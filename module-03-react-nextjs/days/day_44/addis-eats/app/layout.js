import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


import { siteName, siteDescription, siteUrl } from "./lib/site";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Addis Eats | Ethiopian Food",
    template: "%s | Addis Eats",
  },

  description: siteDescription,

  applicationName: siteName,

  openGraph: {
    title: "Addis Eats | Ethiopian Food",
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "en_ET",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Addis Eats | Ethiopian Food",
    description: siteDescription,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
