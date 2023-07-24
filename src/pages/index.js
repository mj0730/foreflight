import Head from "next/head";
import { useState } from "react";
import { Title, Container, Divider } from "@mantine/core";

import NavHeader from "../components/NavHeader";
import Airport from "../components/Airport";
import Forecast from "../components/Forecast";

import useFetchAirports from "../../hooks/useFetchAirportData";
import useFetchWx from "../../hooks/useFetchWx";

export default function Home() {
  const [searchId, setSearchId] = useState("");

  const {
    data: airportData,
    fetchError: airportFetchError,
    isLoading: airportDataIsLoading,
  } = useFetchAirports("kaus");
  const {
    data: wxData,
    fetchError: wxFetchError,
    isLoading: wxIsLoading,
  } = useFetchWx("KAUS");

  const { conditions, forecast } = wxData ?? {};

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

      <NavHeader
        links={[
          { label: "Airport Data", link: "/" },
          { label: "Weather", link: "wx" },
        ]}
        searchId={searchId}
        setSearchId={setSearchId}
      />
      <Container>
        <Title>{searchId.toUpperCase()}</Title>
        {airportDataIsLoading || wxIsLoading ? (
          "loading..."
        ) : (
          <>
            <Airport data={airportData} wx={{ conditions }} />
            <Divider />
            <Forecast data={forecast} />
          </>
        )}
      </Container>
    </>
  );
}
