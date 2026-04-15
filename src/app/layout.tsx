import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "American Dream | Commercial Leasing",
  description:
    "Global commercial epicenter merging retail, entertainment, and culture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-[#020202] text-white">{children}</body>
    </html>
  );
}
