import { useEffect, useState } from "react";

export default function useFetchAirports(id) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState({ id: id });

  const url = `/api/airports?id=${id}`;

  useEffect(() => {
    if (!shouldRefresh.id || id === null) {
      setFetchError("An airport ID is required.");
      setIsLoading(false);
    }

    let isMounted = true;
    const controller = new AbortController();

    async function fetchData() {
      setIsLoading(true);

      try {
        const response = await fetch(url);

        if (response.status !== 200) {
          throw new Error("There was an error retrieving the data");
        }

        const data = await response.json();

        if (isMounted) {
          setData(data);
          setFetchError(null);
        }
      } catch (error) {
        if (isMounted) {
          setFetchError(error);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id, shouldRefresh, url]);

  function refresh(id) {
    setShouldRefresh({ id });
  }

  return { data, fetchError, isLoading, refresh };
}
