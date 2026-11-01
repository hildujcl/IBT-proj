import MenuClient from "@/components/MenuClient";

export const metadata = {
  title: "Our Menu",
  description:
    "Explore Ethiopian traditional and vegetarian dishes at Addis Eats.",
};

export default function MenuPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-heading">
          <h1>Our Menu ♡</h1>

          <p>Find your favorite Ethiopian dishes and add them to your cart.</p>
        </div>

        <MenuClient />
      </div>
    </section>
  );
}
