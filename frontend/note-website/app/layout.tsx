import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/components/NavBar"
import CustomDrawer from "@/app/components/FolderDrawer";
import RightDrawer from "@/app/components/GroupDrawer";

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
    <html lang="vi" className="h-full">
      <head>
        {/* Optional: Add meta tags or other head content */}
      </head>
      <body className="h-full overflow-hidden m-0 p-0 flex flex-col">
        <NavBar />
        <main className="flex-1 bg-gradient-to-r from-sky-100 via-indigo-250 to-purple-400 overflow-hidden">
          <CustomDrawer>
            <RightDrawer>{children}</RightDrawer>
          </CustomDrawer>
        </main>
      </body>
    </html>
  );
}
