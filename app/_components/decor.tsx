export function Decor() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      <div
        className="absolute rounded-full"
        style={{
          top: "-18vmin",
          right: "-14vmin",
          width: "42vmin",
          height: "42vmin",
          background: "var(--accent-maroon)",
          opacity: 0.28,
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: "-6vmin",
          right: "8vmin",
          width: "16vmin",
          height: "16vmin",
          background: "var(--accent-purple)",
          opacity: 0.22,
          filter: "blur(30px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          bottom: "-20vmin",
          left: "-16vmin",
          width: "46vmin",
          height: "46vmin",
          background: "var(--brand)",
          opacity: 0.22,
          filter: "blur(45px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          bottom: "4vmin",
          left: "18vmin",
          width: "18vmin",
          height: "18vmin",
          background: "var(--accent-lime)",
          opacity: 0.25,
          filter: "blur(30px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          bottom: "-10vmin",
          right: "-6vmin",
          width: "20vmin",
          height: "20vmin",
          background: "var(--accent-gold)",
          opacity: 0.22,
          filter: "blur(35px)",
        }}
      />
    </div>
  );
}
