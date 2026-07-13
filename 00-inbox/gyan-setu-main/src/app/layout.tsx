import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gyaan Setu — Knowledge City Digital Library",
  description: "AI-Driven Capital Knowledge City Digital Library Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
