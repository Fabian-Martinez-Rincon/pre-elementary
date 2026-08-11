import type { Metadata } from "next";
import { ThemeToggle } from "./_components/theme-toggle";
import { Nav } from "./_components/nav";
import { InlineScript } from "./_components/inline-script";
import { Decor } from "./_components/decor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inglés flashcards",
  description: "Repasá el vocabulario de tus clases de inglés con repetición espaciada.",
};

const THEME_INIT_SCRIPT = `
  try {
    var t = localStorage.getItem("theme");
    var d = t === "light" || t === "dark" ? t : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", d);
  } catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" data-theme="light" suppressHydrationWarning className="h-full antialiased">
      <head>
        <InlineScript html={THEME_INIT_SCRIPT} />
      </head>
      <body className="relative flex min-h-full flex-col bg-background">
        <Decor />
        <header className="sticky top-0 z-20 border-b border-(--line) bg-(--bg-elevated)">
          <div className="flex flex-wrap items-center gap-3 px-3 py-2 lg:px-4">
            <div className="flex items-center gap-1.5">
              <div className="flex flex-col leading-none">
                <span className="text-xl font-extrabold tracking-tight" style={{ color: "var(--brand)" }}>
                  Inglés
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">Flashcards</span>
              </div>
              <span aria-hidden className="mb-3 text-sm font-black" style={{ color: "var(--accent-lime)" }}>
                ✕
              </span>
            </div>
            <Nav />
            <div className="ml-auto flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="relative flex-1">{children}</main>
      </body>
    </html>
  );
}
