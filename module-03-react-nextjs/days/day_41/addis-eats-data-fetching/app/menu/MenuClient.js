"use client";

import { useCallback, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";

import { fetcher } from "@/lib/fetcher";
import SearchBox from "./SearchBox";
import DishCard from "@/components/DishCard";

export default function MenuClient({ initialQuery = "", initialPage = 1 }) {
  const router = useRouter();

  const [query, setQuery] = useState(initialQuery);

  const [page, setPage] = useState(initialPage);

  const [category, setCategory] = useState("All");

  const key =
    `/api/dishes?q=${encodeURIComponent(query)}` +
    `&category=${encodeURIComponent(category)}` +
    `&page=${page}`;

  const { data, error, isLoading } = useSWR(key, fetcher, {
    keepPreviousData: true,
  });

  const handleSearch = useCallback(
    (value) => {
      setQuery(value);
      setPage(1);

      const params = new URLSearchParams();

      if (value) {
        params.set("q", value);
      }

      params.set("page", "1");

      router.replace(`/menu?${params.toString()}`);
    },
    [router],
  );

  function changeCategory(value) {
    setCategory(value);
    setPage(1);
  }

  function changePage(newPage) {
    setPage(newPage);

    const params = new URLSearchParams();

    if (query) {
      params.set("q", query);
    }

    params.set("page", String(newPage));

    router.replace(`/menu?${params.toString()}`);
  }

  if (error) {
    return (
      <div className="error-box">
        <h2>Oops!</h2>
        <p>Could not load the menu.</p>
      </div>
    );
  }

  return (
    <section className="menu-section">
      <div className="menu-heading">
        <div>
          <h1>Our Menu</h1>
          <p>Discover authentic Ethiopian dishes</p>
        </div>

        <SearchBox initialQuery={initialQuery} onSearch={handleSearch} />
      </div>

      <div className="categories">
        {["All", "Traditional", "Meat", "Vegetarian"].map((item) => (
          <button
            key={item}
            onClick={() => changeCategory(item)}
            className={category === item ? "category active" : "category"}
          >
            {item}
          </button>
        ))}
      </div>

      {isLoading && !data && (
        <div className="loading">Loading delicious food...</div>
      )}

      {data?.data?.length === 0 && (
        <div className="empty">
          <h2>No dishes found 😭</h2>
          <p>Try searching for something else.</p>
        </div>
      )}

      {data && data.data.length > 0 && (
        <>
          <div className="dish-grid">
            {data.data.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>

          <div className="pagination">
            <button disabled={page === 1} onClick={() => changePage(page - 1)}>
              ←
            </button>

            {Array.from(
              { length: data.totalPages },
              (_, index) => index + 1,
            ).map((number) => (
              <button
                key={number}
                onClick={() => changePage(number)}
                className={page === number ? "page active" : "page"}
              >
                {number}
              </button>
            ))}

            <button
              disabled={page === data.totalPages}
              onClick={() => changePage(page + 1)}
            >
              →
            </button>
          </div>

          {isLoading && <p className="updating">Updating menu...</p>}
        </>
      )}
    </section>
  );
}
