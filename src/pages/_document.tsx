import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* Google tag (gtag.js) */}
        <Script
          strategy="beforeInteractive"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VWC6G4QEQB"
        ></Script>
        <Script strategy="beforeInteractive" id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VWC6G4QEQB');
          `}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
