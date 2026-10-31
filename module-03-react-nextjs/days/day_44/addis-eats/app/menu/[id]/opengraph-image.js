import { ImageResponse } from "next/og";
import { getDish } from "../../lib/dishes";

export const alt = "Addis Eats Ethiopian Food";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }) {
  const { id } = await params;
  const dish = getDish(id);

  const name = dish?.name || "Addis Eats";
  const description = dish?.summary || "Discover Ethiopian food.";

  const price = dish ? `${dish.price} ETB` : "";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#14251e",
        color: "white",
        padding: "60px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 48 }}>🍲 ADDIS EATS</div>

      <div
        style={{
          fontSize: 90,
          fontWeight: "bold",
          marginTop: 35,
        }}
      >
        {name}
      </div>

      <div
        style={{
          fontSize: 30,
          marginTop: 25,
          textAlign: "center",
        }}
      >
        {description}
      </div>

      <div
        style={{
          fontSize: 42,
          color: "#f4a340",
          marginTop: 30,
        }}
      >
        {price}
      </div>
    </div>,
    size,
  );
}
