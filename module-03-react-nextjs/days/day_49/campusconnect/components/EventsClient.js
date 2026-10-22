"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { events as sampleEvents } from "@/lib/data";

export default function EventsClient() {
  const [allEvents, setAllEvents] = useState(sampleEvents);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("campusConnectEvents");
      const createdEvents = saved ? JSON.parse(saved) : [];

      if (Array.isArray(createdEvents)) {
        setAllEvents([...createdEvents, ...sampleEvents]);
      }
    } catch (error) {
      console.error("Could not load saved events:", error);
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-violet-950 via-purple-800 to-violet-600 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="text-sm font-semibold text-purple-200 transition hover:text-white"
          >
            ← Back to Home
          </Link>

          <div className="mt-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-purple-200">
              Discover · Participate · Connect
            </p>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Campus Events
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-purple-100">
              Find workshops, student activities, and exciting opportunities to
              connect with your campus community.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/create-event"
                className="rounded-xl bg-white px-6 py-3 font-bold text-violet-800 transition hover:bg-purple-100"
              >
                + Create an Event
              </Link>

              <Link
                href="/announcements"
                className="rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                View Announcements
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-violet-700">
              What's happening?
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Upcoming events
            </h2>

            <p className="mt-2 text-slate-500">
              Explore what's happening in your campus community.
            </p>
          </div>

          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-bold text-violet-800">
            {allEvents.length} {allEvents.length === 1 ? "event" : "events"}
          </span>
        </div>

        {allEvents.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allEvents.map((event) => (
              <article
                key={event.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/60"
              >
                <div className="flex min-h-32 items-end bg-gradient-to-br from-violet-100 via-purple-100 to-fuchsia-100 p-6">
                  <span className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-violet-800">
                    {event.category || "Campus Event"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-slate-900 transition group-hover:text-violet-700">
                    {event.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 leading-7 text-slate-600">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-2 text-sm text-slate-500">
                    {event.date && <p>📅 {event.date}</p>}
                    {event.time && <p>🕒 {event.time}</p>}
                    {event.location && <p>📍 {event.location}</p>}
                  </div>

                  <div className="mt-auto pt-6">
                    <Link
                      href={`/events/${event.id}`}
                      className="inline-flex items-center gap-2 font-bold text-violet-700 transition hover:gap-3 hover:text-violet-900"
                    >
                      View Event <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-violet-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-3xl">
              📅
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              No events yet
            </h3>

            <p className="mx-auto mt-2 max-w-md leading-7 text-slate-500">
              There are no events to display right now. Check back later or
              create an event for your campus community.
            </p>

            <Link
              href="/create-event"
              className="mt-6 inline-flex rounded-xl bg-violet-700 px-5 py-3 font-bold text-white transition hover:bg-violet-800"
            >
              Create an Event
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
