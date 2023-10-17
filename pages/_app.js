import HydrationZustand from "@/components/HydrationZustand";
import dynamic from "next/dynamic";
import "@/styles/globals.css";
import Head from "next/head";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Femto : Optimise Cloud</title>
        <meta
          name="description"
          content="CypherX, lossless compression redefined"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/assets/images/favicon.svg"
        />
        <link rel="icon" type="image/png" href="/assets/images/favicon.png" />
      </Head>
      <HydrationZustand>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </HydrationZustand>
    </>
  );
}
