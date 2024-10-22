import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "ЕКОМ | ТЗ",
  description: "developed by Shoxrux",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
