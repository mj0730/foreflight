import {
  Badge,
  createStyles,
  Group,
  Paper,
  SimpleGrid,
  Text,
  rem,
} from "@mantine/core";

export default function AirportInfo({ data, conditions: { wind } }) {
  const { classes } = useStyles();
  const { runways, latitude, longitude } = data;

  const rwyInfo = [
    {
      title: "Latitude/Longitude",
      value: `${latitude?.toFixed(6)} / ${longitude?.toFixed(6)}`,
      unit: "",
    },
    {
      title: "Available Runways",
      value: runways?.map(({ ident }) => {
        return (
          <Badge key={ident} variant="light">
            {ident}
          </Badge>
        );
      }),
      unit: "",
    },
    {
      title: "Recommended Runway",
      value: wind.variable ? "N/A" : recRwy(wind.direction, runways),
      unit: "",
    },
  ];

  const rwyList = rwyInfo.map((item) => {
    return (
      <Paper withBorder p="md" radius="md" key={"temp"}>
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
        {rwyList}
      </SimpleGrid>
    </div>
  );
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

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));
