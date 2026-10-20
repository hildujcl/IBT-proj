import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { createEventAction } from "@/lib/actions";

export const metadata = {
  title: "Create an Event | CampusConnect",
  description: "Share an event with your campus community.",
  robots: { index: false, follow: false },
};

export default async function CreateEventPage({ searchParams }) {
  await requireUser();
  const params = await searchParams;

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

            {params?.error && (
              <p
                role="alert"
                className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                Some details are missing or invalid. Please review the form and
                try again.
              </p>
            )}

            {params?.success && (
              <p
                role="status"
                className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
              >
                Your submission was validated. This prototype does not
                permanently save events yet.
              </p>
            )}

            <form action={createEventAction} className="mt-7 space-y-5">
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
                    min={new Date().toISOString().slice(0, 10)}
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
                Your sign-in session is checked by the server. This prototype
                validates submissions but does not yet store events in a
                database.
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
