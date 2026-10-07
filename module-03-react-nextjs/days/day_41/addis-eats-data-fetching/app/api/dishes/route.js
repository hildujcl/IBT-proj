import { dishes } from "@/lib/dishes";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q")?.trim().toLowerCase() || "";

  const category = searchParams.get("category") || "All";

  const page = Math.max(Number(searchParams.get("page") || 1), 1);

  const limit = 6;

  let filteredDishes = dishes;

  if (query) {
    filteredDishes = filteredDishes.filter((dish) =>
      dish.name.toLowerCase().includes(query),
    );
  }

  if (category !== "All") {
    filteredDishes = filteredDishes.filter(
      (dish) => dish.category === category,
    );
  }

  const start = (page - 1) * limit;
  const end = start + limit;

  const results = filteredDishes.slice(start, end);

  return Response.json({
    data: results,
    page,
    limit,
    total: filteredDishes.length,
    totalPages: Math.ceil(filteredDishes.length / limit),
  });
}
