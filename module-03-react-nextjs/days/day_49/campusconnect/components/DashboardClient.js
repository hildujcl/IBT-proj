"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { events, resources, announcements } from "@/lib/data";

export default function DashboardClient() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const session = JSON.parse(
        localStorage.getItem("campusConnectSession") || "null",
      );

      if (!session) {
        router.replace("/signin?error=auth");
        return;
      }

      setUser(session);
    } catch {
      localStorage.removeItem("campusConnectSession");
      router.replace("/signin?error=auth");
      return;
    }

    setReady(true);
  }, [router]);

  if (!ready || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="font-semibold text-violet-700">
          Loading your campus dashboard...
        </p>
      </main>
    );
  }

  const displayName = user.name || user.email.split("@")[0];
  const upcomingEvents = events.slice(0, 3);

  function SummaryCard({ icon, label, value, href }) {
    return (
      <Link
        href={href}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-500">{label}</span>
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-xl">
            {icon}
          </span>
        </div>
        <p className="mt-4 text-3xl font-extrabold text-slate-900">{value}</p>
        <p className="mt-3 text-sm font-semibold text-violet-700">
          Explore more →
        </p>
      </Link>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-violet-950 via-purple-800 to-violet-600 px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-200">
            Your student space
          </p>
          <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl">
            Welcome back, {displayName}!
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-purple-100">
            Discover what is happening around campus and find the resources you
            need to keep learning.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/events"
              className="rounded-xl bg-white px-5 py-3 font-bold text-violet-800 transition hover:bg-purple-100"
            >
              Explore Events →
            </Link>
            <Link
              href="/create-event"
              className="rounded-xl border border-white/40 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              + Create Event
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
        <div className="mb-7">
          <p className="text-sm font-bold uppercase tracking-wider text-violet-700">
            Your overview
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Campus at a glance
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <SummaryCard
            icon="📅"
            label="Campus events"
            value={events.length}
            href="/events"
          />
          <SummaryCard
            icon="📚"
            label="Learning resources"
            value={resources.length}
            href="/resources"
          />
          <SummaryCard
            icon="📣"
            label="Announcements"
            value={announcements.length}
            href="/announcements"
          />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <section>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-violet-700">
                  Find something interesting
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Featured events
                </h2>
              </div>
              <Link
                href="/events"
                className="text-sm font-bold text-violet-700 hover:text-violet-900"
              >
                View all →
              </Link>
            </div>

            {upcomingEvents.length > 0 ? (
              <div className="grid gap-4">
                {upcomingEvents.map((event) => (
                  <article
                    key={event.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-violet-200 hover:shadow-md sm:p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-800">
                          {event.category || "Campus Event"}
                        </span>
                        <h3 className="mt-3 text-lg font-bold text-slate-900">
                          {event.title}
                        </h3>
                      </div>
                      <span className="text-sm text-slate-500">
                        {event.date || "Date to be announced"}
                      </span>
                    </div>
                    <p className="mt-2 leading-6 text-slate-600">
                      {event.description}
                    </p>
                    <p className="mt-3 text-sm text-slate-500">
                      📍 {event.location || "Location to be announced"}
                    </p>
                    <Link
                      href={`/events/${event.id}`}
                      className="mt-4 inline-flex font-bold text-violet-700 hover:text-violet-900"
                    >
                      View details →
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-violet-200 bg-white p-8 text-center">
                <p className="font-semibold text-slate-800">
                  No events to show yet.
                </p>
                <Link
                  href="/create-event"
                  className="mt-4 inline-flex font-bold text-violet-700"
                >
                  Create the first event →
                </Link>
              </div>
            )}
          </section>

          <aside className="space-y-5">
            <div className="rounded-3xl bg-violet-100 p-7">
              <span className="text-3xl">👋</span>
              <h2 className="mt-4 text-xl font-bold text-slate-900">
                Your profile
              </h2>
              <p className="mt-2 break-words text-sm leading-6 text-slate-600">
                Signed in as {user.email}
              </p>
              <Link
                href="/profile"
                className="mt-5 inline-flex rounded-xl bg-violet-700 px-4 py-3 text-sm font-bold text-white hover:bg-violet-800"
              >
                View Profile →
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7">
              <h2 className="text-xl font-bold text-slate-900">Quick links</h2>
              <div className="mt-5 space-y-3">
                <Link
                  href="/resources"
                  className="block rounded-xl bg-slate-50 p-4 font-semibold text-slate-700 transition hover:bg-violet-50 hover:text-violet-800"
                >
                  📚 Browse resources →
                </Link>
                <Link
                  href="/announcements"
                  className="block rounded-xl bg-slate-50 p-4 font-semibold text-slate-700 transition hover:bg-violet-50 hover:text-violet-800"
                >
                  📣 Read announcements →
                </Link>
                <Link
                  href="/profile"
                  className="block rounded-xl bg-slate-50 p-4 font-semibold text-slate-700 transition hover:bg-violet-50 hover:text-violet-800"
                >
                  ⚙️ Account overview →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
