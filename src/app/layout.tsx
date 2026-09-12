import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "openkitty - Mobile App & Game Market Intelligence",
  description: "Market intelligence across the entire App Store and Google Play Store. Track app & game revenues, downloads, winning ads, paywall tear downs, and ASO rankings.",
  keywords: "openkitty, app intelligence, mobile games market, app store revenue, download estimates, mobile ad spy, aso tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white min-h-screen flex flex-col antialiased selection:bg-white selection:text-black">
        <Navbar />
        <main className="flex-1 mx-auto w-full max-w-7xl px-3.5 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </main>
        <footer className="border-t border-zinc-900 bg-black py-8 text-center text-xs text-zinc-500">
          <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-tight">openkitty</span>
              <span className="text-zinc-600">—</span>
              <span>Whole App Store & Google Play Store Intelligence</span>
            </div>
            <div className="flex items-center gap-4 text-zinc-500 text-[11px]">
              <span>Updated Daily</span>
              <span>•</span>
              <span>15,000+ Indexed Apps & Games</span>
              <span>•</span>
              <span>Live Store Querying</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
