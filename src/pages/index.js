import { useState } from "react";
import Head from "next/head";

import { Title, Container } from "@mantine/core";

import Main from "../components/Main";
import NavHeader from "../components/NavHeader";

export default function Home() {
  const [searchId, setSearchId] = useState({ value: "" });
  const [airportName, setAirportName] = useState("");

  return (
    <>
      <Head>
        <title>ForeFlight Exercise</title>
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
          { label: "Weather", link: "wx" },
        ]}
        setSearchId={setSearchId}
      />
      <Container>
        <Title>
          {airportName
            ? `${searchId.value?.toUpperCase()} - ${airportName}`
            : null}
        </Title>
        {searchId.value ? (
          <Main id={searchId.value} setAirportName={setAirportName} />
        ) : (
          "Search for an airport to get started."
        )}
      </Container>
    </>
  );
}
