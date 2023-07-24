import { useEffect } from "react";

import { Alert, Divider } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

import Airport from "../components/Airport";
import Forecast from "../components/Forecast";

import useFetchAirports from "../../hooks/useFetchAirportData";
import useFetchWx from "../../hooks/useFetchWx";

export default function Main({ id, setAirportData }) {
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
    if (!airportDataIsLoading) {
      setAirportData({ id: airportData.faaCode, name: airportData.name });
    }
    return () => setAirportData({});
  }, [airportDataIsLoading, airportData, setAirportData]);

  const { conditions, forecast } = wxData;

  if (airportFetchError) {
    return (
      <Alert
        icon={<IconAlertCircle size="1rem" />}
        title="Failed to load data"
        color="red"
      >
        Either that airport identifier doesn&apos;t exist, or there was an error
        loading the data. Please try again.
      </Alert>
    );
  }

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
