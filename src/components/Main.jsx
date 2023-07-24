import { useEffect } from "react";

import { Divider } from "@mantine/core";

import Airport from "../components/Airport";
import Forecast from "../components/Forecast";

import useFetchAirports from "../../hooks/useFetchAirportData";
import useFetchWx from "../../hooks/useFetchWx";

export default function Main({ id, setAirportName }) {
  const {
    data: airportData,
    fetchError: airportFetchError,
    isLoading: airportDataIsLoading,
  } = useFetchAirports(id);
  const {
    data: wxData,
    fetchError: wxFetchError,
    isLoading: wxIsLoading,
  } = useFetchWx(id);

  useEffect(() => {
    if (!airportDataIsLoading) setAirportName(airportData.name);
  }, [airportDataIsLoading, airportData, setAirportName]);

  const { conditions, forecast } = wxData;

  return (
    <>
      {airportDataIsLoading || wxIsLoading ? (
        "loading..."
      ) : (
        <>
          <Airport data={airportData} wx={{ conditions }} />
          <Divider size="md" mb={20} />
          <Forecast data={forecast} />
        </>
      )}
    </>
  );
}
