import type { Metadata } from "next";
import { Source_Serif_4, Inter, IBM_Plex_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["600", "700"],
});
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});
const hero = Fraunces({
  subsets: ["latin"],
  variable: "--font-hero",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  title: "Signal — Daily AI Intelligence Briefing",
  description: "Cuts through the noise: today's most important AI research, product launches, company moves, policy, and investment news, ranked and summarized.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${serif.variable} ${sans.variable} ${mono.variable} ${hero.variable} font-body bg-wire bg-wire-gradient bg-no-repeat text-ink antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-1 w-full max-w-3xl mx-auto px-5 sm:px-8 py-8 sm:py-12">{children}</main>
          <footer className="border-t border-wire-line py-6 text-center text-xs font-mono text-ink-soft/70">
            Signal — arXiv, OpenAI, DeepMind, Hugging Face &amp; leading AI journalism, ranked daily
          </footer>
        </div>
      </body>
    </html>
  );
}
