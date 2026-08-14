import { ImageResponse } from "next/og";

export const alt = "Inglés Flashcards";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fdf2f8 0%, #fbe0ee 55%, #f7c9de 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 180,
            height: 180,
            borderRadius: 40,
            background: "#C3136B",
            color: "#fff",
            fontSize: 84,
            marginBottom: 40,
            boxShadow: "0 20px 60px -20px rgba(149, 15, 82, 0.5)",
          }}
        >
          🎓
        </div>
        <div style={{ display: "flex", fontSize: 108, fontStyle: "italic", fontWeight: 600, color: "#950F52" }}>Inglés</div>
        <div
          style={{
            display: "flex",
            marginTop: 8,
            fontSize: 32,
            letterSpacing: 8,
            textTransform: "uppercase",
            fontWeight: 700,
            color: "#C3136B",
          }}
        >
          Flashcards
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 26, color: "#9d174d" }}>
          Repetición espaciada para el vocabulario de tus clases
        </div>
      </div>
    ),
    { ...size }
  );
}
