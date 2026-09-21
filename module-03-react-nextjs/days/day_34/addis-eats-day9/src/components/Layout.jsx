import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="app">
      <Header />

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <span>🍲</span>
          Addis Eats
        </div>

        <p>Good Food · Happy People · A Taste of Ethiopia</p>
      </footer>
    </div>
  );
}
