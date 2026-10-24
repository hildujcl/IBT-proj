"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { resources } from "@/lib/data";

const REQUESTS_KEY = "campusConnectResourceRequests";
const SESSION_KEY = "campusConnectSession";
const REPORT_ID = "student-report";

const icons = {
  Programming: "💻",
  "Computer Science": "🧠",
  Career: "🚀",
  Design: "🎨",
  Academic: "📚",
};

const colors = [
  "bg-violet-100",
  "bg-blue-100",
  "bg-emerald-100",
  "bg-amber-100",
  "bg-pink-100",
];

function readRequests() {
  try {
    const saved = JSON.parse(localStorage.getItem(REQUESTS_KEY) || "[]");

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function statusStyle(status) {
  if (status === "Approved") {
    return "bg-emerald-100 text-emerald-800";
  }

  if (status === "Rejected") {
    return "bg-red-100 text-red-800";
  }

  return "bg-amber-100 text-amber-800";
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let value = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const character = text[i];
    const nextCharacter = text[i + 1];

    if (character === '"' && insideQuotes && nextCharacter === '"') {
      value += '"';
      i++;
    } else if (character === '"') {
      insideQuotes = !insideQuotes;
    } else if (character === "," && !insideQuotes) {
      row.push(value.trim());
      value = "";
    } else if ((character === "\n" || character === "\r") && !insideQuotes) {
      if (character === "\r" && nextCharacter === "\n") {
        i++;
      }

      row.push(value.trim());

      if (row.some((cell) => cell !== "")) {
        rows.push(row);
      }

      row = [];
      value = "";
    } else {
      value += character;
    }
  }

  row.push(value.trim());

  if (row.some((cell) => cell !== "")) {
    rows.push(row);
  }

  return rows;
}

export default function ResourcesClient() {
  const [category, setCategory] = useState("All resources");
  const [requests, setRequests] = useState([]);
  const [studentEmail, setStudentEmail] = useState("");
  const [message, setMessage] = useState("");
  const [downloadingReport, setDownloadingReport] = useState(false);

  useEffect(() => {
    function loadData() {
      setRequests(readRequests());

      try {
        const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");

        setStudentEmail(session?.email?.trim().toLowerCase() || "");
      } catch {
        setStudentEmail("");
      }
    }

    loadData();

    window.addEventListener("storage", loadData);
    window.addEventListener("resourceRequestsUpdated", loadData);

    return () => {
      window.removeEventListener("storage", loadData);
      window.removeEventListener("resourceRequestsUpdated", loadData);
    };
  }, []);

  const categories = useMemo(
    () => [
      "All resources",
      ...new Set(resources.map((resource) => resource.category)),
    ],
    [],
  );

  const filteredResources = useMemo(
    () =>
      category === "All resources"
        ? resources
        : resources.filter((resource) => resource.category === category),
    [category],
  );

  const myRequests = useMemo(
    () =>
      requests
        .filter(
          (request) => request.studentEmail?.toLowerCase() === studentEmail,
        )
        .sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
        ),
    [requests, studentEmail],
  );

  function saveRequests(updated) {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(updated));
    setRequests(updated);
    window.dispatchEvent(new Event("resourceRequestsUpdated"));
  }

  function requestResource(resource) {
    if (!studentEmail) {
      setMessage("Please sign in as a student before requesting resources.");
      return;
    }

    const existing = readRequests();

    const previousRequest = existing.find(
      (request) =>
        request.resourceId === resource.id &&
        request.studentEmail?.toLowerCase() === studentEmail,
    );

    if (
      previousRequest?.status === "Pending" ||
      previousRequest?.status === "Approved"
    ) {
      setMessage(
        previousRequest.status === "Approved"
          ? "Your request is already approved. You can download the resource."
          : "You already have a pending request for this resource.",
      );
      return;
    }

    const updated = existing.filter(
      (request) =>
        !(
          request.resourceId === resource.id &&
          request.studentEmail?.toLowerCase() === studentEmail
        ),
    );

    updated.push({
      id: `RES-${Date.now()}`,
      resourceId: resource.id,
      resourceTitle: resource.title,
      studentEmail,
      status: "Pending",
      createdAt: new Date().toISOString(),
    });

    saveRequests(updated);
    setMessage(`Your request for "${resource.title}" has been submitted.`);
  }

  function requestStudentReport() {
    requestResource({
      id: REPORT_ID,
      title: "Student Report (PDF)",
    });
  }

  async function downloadStudentReport() {
    const approved = myRequests.some(
      (request) =>
        request.resourceId === REPORT_ID && request.status === "Approved",
    );

    if (!approved) {
      setMessage("The Admin must approve your student report request first.");
      return;
    }

    setDownloadingReport(true);
    setMessage("");

    try {
      const response = await fetch("/data/student.csv");

      if (!response.ok) {
        throw new Error("Could not load the student report data.");
      }

      const csvText = await response.text();
      const rows = parseCSV(csvText);

      if (rows.length < 2) {
        throw new Error("The student report contains no records.");
      }

      const headers = rows[0];
      const body = rows.slice(1);

      const pdf = new jsPDF({ orientation: "landscape" });

      pdf.setFontSize(18);
      pdf.text("CampusConnect Student Report", 14, 18);

      pdf.setFontSize(10);
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 26);
      pdf.text(`Total records: ${body.length}`, 14, 32);

      autoTable(pdf, {
        head: [headers],
        body,
        startY: 39,
        styles: {
          fontSize: 9,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [109, 40, 217],
        },
      });

      pdf.save("campusconnect-student-report.pdf");
      setMessage("Your student report PDF has been downloaded.");
    } catch (error) {
      setMessage(error.message || "Unable to generate the student report PDF.");
    } finally {
      setDownloadingReport(false);
    }
  }

  function renderResourceAction(resource) {
    const myRequest = myRequests.find(
      (request) => request.resourceId === resource.id,
    );

    if (myRequest?.status === "Approved") {
      const downloadUrl =
        resource.downloadUrl || `/resources/${resource.id}.pdf`;

      return (
        <a
          href={downloadUrl}
          download
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-bold text-white transition hover:bg-emerald-700"
        >
          Download resource ↓
        </a>
      );
    }

    if (myRequest?.status === "Pending") {
      return (
        <button
          type="button"
          disabled
          className="mt-5 w-full cursor-not-allowed rounded-xl bg-amber-100 px-4 py-3 font-bold text-amber-800"
        >
          Request pending
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={() => requestResource(resource)}
        className="mt-5 w-full rounded-xl bg-violet-700 px-4 py-3 font-bold text-white transition hover:bg-violet-800"
      >
        {myRequest?.status === "Rejected"
          ? "Request again ↗"
          : "Request resource ↗"}
      </button>
    );
  }

  const reportRequest = myRequests.find(
    (request) => request.resourceId === REPORT_ID,
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900"
        >
          ← Back to Dashboard
        </Link>

        <section className="mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-800 via-violet-700 to-indigo-800 px-6 py-10 text-white sm:px-10 sm:py-14">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-200">
            CampusConnect Library
          </p>

          <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl">
            Learning Resources
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-violet-100 sm:text-lg">
            Explore study materials, career guides, and academic resources.
            Request access and download approved materials.
          </p>

          {!studentEmail && (
            <Link
              href="/signin"
              className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-violet-800 hover:bg-violet-50"
            >
              Sign in to request resources
            </Link>
          )}
        </section>

        {message && (
          <div
            role="status"
            className="mt-6 rounded-xl border border-violet-200 bg-violet-50 p-4 text-sm font-medium text-violet-900"
          >
            {message}
          </div>
        )}

        <section className="mt-10 rounded-2xl border border-violet-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Student Report
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Request permission to generate and download the student report
                as a PDF.
              </p>
            </div>

            {reportRequest?.status === "Approved" ? (
              <button
                type="button"
                onClick={downloadStudentReport}
                disabled={downloadingReport}
                className="rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                {downloadingReport
                  ? "Generating PDF..."
                  : "Download report PDF ↓"}
              </button>
            ) : reportRequest?.status === "Pending" ? (
              <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-800">
                Awaiting Admin approval
              </span>
            ) : (
              <button
                type="button"
                onClick={requestStudentReport}
                className="rounded-xl bg-violet-700 px-5 py-3 font-bold text-white hover:bg-violet-800"
              >
                {reportRequest?.status === "Rejected"
                  ? "Request again"
                  : "Request report access"}
              </button>
            )}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Explore Resources
              </h2>
              <p className="mt-2 text-slate-600">
                Choose a category to find the material you need.
              </p>
            </div>

            <p className="text-sm text-slate-500">
              {filteredResources.length} resources
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  category === item
                    ? "bg-violet-700 text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:text-violet-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {filteredResources.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <p className="font-semibold text-slate-700">
                No resources found in this category.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((resource, index) => (
                <article
                  key={resource.id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${
                      colors[index % colors.length]
                    }`}
                  >
                    {icons[resource.category] || "📘"}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
                      {resource.category}
                    </span>

                    {resource.type && (
                      <span className="text-xs font-medium text-slate-500">
                        {resource.type}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-slate-900">
                    {resource.title}
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                    {resource.description}
                  </p>

                  {(resource.fileType || resource.fileSize) && (
                    <p className="mt-4 text-xs font-medium text-slate-500">
                      {[resource.fileType, resource.fileSize]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}

                  {renderResourceAction(resource)}
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-extrabold text-slate-900">
              My Resource Requests
            </h2>
            <span className="text-sm text-slate-500">
              {myRequests.length} requests
            </span>
          </div>

          {!studentEmail ? (
            <p className="mt-5 text-slate-600">
              Sign in to view your resource requests.
            </p>
          ) : myRequests.length === 0 ? (
            <p className="mt-5 rounded-xl bg-slate-50 p-5 text-slate-600">
              You have not requested any resources yet.
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {myRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {request.resourceTitle}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Requested{" "}
                      {request.createdAt
                        ? new Date(request.createdAt).toLocaleDateString()
                        : "date unavailable"}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${statusStyle(
                      request.status,
                    )}`}
                  >
                    {request.status || "Pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
