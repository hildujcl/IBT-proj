import "./globals.css";
import Header from "@/components/Header";
import Providers from "./providers";

export const metadata = {
  title: "Addis Eats",
  description: "Authentic Ethiopian food delivered fresh.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
