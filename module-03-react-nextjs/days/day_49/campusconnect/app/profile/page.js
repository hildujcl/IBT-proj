import Link from "next/link";
import { requireUser } from "@/lib/auth";

export const metadata = {
  title: "My Profile | CampusConnect",
  description: "View your CampusConnect account information.",
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  const user = await requireUser();

  const email = user?.email || "student@campusconnect.test";
  const displayName = user?.name || email.split("@")[0].replace(/[._-]/g, " ");
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-violet-950 via-purple-800 to-violet-600 px-6 py-14 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-purple-200 transition hover:text-white"
          >
            ← Back to Dashboard
          </Link>

          <p className="mt-10 text-sm font-bold uppercase tracking-[0.25em] text-purple-200">
            Your account
          </p>
          <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl">
            My Profile
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-purple-100">
            View your account details and find your personal CampusConnect
            shortcuts.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-700 to-fuchsia-500 text-4xl font-extrabold text-white shadow-lg shadow-violet-200">
              {initial}
            </div>

            <h2 className="mt-5 break-words text-2xl font-bold capitalize text-slate-900">
              {displayName}
            </h2>
            <p className="mt-2 break-all text-sm text-slate-500">{email}</p>

            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Signed in
            </span>

            <Link
              href="/dashboard"
              className="mt-7 block rounded-xl bg-violet-700 px-5 py-3 font-bold text-white transition hover:bg-violet-800"
            >
              Go to Dashboard →
            </Link>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-slate-900">
                Account information
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                These details come from your current demo session.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Display name
                  </p>
                  <p className="mt-2 break-words font-semibold capitalize text-slate-800">
                    {displayName}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Email address
                  </p>
                  <p className="mt-2 break-all font-semibold text-slate-800">
                    {email}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Account status
                  </p>
                  <p className="mt-2 font-semibold text-emerald-700">
                    Active session
                  </p>
                </div>
              </div>

              <p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                Profile editing and permanent account storage are not connected
                in this prototype.
              </p>
            </section>

            <section className="rounded-3xl bg-violet-100 p-7 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900">
                Your campus shortcuts
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/events"
                  className="rounded-xl bg-white p-4 font-semibold text-slate-700 transition hover:text-violet-800"
                >
                  📅 Explore events
                </Link>
                <Link
                  href="/resources"
                  className="rounded-xl bg-white p-4 font-semibold text-slate-700 transition hover:text-violet-800"
                >
                  📚 Find resources
                </Link>
                <Link
                  href="/announcements"
                  className="rounded-xl bg-white p-4 font-semibold text-slate-700 transition hover:text-violet-800"
                >
                  📣 Announcements
                </Link>
                <Link
                  href="/create-event"
                  className="rounded-xl bg-white p-4 font-semibold text-slate-700 transition hover:text-violet-800"
                >
                  ✨ Create an event
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
