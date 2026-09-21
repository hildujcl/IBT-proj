import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/dashboard" className="logo">
        <span className="logo-icon">💼</span>
        <span>JobTrack</span>
      </Link>

      <nav className="nav">
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/applications">Applications</Link>

        <Link to="/add-application">Add Application</Link>

        <Link to="/signin" className="signin-link">
          Sign In
        </Link>
      </nav>
    </header>
  );
}

export default Header;
