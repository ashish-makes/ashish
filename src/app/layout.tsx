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
  title: {
    default: "Ashish • Creative technologist & designer",
    template: "%s | Ashish"
  },
  description: "Creative portfolio of Ashish, a UI/UX designer and technologist focused on building digital experiences that bridge precision and emotion.",
  openGraph: {
    title: "Ashish • Creative technologist & designer",
    description: "Creative portfolio of Ashish, showcasing work at the intersection of design and engineering.",
    url: "https://ashish.cv",
    siteName: "Ashish Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish",
    description: "Software Developer.",
    creator: "@ashish_makes",
  },
  robots: {
    index: true,
    follow: true,
  },
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

