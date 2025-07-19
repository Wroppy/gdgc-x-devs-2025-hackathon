import {
  Box,
  Button,
  Group,
  Image,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import styles from "./restaurant-home-page.module.css";
import { useElementSize } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import BottomNavBar from "../../layouts/BottomNavBar";
import { Link } from "react-router";

export default function DishcoverScreen() {
  const { ref, width, height } = useElementSize();

  return (
    <div
      style={{
        overflow: "hidden",
      }}
      className={styles.dishcoverScreen}
    >
      <Box p="lg">
        <Group>
          <Image src="/logo.png" alt="Logo" h={50} w={"auto"} />

          <Text fw={700} size="xl" c="orange.9">
            DISHCOVER
          </Text>
        </Group>
      </Box>
      <Stack ref={ref} className={styles.graphic}>
        <svg
          viewBox={`${width} ${height}`}
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svgGraphic}
        >
          <path
            d={`M0 0 L${width} 0 L ${width} ${height * 0.1} 
              C${width} ${height / 2} ${width * 0.5} ${height * 0.2} 0 ${
              height * 0.6
            } 
              Z`}
            fill="#ff7c00"
          />
          <path
            d={`M-10 ${height * 0.7}
                C0 ${height * 0.8} ${width} ${height * 0.7} ${width} ${height}
                L${width} ${height} L0 ${height}
              Z`}
            fill="#00c39a"
          />
        </svg>
        <Box className={styles.graphicText}>
          <Box className={styles.requestBox} h={height * 0.5}>
            <Text size="lg" fw={600}>
              Looking for more customers? 
            </Text>
            <Button
              component={Link}
              to="/restaurant/find"
              className={styles.newButton}
              radius="md"
              variant="filled"
              maw={200}
              color="white"
            >
              Find Requests
            </Button>
          </Box>
          <Box className={styles.nearbyBox} h={height * 0.5}>
            <Text size="md" fw={500}>
              Or check latest reviews?
            </Text>
            <Button radius="md" color="orange" mt="xs">
              Reviews
            </Button>
          </Box>
        </Box>
      </Stack>
      <Box style={{width: "100%", height: "60px" }}>
        <BottomNavBar />
      </Box>
    </div>
  );
}
