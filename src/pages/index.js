import Head from "next/head";

import useFetchAirports from "../../hooks/useFetchAirportData";
import useFetchWx from "../../hooks/useFetchWx";

export default function Home() {
  // const {
  //   data: airportData,
  //   fetchError: airportFetchError,
  //   isLoading: airportDataIsLoading,
  // } = useFetchAirports("kaus");
  // const {
  //   data: wxData,
  //   fetchError: wxFetchError,
  //   isLoading: wxIsLoading,
  // } = useFetchWx("KAUS");
  // console.log(airportData, wxData);

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
