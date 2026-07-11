import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
const poppins = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "edu-Blink",
    template: "%s | edu-Blink",
  },
  description: "A platform for education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full py-5 flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
