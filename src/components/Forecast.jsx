import { Title, Stack } from "@mantine/core";

function timeDiff(time) {
  const currentTime = new Date();
  const startTime = new Date(time);
  const totalMinutes = Math.round(
    (startTime.getTime() - currentTime.getTime()) / 60000,
  );
  const hrs = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const descH = hrs > 1 ? "hours" : "hour";
  const descM = mins > 1 ? "minutes" : "minute";

  return `${hrs > 0 ? hrs : null} ${hrs > 0 ? descH : null} ${
    mins > 0 ? `${mins} ${descM}` : null
  }`;
}

export default function Forecast({ data }) {
  const [current, forecast1, forecast2] = data.conditions;
  const period1 = {
    windSpeed: String(forecast1.wind.speedKts).padStart(2, "0"),
    windDir: forecast1.wind.variable ? "VRB" : forecast1.wind.direction,
    time: timeDiff(forecast1.period.dateStart),
  };
  const period2 = {
    windSpeed: String(forecast2.wind.speedKts).padStart(2, "0"),
    windDir: forecast2.wind.variable ? "VRB" : forecast2.wind.direction,
    time: timeDiff(forecast2.period.dateStart),
  };

  return (
    <section>
      <Title>Forecast</Title>
      <Stack justify="flex-start" spacing="lg" h={300}>
        <div>
          Becoming in {period1.time}
          <div>Wind: {`${period1.windDir}${period1.windSpeed}`}</div>
        </div>
        <div>
          Becoming in {period2.time}
          <div>Wind: {`${period2.windDir}${period2.windSpeed}`}</div>
        </div>
      </Stack>
    </section>
  );
}
