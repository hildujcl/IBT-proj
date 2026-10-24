"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const REQUESTS_KEY = "campusConnectResourceRequests";
const ADMIN_KEY = "campusConnectAdminSession";

function readRequests() {
  try {
    const saved = JSON.parse(localStorage.getItem(REQUESTS_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export default function AdminResourceRequestsClient() {
  const [requests, setRequests] = useState([]);
  const [authorized, setAuthorized] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState("All");
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const session = JSON.parse(localStorage.getItem(ADMIN_KEY) || "null");

      if (session?.role === "admin") {
        setAuthorized(true);
        setRequests(readRequests());
      }
    } catch {
      setAuthorized(false);
    }

    setLoaded(true);

    function refreshRequests() {
      setRequests(readRequests());
    }

    window.addEventListener("resourceRequestsUpdated", refreshRequests);
    window.addEventListener("storage", refreshRequests);

    return () => {
      window.removeEventListener("resourceRequestsUpdated", refreshRequests);
      window.removeEventListener("storage", refreshRequests);
    };
  }, []);

  function updateStatus(id, status) {
    const session = JSON.parse(localStorage.getItem(ADMIN_KEY) || "null");

    if (session?.role !== "admin") {
      setAuthorized(false);
      setMessage("Please sign in with the Admin account.");
      return;
    }

    const updated = readRequests().map((request) =>
      request.id === id
        ? {
            ...request,
            status,
            reviewedAt: new Date().toISOString(),
          }
        : request,
    );

    localStorage.setItem(REQUESTS_KEY, JSON.stringify(updated));
    setRequests(updated);
    window.dispatchEvent(new Event("resourceRequestsUpdated"));
    setMessage(`Request ${status.toLowerCase()} successfully.`);
  }

  const visibleRequests =
    filter === "All"
      ? requests
      : requests.filter((request) => request.status === filter);

  const pendingCount = requests.filter(
    (request) => request.status === "Pending",
  ).length;

  if (!loaded) {
    return <main className="p-8">Loading report requests...</main>;
  }

  if (!authorized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <section className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="text-4xl">🔐</div>
          <h1 className="mt-4 text-2xl font-extrabold text-slate-900">
            Admin sign-in required
          </h1>
          <p className="mt-3 text-slate-600">
            Sign in with your existing Admin account to review report requests.
          </p>
          <Link
            href="/admin/signin"
            className="mt-6 inline-flex rounded-xl bg-violet-700 px-5 py-3 font-bold text-white hover:bg-violet-800"
          >
            Admin sign in →
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-violet-950 via-violet-800 to-indigo-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8">
          <Link
            href="/admin/announcements"
            className="text-sm font-semibold text-violet-200 hover:text-white"
          >
            ← Manage announcements
          </Link>

          <p className="mt-8 text-sm font-bold tracking-[0.2em] text-violet-300">
            CAMPUSCONNECT ADMIN
          </p>
          <h1 className="mt-3 text-4xl font-extrabold">Report requests</h1>
          <p className="mt-3 max-w-2xl leading-7 text-violet-100">
            Review student requests and approve or reject access to the report.
          </p>

          <div className="mt-7 inline-flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 px-5 py-4">
            <span className="text-3xl">📄</span>
            <div>
              <p className="text-2xl font-extrabold">{pendingCount}</p>
              <p className="text-sm text-violet-200">Pending requests</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Student submissions
            </h2>
            <p className="mt-2 text-slate-600">
              {requests.length} total request{requests.length === 1 ? "" : "s"}
            </p>
          </div>

          <label className="text-sm font-semibold text-slate-700">
            Filter requests
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 sm:w-48"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </label>
        </div>

        {message && (
          <p
            role="status"
            className="mt-5 rounded-xl bg-violet-50 p-4 font-medium text-violet-800"
          >
            {message}
          </p>
        )}

        {visibleRequests.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="text-5xl">📭</div>
            <h3 className="mt-4 text-xl font-bold text-slate-900">
              No requests found
            </h3>
            <p className="mt-2 text-slate-600">
              Student report requests will appear here when submitted.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {visibleRequests.map((request) => (
              <article
                key={request.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                  <div className="min-w-0">
                    <h3 className="text-lg font-extrabold text-slate-900">
                      {request.resourceTitle || "Student report"}
                    </h3>
                    <p className="mt-2 break-all text-slate-600">
                      Student: {request.studentEmail}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Submitted:{" "}
                      {request.createdAt
                        ? new Date(request.createdAt).toLocaleString()
                        : "Date unavailable"}
                    </p>
                    <span
                      className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                        request.status === "Approved"
                          ? "bg-emerald-100 text-emerald-800"
                          : request.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {request.status || "Pending"}
                    </span>
                  </div>

                  {request.status === "Pending" && (
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => updateStatus(request.id, "Approved")}
                        className="rounded-xl bg-emerald-600 px-4 py-3 font-bold text-white hover:bg-emerald-700"
                      >
                        ✓ Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => updateStatus(request.id, "Rejected")}
                        className="rounded-xl bg-red-600 px-4 py-3 font-bold text-white hover:bg-red-700"
                      >
                        ✕ Reject
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        <Link
          href="/resources"
          className="mt-8 inline-flex font-bold text-violet-700 hover:text-violet-900"
        >
          View Learning Resources →
        </Link>
      </section>
    </main>
  );
}
