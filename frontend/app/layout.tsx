import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { InvestigationProvider } from "@/app/lib/store";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PHANTASM — Graph Resolution Engine",
  description: "Cyber Crime & Digital Forensics Law Enforcement Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#050912] text-gray-100 selection:bg-cyan-500 selection:text-black`}
      >
        <InvestigationProvider>
          {children}
        </InvestigationProvider>
      </body>
    </html>
  );
}
