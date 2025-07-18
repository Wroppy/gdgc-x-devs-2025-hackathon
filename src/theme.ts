import { createTheme, type MantineColorsTuple } from "@mantine/core";

const theme = createTheme({
  primaryColor: "orange",
  colors: {
    orange: Array.from(
      { length: 10 },
      (_, i) => `#E58135`
    ) as unknown as MantineColorsTuple,
    accent: [
      "#00C58E",
      "#00C58E",
      "#00C58E",
      "#00C58E",
      "#00C58E",
      "#00C58E",
      "#00C58E",
      "#00C58E",
      "#00C58E",
      "#00C58E",
    ],
  },
});

export default theme;
