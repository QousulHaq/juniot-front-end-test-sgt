import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Navbar from "@/components/Navbar";
import AntdProvider from "@/components/provider/AntdProvider";
import ReactQueryProvider from "@/components/provider/ReactQueryProvider";
import { AuthProvider } from "@/components/provider/AuthProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Front-End Web Application Test",
  description: "Test Front-End Web Application (CRUD Product)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-neutral-950 transition-colors duration-300`}
      >
        <AuthProvider>
          <ReactQueryProvider>
            <AntdProvider>
              <AntdRegistry>{children}</AntdRegistry>
            </AntdProvider>
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
