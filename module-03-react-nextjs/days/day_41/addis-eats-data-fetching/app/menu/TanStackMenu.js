"use client";

import { useQuery } from "@tanstack/react-query";

async function getDishes() {
  const response = await fetch("/api/dishes");

  if (!response.ok) {
    throw new Error("Failed to fetch dishes");
  }

  return response.json();
}

export default function TanStackMenu() {
  const { data, error, isPending } = useQuery({
    queryKey: ["dishes"],
    queryFn: getDishes,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Could not load dishes.</p>;
  }

  return (
    <div className="dish-grid">
      {data.data.map((dish) => (
        <article key={dish.id} className="dish-card">
          <h3>{dish.name}</h3>
          <p>{dish.description}</p>
          <strong>ETB {dish.price}</strong>
        </article>
      ))}
    </div>
  );
}
