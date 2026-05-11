import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Antaraal Resort & Spa | Digital Menu",
  description: "Experience the calm and luxury of Antaraal through our digital experience.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased h-full`} suppressHydrationWarning>
      <body className="flex flex-col min-h-full bg-white text-zinc-900" suppressHydrationWarning>
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
