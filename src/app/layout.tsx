import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({ 
  weight: ["300", "400", "600"], 
  style: ["normal", "italic"], 
  subsets: ["latin"], 
  variable: "--font-cormorant" 
});

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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${cormorant.variable}`}>
      <body className="antialiased bg-[#020202] text-white">{children}</body>
    </html>
  );
}
