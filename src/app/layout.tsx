import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Good Company — Concierge Training",
  description: "Training app for The Good Company People Concierge volunteers",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans bg-brand-bg text-brand-text antialiased`}>
        <div className="max-w-[480px] mx-auto bg-brand-bg min-h-screen relative">
          {children}
        </div>
      </body>
    </html>
  );
}
