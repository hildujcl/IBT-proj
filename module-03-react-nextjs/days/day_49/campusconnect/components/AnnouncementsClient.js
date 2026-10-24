"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "campusConnectAnnouncements";

const categoryStyles = {
  Academic: "bg-blue-100 text-blue-800",
  Campus: "bg-violet-100 text-violet-800",
  Opportunity: "bg-emerald-100 text-emerald-800",
  Notice: "bg-amber-100 text-amber-800",
};

const categoryIcons = {
  Academic: "🎓",
  Campus: "🏫",
  Opportunity: "🌟",
  Notice: "📌",
};

export default function AnnouncementsClient({ initialAnnouncements }) {
  const [announcements, setAnnouncements] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setAnnouncements(saved ? JSON.parse(saved) : initialAnnouncements);
    } catch {
      setAnnouncements(initialAnnouncements);
    }

    setLoaded(true);

    function handleStorage(event) {
      if (event.key === STORAGE_KEY) {
        try {
          setAnnouncements(
            event.newValue ? JSON.parse(event.newValue) : initialAnnouncements,
          );
        } catch {
          setAnnouncements(initialAnnouncements);
        }
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [initialAnnouncements]);

  if (!loaded) {
    return (
      <main className="min-h-screen bg-slate-50 p-10">
        Loading announcements...
      </main>
    );
  }

  const published = announcements.filter((item) => item.published !== false);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-violet-950 via-violet-800 to-indigo-700 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20">
          <Link
            href="/"
            className="text-sm font-semibold text-violet-200 hover:text-white"
          >
            ← Back to home
          </Link>

          <p className="mt-8 text-sm font-bold tracking-[0.2em] text-violet-300">
            CAMPUS BULLETIN
          </p>

          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
            Stay in the loop.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-violet-100 sm:text-lg">
            Important notices, academic updates, and opportunities to help you
            stay informed about campus life.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-4">
            <span className="text-2xl" aria-hidden="true">
              📣
            </span>
            <div>
              <p className="font-bold">{published.length} campus updates</p>
              <p className="mt-1 text-sm text-violet-200">
                Latest published announcements
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14 sm:px-8">
        <div className="mb-9">
          <p className="font-bold text-violet-700">NOTICEBOARD</p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
            Latest announcements
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            Read updates about your studies and campus experience.
          </p>
        </div>

        {published.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <span className="text-5xl" aria-hidden="true">
              📭
            </span>
            <h2 className="mt-5 text-xl font-bold text-slate-900">
              Nothing new just yet
            </h2>
            <p className="mt-2 text-slate-600">
              Check back later for campus updates.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {published.map((item) => (
              <article
                key={item.id}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-violet-200 hover:shadow-lg sm:p-8"
              >
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-3xl">
                    {categoryIcons[item.tag] || "📢"}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          categoryStyles[item.tag] ||
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {item.tag}
                      </span>
                      <time className="text-sm text-slate-500">
                        {item.date}
                      </time>
                    </div>

                    <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
                      {item.title}
                    </h2>
                    <p className="mt-3 leading-7 text-slate-600">
                      {item.description}
                    </p>
                  </div>

                  <span className="hidden text-2xl text-violet-400 sm:block">
                    ✦
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 rounded-3xl bg-violet-100 p-7 sm:p-9">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Make the most of campus life
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            Explore upcoming activities and connect with other students.
          </p>
          <Link
            href="/events"
            className="mt-5 inline-flex rounded-xl bg-violet-700 px-5 py-3 font-bold text-white hover:bg-violet-800"
          >
            Explore events →
          </Link>
        </div>
      </section>
    </main>
  );
}
