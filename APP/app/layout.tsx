import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Civilisation.One Test Platform",
  description: "Global Hub Sphere, CIV1 Score, and node display prototype.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
