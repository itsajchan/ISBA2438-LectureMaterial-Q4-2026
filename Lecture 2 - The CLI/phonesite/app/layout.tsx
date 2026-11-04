import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompareTray from "@/components/CompareTray";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PhoneMart — Big Deals on Mobile Phones",
  description:
    "Shop the latest phones from Apple, Samsung, Google, OnePlus, Xiaomi and more. Weekly deals, honest reviews, and instant checkout.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={notoSans.variable}>
      <body className="min-h-screen antialiased">
        <Providers>
          <Header />
          <main className="mx-auto max-w-7xl px-4 py-6 pb-24">{children}</main>
          <Footer />
          <CompareTray />
        </Providers>
      </body>
    </html>
  );
}
