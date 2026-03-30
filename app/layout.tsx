import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import { GeistPixelSquare, GeistPixelCircle, GeistPixelGrid, GeistPixelTriangle } from "geist/font/pixel";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "matmul | applied ai lab",
  description:
    "We build AI systems for companies who've already tried the other way. A few engineers, a network of SMEs, no sales team.",
  metadataBase: new URL("https://matmul.io"),
  openGraph: {
    title: "matmul | applied ai lab",
    description:
      "We build AI systems for companies who've already tried the other way.",
    url: "https://matmul.io",
    siteName: "matmul",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "matmul | applied ai lab",
    description:
      "We build AI systems for companies who've already tried the other way.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${GeistPixelSquare.variable} ${GeistPixelCircle.variable} ${GeistPixelGrid.variable} ${GeistPixelTriangle.variable} ${GeistMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#f5f3f0" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0c0c0b" media="(prefers-color-scheme: dark)" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('matmul-theme');if(t==='dark'){document.documentElement.dataset.theme='dark';document.querySelector('meta[name=theme-color]').content='#0c0c0b'}})()`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
