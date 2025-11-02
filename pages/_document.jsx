// pages/_document.jsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Basic SEO */}
        <meta name="description" content="Product Listing Page with filters and responsive design" />
        <meta name="keywords" content="Ecommerce, Product Listing, React, Next.js, Appscrip" />

        {/* Schema.org markup for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Product Listing Page",
              "description": "A sample e-commerce product listing page for Appscrip assignment.",
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
