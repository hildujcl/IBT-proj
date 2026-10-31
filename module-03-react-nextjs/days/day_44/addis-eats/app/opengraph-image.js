import { ImageResponse } from "next/og";

export const alt = "Addis Eats Ethiopian Food";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
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
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 100 }}>🍲</div>

      <div style={{ fontSize: 80, fontWeight: "bold" }}>Addis Eats</div>

      <div style={{ fontSize: 35, marginTop: 25 }}>
        Authentic Ethiopian Food
      </div>

      <div style={{ fontSize: 26, marginTop: 15 }}>
        Discover the taste of Ethiopia
      </div>
    </div>,
    size,
  );
}
