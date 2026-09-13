import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1>CampusConnect</h1>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/clubs">Clubs</NavLink>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/resources">Resources</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
}

export default Header;
