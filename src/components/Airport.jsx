import { Grid, SimpleGrid, useMantineTheme, rem } from "@mantine/core";

function convertToFahrenheit(celcius) {
  const temp = (celcius * 9) / 5 + 32;
  return temp.toFixed(1);
}

function convertToCompassDir(heading) {
  const points = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const ref = Math.floor(heading / 45);
  const index = ref % 8;

  return points[index];
}

function recRwy(windDir, runwayData) {
  const runways = [];
  let min = 360;
  let rec = "";

  runwayData.forEach((runway) => {
    const rwy = { name: runway.name, hdg: runway.magneticHeading };
    const recipRwy = {
      name: runway.recipName,
      hdg: runway.recipMagneticHeading,
    };
    runways.push(rwy, recipRwy);
  });

  runways.forEach((runway) => {
    const abs = Math.abs(runway.hdg - windDir);

    if (abs < min) {
      min = abs;
      rec = runway.name;
    }
  });

  return rec;
}

export default function Airport({ data, wx: { conditions } }) {
  const theme = useMantineTheme();
  // const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;
  const { runways, latitude, longitude } = data;
  const {
    tempC,
    relativeHumidity,
    wind,
    visibility: { distanceSm: vis },
    cloudLayers,
  } = conditions;

  const layers = cloudLayers.map((layer) => {
    const alt = String(layer.altitudeFt / 100).padStart(3, 0);
    return `${layer.coverage?.toUpperCase()}${alt}`;
  });

  return (
    <SimpleGrid
      cols={2}
      spacing="md"
      breakpoints={[{ maxWidth: "lg", cols: 1 }]}
    >
      <div>
        <h2>Current Weather</h2>
        <div>Temp: {convertToFahrenheit(tempC)} &deg;F</div>
        <div>RH: {relativeHumidity}%</div>
        <div>Visibility: {vis} SM</div>
        <div>
          Wind: {wind.variable ? "VRB" : convertToCompassDir(wind.direction)}{" "}
          {wind.speedKts}kts
        </div>
        <div>
          Cloud Coverage:{" "}
          {layers.length > 0
            ? layers.map((layer) => {
                return <span key={layer}>{layer} </span>;
              })
            : "N/A"}
        </div>
      </div>
      <Grid gutter="md">
        <Grid.Col>
          <h2>Lat/Long</h2>
          <div>Latitude: {latitude?.toFixed(6)}</div>
          <div>Longitude: {longitude?.toFixed(6)}</div>
        </Grid.Col>

        <Grid.Col span={6}>
          <h2>Available Runways</h2>
          {runways?.map(({ ident }) => {
            return <div key={ident}>{ident}</div>;
          })}
        </Grid.Col>

        <Grid.Col span={6}>
          <h2>Recommended</h2>
          <div>{wind.variable ? "N/A" : recRwy(wind.direction, runways)}</div>
        </Grid.Col>
      </Grid>
    </SimpleGrid>
  );
}
