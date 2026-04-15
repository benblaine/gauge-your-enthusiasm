import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { CityLights } from "@/components/decorative/CityLights";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
const accent = Orbitron({
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Penthouse Observatory",
  description:
    "From South African matric physics to the metric tensor and beyond — an interactive course following the Weinstein × Davis podcast.",
  metadataBase: new URL("https://penthouse-observatory.example.com"),
  openGraph: {
    title: "The Penthouse Observatory",
    description: "Matric to Geometric Unity, in 10 modules.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} ${accent.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <CityLights />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
