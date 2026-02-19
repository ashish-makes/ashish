import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ashish.cv"),
  title: {
    default: "Ashish • Software Developer",
    template: "%s | Ashish"
  },
  description: "Creative portfolio of Ashish, a software developer focused on building digital experiences that bridge precision and emotion.",
  keywords: [
    "Ashish", "software developer", "portfolio",
    "web developer", "Next.js developer",
    "React developer", "full stack developer", "frontend engineer",
    "digital experiences", "case studies", "web design"
  ],
  authors: [{ name: "Ashish", url: "https://ashish.cv" }],
  creator: "Ashish",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ashish • Software Developer",
    description: "Creative portfolio of Ashish, showcasing work at the intersection of design and engineering.",
    url: "https://ashish.cv",
    siteName: "Ashish Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish • Software Developer",
    description: "Creative portfolio of Ashish, showcasing work at the intersection of design and engineering.",
    creator: "@ashish_makes",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
};

import SmoothScroll from "@/components/SmoothScroll";
import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolageGrotesque.variable} ${instrumentSerif.variable} font-bricolage antialiased`}
      >
        <Providers>
          <SmoothScroll>{children}</SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}

