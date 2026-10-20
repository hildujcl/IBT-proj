import Link from "next/link";
import Brand from "@/components/Brand";
import { getSession } from "@/lib/auth";
import { signOutAction } from "@/lib/actions";
export default async function Header() {
  const user = await getSession();
  return <header className="site-header"><div className="nav-wrap"><Brand/><nav className="main-nav" aria-label="Main navigation"><Link href="/events">Events</Link><Link href="/resources">Resources</Link><Link href="/announcements">Announcements</Link></nav><div className="nav-actions">{user ? <><Link className="nav-dashboard" href="/dashboard">Dashboard</Link><form action={signOutAction}><button className="button button-small button-ghost" type="submit">Sign out</button></form></> : <><Link className="nav-signin" href="/signin">Sign in</Link><Link className="button button-small" href="/signup">Get started <span aria-hidden="true">↗</span></Link></>}</div><details className="mobile-menu"><summary aria-label="Open navigation menu">☰</summary><div className="mobile-menu-panel"><Link href="/events">Events</Link><Link href="/resources">Resources</Link><Link href="/announcements">Announcements</Link>{user ? <Link href="/dashboard">Dashboard</Link> : <Link href="/signin">Sign in</Link>}</div></details></div></header>;
}
