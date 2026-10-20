import { NextResponse } from "next/server";
import { events } from "@/lib/data";

export const dynamic = "force-dynamic";

export function GET(request) {
  const { searchParams } = new URL(request.url);

  const query = (searchParams.get("q") || "").trim().toLowerCase();
  const category = (searchParams.get("category") || "All").trim();

  const filteredEvents = events.filter((event) => {
    const matchesCategory = category === "All" || event.category === category;

    const searchableText = [
      event.title,
      event.description,
      event.location,
      event.category,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesQuery = searchableText.includes(query);

    return matchesCategory && matchesQuery;
  });

  return NextResponse.json(
    {
      success: true,
      total: filteredEvents.length,
      data: filteredEvents,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    },
  );
}
