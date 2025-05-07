import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/components/nav-bar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Note",
  description: "Develope by Phan Minh Thuan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
      </head>
      <body>
        <NavBar />
        <main className="bg-gradient-to-r from-sky-100 via-indigo-250 to-purple-400 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
