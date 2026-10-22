"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { events as sampleEvents } from "@/lib/data";

export default function EventDetailClient() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [ready, setReady] = useState(false);
  const [signedInUser, setSignedInUser] = useState(null);

  useEffect(() => {
    try {
      const savedEvents = JSON.parse(
        localStorage.getItem("campusConnectEvents") || "[]",
      );

      const allEvents = [
        ...(Array.isArray(savedEvents) ? savedEvents : []),
        ...sampleEvents,
      ];

      const foundEvent = allEvents.find(
        (item) => String(item.id) === String(id),
      );

      setEvent(foundEvent || null);

      const session = localStorage.getItem("campusConnectSession");
      setSignedInUser(session ? JSON.parse(session) : null);
    } catch (error) {
      console.error("Could not load event details:", error);
      setEvent(null);
    } finally {
      setReady(true);
    }
  }, [id]);

  if (!ready) {
    return (
      <section className="page-shell detail-shell">
        <p className="text-center text-slate-500">Loading event details...</p>
      </section>
    );
  }

  if (!event) {
    return (
      <section className="page-shell detail-shell">
        <div className="detail-card p-8 text-center">
          <h1 className="text-2xl font-bold">Event not found</h1>
          <p className="mt-3 text-slate-600">
            This event may not exist or may no longer be available in this
            browser.
          </p>
          <Link href="/events" className="back-link mt-6 inline-block">
            ← Back to events
          </Link>
        </div>
      </section>
    );
  }

  const formattedDate = event.date
    ? new Date(`${event.date}T12:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Date to be announced";

  const organizer = event.organizer || event.creatorName || "Campus Community";

  return (
    <section className="page-shell detail-shell">
      <Link href="/events" className="back-link">
        ← Back to events
      </Link>

      <article className="detail-card">
        {event.image ? (
          <img
            className="detail-image"
            src={event.image}
            alt="Students learning and collaborating at a campus event"
          />
        ) : (
          <div className="detail-image flex items-center justify-center bg-gradient-to-br from-violet-100 via-purple-100 to-fuchsia-100 text-6xl">
            📅
          </div>
        )}

        <div className="detail-content">
          <span className="category-pill static-pill">
            {event.category || "Campus Event"}
          </span>

          <h1>{event.title}</h1>

          <p className="detail-lead">{event.description}</p>

          <div className="detail-facts">
            <div>
              <span>DATE</span>
              <strong>▦ {formattedDate}</strong>
            </div>

            <div>
              <span>TIME</span>
              <strong>◷ {event.time || "To be announced"}</strong>
            </div>

            <div>
              <span>LOCATION</span>
              <strong>⌖ {event.location || "To be announced"}</strong>
            </div>

            <div>
              <span>COMMUNITY</span>
              <strong>♙ {event.attendees ?? 0} interested</strong>
            </div>
          </div>

          <div className="organizer-row">
            <span className="organizer-avatar">✦</span>
            <span>
              <small>ORGANIZED BY</small>
              <strong>{organizer}</strong>
            </span>
          </div>

          {signedInUser ? (
            <p className="inline-success" role="status">
              You’re signed in as {signedInUser.name}. Ask the organizer to
              confirm your attendance.
            </p>
          ) : (
            <div className="detail-cta">
              <Link
                className="button"
                href={`/signin?next=${encodeURIComponent(`/events/${event.id}`)}`}
              >
                Sign in to join event →
              </Link>
              <p>Sign in to connect with event organizers.</p>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}
