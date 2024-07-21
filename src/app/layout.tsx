import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "BSA Norton and Triumph Motorcycle Gear Ratios and their effects on Road Speeds",
  description:
    "This page enables you to enter different gear ratios and sprocket sizes to visualize the effects on road speeds. You can select from BSA Triumph or Notron gearboxws or manually enter the ratios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-bs-theme="light">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
