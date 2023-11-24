import HydrationZustand from "@/components/HydrationZustand";
import "@/styles/globals.css";
import Head from "next/head";
import Layout from "@/components/Layout";
import { Analytics } from "@vercel/analytics/react";
import ContentLayout from "@/components/ContentLayout";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Femto : Optimise Cloud</title>
        <meta
          name="description"
          content="Femto by CypherX is a cloud optimisation tool that helps you reduce size of your files."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="ssi0m2_gOqFBrNBvXa3s8tDvejv_lXrNhbDibKe8LXY"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/images/favicon_io/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/images/favicon_io/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/images/favicon_io/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <HydrationZustand>
        <Layout>
          <ContentLayout>
            <Component {...pageProps} />
            <Analytics />
          </ContentLayout>
        </Layout>
      </HydrationZustand>
    </>
  );
}
