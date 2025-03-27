import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import NextTopLoader from "nextjs-toploader";
import Footer from "@/components/footer/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import AnalyticsScript from "@/components/AnalyticsScript";

const inter = Inter({ subsets: ["latin"] });

// declare var dataLayer: any[];

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_API_URL}`),
  title: {
    default: "Savory Touch",
    template: "%s | Savory Touch",
  },
  description:
    "Discover SavoryTouch, your go-to platform for the latest trends in food and drink. Explore a world of culinary delights and beverage innovations from around the globe.",
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: `/`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5RNXYBZTK0"
        ></Script>
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-5RNXYBZTK0');`}
        </Script> */}

        {/* <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5RNXYBZTK0"
        ></script>
        <script>
          dangerouslySetInnerHTML=
          {{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-5RNXYBZTK0');
        `,
          }}
        </script> */}
      </head>
      <body className={inter.className}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5457433644037438"
          crossOrigin="anonymous"
        ></Script>
        <NextTopLoader showSpinner={false} color="#0050f0" crawlSpeed={50} />
        {/* <Navbar /> */}
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-5RNXYBZTK0" />
    </html>
  );
}
