import { Code, Text, Title, Stack } from "@mantine/core";

export default function Forecast({ data }) {
  const [current, forecast1, forecast2] = data.conditions;
  const period1 = {
    windSpeed: String(Math.trunc(forecast1?.wind.speedKts)).padStart(2, "0"),
    windDir: forecast1?.wind.variable ? "VRB" : forecast1?.wind.direction,
    time: timeDiff(forecast1?.period.dateStart),
  };
  const period2 = {
    windSpeed: String(Math.trunc(forecast2?.wind.speedKts)).padStart(2, "0"),
    windDir: forecast2?.wind.variable ? "VRB" : forecast2?.wind.direction,
    time: timeDiff(forecast2?.period.dateStart),
  };

  return (
    <section>
      <Title order={2} mb={10}>
        Forecast
      </Title>
      <Stack justify="flex-start" spacing="lg" h={300}>
        <div>
          {!!forecast1?.wind ? (
            <>
              Becoming in{" "}
              <Text span fw={700}>
                {period1.time}
              </Text>
              <div>
                <Code>Wind: {`${period1.windDir}${period1.windSpeed}`}</Code>
              </div>
            </>
          ) : (
            "Not Available"
          )}
        </div>
        <div>
          {!!forecast2?.wind ? (
            <>
              Becoming in{" "}
              <Text span fw={700}>
                {period2.time}
              </Text>
              <div>
                <Code>Wind: {`${period2.windDir}${period2.windSpeed}`}</Code>
              </div>
            </>
          ) : (
            "Not Available"
          )}
        </div>
      </Stack>
    </section>
  );
}

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
