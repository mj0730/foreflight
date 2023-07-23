import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>ForeFlight Exercise</title>
        <meta
          name="description"
          content="Coding exercise for ForeFlight interview"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fffavicon.webp" />
      </Head>
      <p>words</p>
    </>
  );
}
