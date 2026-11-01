"use client";

const categories = ["All", "Traditional", "Vegetarian"];

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="category-list">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={
            selectedCategory === category
              ? "category-button active"
              : "category-button"
          }
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
