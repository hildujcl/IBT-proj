import { ImageResponse } from "next/og";

import { getDishById } from "@/lib/dishes";

export const alt = "Addis Eats Ethiopian food";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage({ params }) {
  const { id } = await params;

  const dish = getDishById(id);

  const dishName = dish?.name || "Ethiopian Food";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#F4EDFF",
        color: "#5B3B91",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          fontSize: 42,
          marginBottom: 25,
        }}
      >
        Addis Eats ♡
      </div>

      <div
        style={{
          fontSize: 80,
          fontWeight: 800,
        }}
      >
        {dishName}
      </div>

      <div
        style={{
          fontSize: 30,
          marginTop: 25,
        }}
      >
        A little taste of Ethiopia
      </div>
    </div>,
    size,
  );
}
