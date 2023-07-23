export default async function handler(req, res) {
  const id = "kaus"; //TODO: hardcoded for dev
  const url = `https://qa.foreflight.com/weather/report/${id}`;
  const controller = new AbortController();
  const signal = controller.signal;
  const fetchConfig = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ff-coding-exercise": 1,
    },
  };

  try {
    const response = await fetch(url, fetchConfig);

    if (!response.ok) {
      throw new Error(
        `There was an error fetching from ${url}. Response: ${response}`,
      );
    }

    const data = await response.json();
    console.log(data);
    res.status(200).json({ data });
  } catch (error) {
    console.error(`There was an error fetching from the API. ERROR: ${error}`);
    res.status(500);
  }
}
