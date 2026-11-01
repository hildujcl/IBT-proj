import "./globals.css";

export const metadata = {
  title: "Addis Eats | Delivery Tracker",
  description:
    "Track your Addis Eats delivery, follow your order progress, and explore your delivery location.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
