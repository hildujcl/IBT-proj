import MenuClient from "./MenuClient";

export default async function MenuPage({ searchParams }) {
  const params = await searchParams;

  const query = params?.q || "";

  const page = Number(params?.page) || 1;

  return (
    <main>
      <MenuClient initialQuery={query} initialPage={page} />
    </main>
  );
}
