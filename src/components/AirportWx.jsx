import {
  createStyles,
  Group,
  Paper,
  SimpleGrid,
  Text,
  rem,
} from "@mantine/core";

export default function AirportWx({ conditions }) {
  const { classes } = useStyles();
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

  const currentWx = [
    {
      title: "Temperature",
      value: convertToFahrenheit(tempC),
      unit: "\u00B0F",
    },
    {
      title: "Relative Humidity",
      value: relativeHumidity,
      unit: "%",
    },
    {
      title: "Visibility",
      value: vis,
      unit: "SM",
    },
    {
      title: "Wind",
      value: `${
        wind.variable ? "VRB" : convertToCompassDir(wind.direction)
      } ${Math.trunc(wind.speedKts)}`,
      unit: "KTS",
    },
  ];

  const wxList = currentWx.map((item) => {
    return (
      <Paper withBorder p="md" radius="md" key={item.title}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {item.title}
          </Text>
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{item.value}</Text>
          <Text fz="sm" fw={500} className={classes.diff}>
            <span>{item.unit}</span>
          </Text>
        </Group>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "xs", cols: 1 },
        ]}
      >
        {wxList}
      </SimpleGrid>
    </div>
  );
}

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

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
  },

  value: {
    fontSize: rem(24),
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
  },

  title: {
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));
