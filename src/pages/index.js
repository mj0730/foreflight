import { useState } from "react";
import Head from "next/head";

import { Title, Container } from "@mantine/core";

import Main from "../components/Main";
import NavHeader from "../components/NavHeader";

export default function Home() {
  const [searchId, setSearchId] = useState("");
  const [airportData, setAirportData] = useState({});
  console.log(searchId);

  return (
    <>
      <Head>
        <title>ForeFlight Coding Exercise</title>
        <meta
          name="foreflight coding exercise"
          content="Coding exercise for ForeFlight interview"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fffavicon.webp" />
      </Head>

      <NavHeader
        links={[
          { label: "Airport Data", link: "/" },
          { label: "METAR", link: "metar" },
        ]}
        searchId={searchId}
        setSearchId={setSearchId}
      />
      <Container>
        <Title>
          {airportData?.id
            ? `${airportData.id?.toUpperCase()} - ${airportData.name}`
            : null}
        </Title>
        {searchId.length >= 3 ? (
          <Main id={searchId} setAirportData={setAirportData} />
        ) : (
          <>
            <p>Search for an airport to get started.</p>
          </>
        )}
      </Container>
    </>
  );
}
