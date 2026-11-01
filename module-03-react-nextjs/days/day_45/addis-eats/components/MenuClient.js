"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";

import DishCard from "@/components/DishCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";

const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not load the menu.");
  }

  return response.json();
};

export default function MenuClient() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data, error, isLoading } = useSWR("/api/dishes", fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
  });

  const dishes = data?.dishes || [];

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesSearch =
        dish.name.toLowerCase().includes(search.toLowerCase()) ||
        dish.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || dish.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [dishes, search, selectedCategory]);

  if (isLoading) {
    return <div className="loading-screen">Loading delicious dishes...</div>;
  }

  if (error) {
    return (
      <div className="container empty-state">
        <h2>Unable to load the menu</h2>
        <p>Please refresh the page and try again.</p>
      </div>
    );
  }

  return (
    <section>
      <div>
        <SearchBar search={search} setSearch={setSearch} />

        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {filteredDishes.length > 0 ? (
        <div className="dish-grid">
          {filteredDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No dishes found</h3>
          <p>Try another search or category.</p>
        </div>
      )}
    </section>
  );
}
