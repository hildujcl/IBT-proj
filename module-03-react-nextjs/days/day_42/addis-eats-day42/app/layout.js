import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Order delicious Ethiopian food online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
