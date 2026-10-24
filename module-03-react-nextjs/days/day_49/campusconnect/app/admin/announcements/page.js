"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { announcements as sampleAnnouncements } from "@/lib/data";

const STORAGE_KEY = "campusConnectAnnouncements";

const emptyForm = {
  title: "",
  tag: "Academic",
  date: new Date().toISOString().slice(0, 10),
  description: "",
};

export default function AdminAnnouncementsPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const session = localStorage.getItem("campusConnectAdminSession");

    if (!session) {
      router.replace("/admin/signin");
      return;
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setItems(saved ? JSON.parse(saved) : sampleAnnouncements);
    } catch {
      setItems(sampleAnnouncements);
    }

    setLoaded(true);
  }, [router]);

  function saveItems(nextItems) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
    setItems(nextItems);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const title = form.title.trim();
    const description = form.description.trim();

    if (!title || !description) {
      setMessage("Please enter a title and description.");
      return;
    }

    let nextItems;

    if (editingId) {
      nextItems = items.map((item) =>
        item.id === editingId ? { ...item, ...form, title, description } : item,
      );
      setMessage("Announcement updated!");
    } else {
      nextItems = [
        {
          id: `announcement-${Date.now()}`,
          ...form,
          title,
          description,
          published: true,
        },
        ...items,
      ];
      setMessage("Announcement created and published!");
    }

    saveItems(nextItems);
    setForm(emptyForm);
    setEditingId(null);
  }

  function editAnnouncement(item) {
    setForm({
      title: item.title,
      tag: item.tag || "Academic",
      date: item.date,
      description: item.description,
    });
    setEditingId(item.id);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function togglePublished(item) {
    const nextItems = items.map((entry) =>
      entry.id === item.id
        ? { ...entry, published: entry.published === false }
        : entry,
    );

    saveItems(nextItems);
    setMessage("Publication status updated.");
  }

  function deleteAnnouncement(item) {
    if (!window.confirm(`Delete "${item.title}"?`)) return;

    saveItems(items.filter((entry) => entry.id !== item.id));
    if (editingId === item.id) {
      setEditingId(null);
      setForm(emptyForm);
    }
    setMessage("Announcement deleted.");
  }

  function signOut() {
    localStorage.removeItem("campusConnectAdminSession");
    router.push("/admin/signin");
  }

  if (!loaded) {
    return <main className="p-10">Loading admin dashboard...</main>;
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-gradient-to-r from-violet-950 to-indigo-700 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8">
          <div>
            <p className="text-sm font-bold tracking-widest text-violet-200">
              CAMPUSCONNECT ADMIN
            </p>
            <h1 className="mt-2 text-3xl font-extrabold">
              Announcement Manager
            </h1>
            <p className="mt-2 text-violet-100">
              Create and manage campus updates.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/announcements"
              className="rounded-xl border border-white/30 px-4 py-3 font-semibold hover:bg-white/10"
            >
              View student page
            </Link>
            <button
              onClick={signOut}
              className="rounded-xl bg-white px-4 py-3 font-bold text-violet-800 hover:bg-violet-100"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-slate-500">Total announcements</p>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              {items.length}
            </p>
          </div>
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-slate-500">Published</p>
            <p className="mt-2 text-3xl font-extrabold text-emerald-700">
              {items.filter((item) => item.published !== false).length}
            </p>
          </div>
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-slate-500">Drafts</p>
            <p className="mt-2 text-3xl font-extrabold text-amber-700">
              {items.filter((item) => item.published === false).length}
            </p>
          </div>
        </div>

        <section className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-extrabold text-slate-900">
            {editingId ? "Edit announcement" : "Create announcement"}
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700">
                Announcement title
              </label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mt-2 w-full rounded-xl border px-4 py-3"
                placeholder="e.g. Student Club Registration"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-slate-700">
                  Category
                </label>
                <select
                  value={form.tag}
                  onChange={(e) => setForm({ ...form, tag: e.target.value })}
                  className="mt-2 w-full rounded-xl border bg-white px-4 py-3"
                >
                  <option>Academic</option>
                  <option>Campus</option>
                  <option>Opportunity</option>
                  <option>Notice</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="mt-2 w-full rounded-xl border px-4 py-3"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700">
                Description
              </label>
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="mt-2 w-full rounded-xl border px-4 py-3"
                placeholder="Write the announcement details..."
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-xl bg-violet-700 px-5 py-3 font-bold text-white hover:bg-violet-800"
              >
                {editingId ? "Save Changes" : "＋ Create & Publish"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm(emptyForm);
                    setMessage("");
                  }}
                  className="rounded-xl border px-5 py-3 font-bold text-slate-700"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {message && (
              <p role="status" className="font-semibold text-violet-700">
                {message}
              </p>
            )}
          </form>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-slate-900">
            All announcements
          </h2>
          <div className="mt-5 space-y-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-800">
                        {item.tag}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          item.published === false
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {item.published === false ? "Draft" : "Published"}
                      </span>
                      <span className="text-sm text-slate-500">
                        {item.date}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-extrabold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 whitespace-pre-wrap leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap content-start gap-2">
                    <button
                      onClick={() => editAnnouncement(item)}
                      className="rounded-lg border border-violet-200 px-3 py-2 text-sm font-bold text-violet-700 hover:bg-violet-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => togglePublished(item)}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
                    >
                      {item.published === false ? "Publish" : "Unpublish"}
                    </button>
                    <button
                      onClick={() => deleteAnnouncement(item)}
                      className="rounded-lg border border-red-200 px-3 py-2 text-sm font-bold text-red-700 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
