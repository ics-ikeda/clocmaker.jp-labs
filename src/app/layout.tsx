import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { data } from "@/data";
import type { DataStructure } from "@/types/item-data";

export const metadata: Metadata = {
  title: "ClockMaker Labs - Interaction Design × Web Technology",
  description:
    "Portfolio website of IKEDA Yasunobu a.k.a ClockMaker / Web Designer and Frontend Engineer from Tokyo, Japan.",
  keywords:
    "portfolio, web design, frontend, interaction design, web technology",
  authors: [{ name: "IKEDA Yasunobu" }],
  creator: "IKEDA Yasunobu",
  publisher: "clockmaker.jp",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://clockmaker.jp/labs/"),
  openGraph: {
    title: "ClockMaker Labs - Interaction Design × Web Technology",
    description:
      "Portfolio website of IKEDA Yasunobu a.k.a ClockMaker / Web Designer and Developer from Tokyo, Japan.",
    url: "https://clockmaker.jp/labs/",
    siteName: "clockmaker.jp",
    images: [
      {
        url: "https://labs.clockmaker.jp/images/preview.jpg",
        width: 1200,
        height: 630,
        alt: "ClockMaker Labs Preview",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClockMaker Labs - Interaction Design × Web Technology",
    description:
      "Portfolio website of IKEDA Yasunobu a.k.a ClockMaker / Web Designer and Developer from Tokyo, Japan.",
    site: "@clockmaker",
    images: ["https://labs.clockmaker.jp/images/preview.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "notranslate",
  },
  other: {
    "color-scheme": "dark",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // demo URLからドメインを抽出してprefetch対象にする（DNS解決のみ）
  const demoDomains = data
    .flat() // 2次元配列を1次元に平坦化
    .map((item) => item.demo)
    .filter((url) => url && url.startsWith("http"))
    .map((url) => {
      try {
        return new URL(url).origin;
      } catch {
        return null;
      }
    })
    .filter((domain) => domain !== null)
    .filter((domain, index, self) => self.indexOf(domain) === index); // 重複削除

  return (
    <html lang="ja">
      <head>
        <meta name="google" content="notranslate" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0"
        />
        <meta name="color-scheme" content="dark" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Ropa+Sans:wght@400&family=Lato:wght@100;300;400&display=swap"
          rel="stylesheet"
        />

        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />

        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />

        {/* Demo Domains DNS Prefetch */}
        {demoDomains.map((domain, index) => (
          <link key={index} rel="dns-prefetch" href={domain} />
        ))}
      </head>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-3PRT3QNJLL" />
    </html>
  );
}
