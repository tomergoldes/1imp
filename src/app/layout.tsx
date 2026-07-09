import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "1IMP — The New Standard for Professional First Impressions",
  description:
    "1IMP is the world's first AI-powered First Impression Platform. Transform your resume into a stunning, shareable professional identity that makes recruiters stop and notice.",
  keywords: ["first impression", "AI resume", "professional profile", "job search", "career", "recruiter"],
  authors: [{ name: "1IMP" }],
  openGraph: {
    title: "1IMP — You only get one impression. Make it unforgettable.",
    description:
      "AI-powered professional first impressions. Stop being a PDF. Start getting noticed.",
    type: "website",
    url: "https://1imp.io",
    siteName: "1IMP",
  },
  twitter: {
    card: "summary_large_image",
    title: "1IMP — The New Standard for Professional First Impressions",
    description: "AI-powered professional first impressions. Stop being a PDF. Start getting noticed.",
  },
};

import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <AuthProvider>
          <Toaster position="top-center" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
