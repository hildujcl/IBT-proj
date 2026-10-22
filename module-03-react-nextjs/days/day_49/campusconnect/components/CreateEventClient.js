"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateEventClient() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [session, setSession] = useState(null);

  useEffect(() => {
    try {
      const savedSession = JSON.parse(
        localStorage.getItem("campusConnectSession") || "null",
      );

      if (!savedSession) {
        router.replace("/signin?next=/create-event&error=auth");
        return;
      }

      setSession(savedSession);
      setReady(true);
    } catch {
      router.replace("/signin?next=/create-event&error=auth");
    }
  }, [router]);

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!session) {
      router.replace("/signin?next=/create-event&error=auth");
      return;
    }

    const formData = new FormData(event.currentTarget);

    const title = String(formData.get("title") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const date = String(formData.get("date") || "");
    const time = String(formData.get("time") || "");
    const location = String(formData.get("location") || "").trim();
    const category = String(formData.get("category") || "Workshop");

    if (
      title.length < 4 ||
      title.length > 90 ||
      description.length < 10 ||
      description.length > 1000 ||
      !date ||
      !time ||
      location.length < 2 ||
      location.length > 100
    ) {
      setError("Please check all fields and try again.");
      return;
    }

    try {
      const savedEvents = JSON.parse(
        localStorage.getItem("campusConnectEvents") || "[]",
      );

      if (!Array.isArray(savedEvents)) {
        throw new Error("Invalid saved event data");
      }

      const newEvent = {
        id: `event-${Date.now()}`,
        title,
        description,
        date,
        time,
        location,
        category,
        createdBy: session.id,
        creatorName: session.name,
        creatorEmail: session.email,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "campusConnectEvents",
        JSON.stringify([newEvent, ...savedEvents]),
      );

      router.push("/dashboard?created=1");
    } catch {
      setError("Unable to save your event in this browser. Please try again.");
    }
  }

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="font-semibold text-violet-700">Loading event form...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-violet-950 via-purple-800 to-violet-600 px-6 py-14 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-purple-200 hover:text-white"
          >
            ← Back to Dashboard
          </Link>

          <p className="mt-10 text-sm font-bold uppercase tracking-[0.25em] text-purple-200">
            Bring people together
          </p>
          <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl">
            Create a campus event
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-purple-100">
            Share a workshop, seminar, club meeting, or activity with your
            student community.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="h-fit rounded-3xl bg-violet-100 p-7">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-700 text-2xl text-white">
              ✨
            </div>
            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              Make it happen
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Give students the details they need to discover your event and
              decide whether to participate.
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
              <li>✓ Choose a clear title</li>
              <li>✓ Explain what the event offers</li>
              <li>✓ Include the date, time, and location</li>
            </ul>
          </aside>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-violet-100/50 sm:p-9">
            <h2 className="text-2xl font-bold text-slate-900">Event details</h2>
            <p className="mt-2 text-sm text-slate-500">
              Complete the form below. Required fields are marked with *.
            </p>

            {error && (
              <p
                role="alert"
                className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Event title *
                </label>
                <input
                  id="title"
                  name="title"
                  required
                  minLength={4}
                  maxLength={90}
                  placeholder="e.g. Introduction to Web Development"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  minLength={10}
                  maxLength={1000}
                  rows={5}
                  placeholder="Tell students what the event is about..."
                  className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="date"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Date *
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    min={new Date().toLocaleDateString("en-CA")}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="time"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Time *
                  </label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="location"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Location *
                  </label>
                  <input
                    id="location"
                    name="location"
                    required
                    minLength={2}
                    maxLength={100}
                    placeholder="e.g. Main Hall"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    defaultValue="Workshop"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                  >
                    <option>Workshop</option>
                    <option>Club</option>
                    <option>Seminar</option>
                    <option>Academic</option>
                    <option>Community</option>
                  </select>
                </div>
              </div>

              <div className="rounded-xl bg-violet-50 p-4 text-sm leading-6 text-violet-900">
                Events are saved locally in this browser for your CampusConnect
                prototype. They are not uploaded to a database or shared
                automatically with other users.
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-violet-700 px-5 py-3.5 font-bold text-white transition hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-200"
              >
                Submit Event →
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
