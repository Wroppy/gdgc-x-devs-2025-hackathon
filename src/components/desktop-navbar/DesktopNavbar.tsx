import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Drawer,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import React from "react";
import styles from "./desktop-navbar.module.css";
import { Link, useLocation } from "react-router";
import { IconLogout2, IconMenu2 } from "@tabler/icons-react";
import { useDisclosure, useElementSize } from "@mantine/hooks";

type Props = { heading: string };

const DesktopNavbar = ({ heading }: Props) => {
  const location = useLocation();
  const [opened, { open, close }] = useDisclosure(false);
  const { ref, height } = useElementSize();

  return (
    <>
      <Drawer.Root opened={opened} onClose={close}>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header ref={ref}>
            <Drawer.Title>
              <Group gap="sm">
                <Image src="/logo.png" w="auto" h={50} />
                <Text c="orange" fw={500} size="2rem">
                  DISHCOVER
                </Text>
              </Group>
            </Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body
            style={{ height: `calc(100% - ${height}px)`, padding: 0 }}
          >
            <Stack
              h="100%"
              className={styles.drawerContent}
              justify="space-between"
            >
              <Box>
                <Button
                  component={Link}
                  to="/restaurant"
                  fullWidth
                  justify="left"
                  variant={
                    location.pathname === "/restaurant"
                      ? "light"
                      : "transparent"
                  }
                  color={
                    location.pathname === "/restaurant" ? "orange" : "gray"
                  }
                >
                  Home
                </Button>

                <Button
                  component={Link}
                  to="/restaurant/find"
                  fullWidth
                  justify="left"
                  variant={
                    location.pathname === "/restaurant/find"
                      ? "light"
                      : "transparent"
                  }
                  color={
                    location.pathname === "/restaurant/find" ? "orange" : "gray"
                  }
                >
                  Search
                </Button>

                <Button
                  component={Link}
                  to="/restaurant/about"
                  fullWidth
                  justify="left"
                  variant={
                    location.pathname === "/restaurant/about"
                      ? "light"
                      : "transparent"
                  }
                  color={
                    location.pathname === "/restaurant/about"
                      ? "orange"
                      : "gray"
                  }
                >
                  About Us
                </Button>

                <Button
                  component={Link}
                  to="/restaurant/reviews"
                  fullWidth
                  justify="left"
                  variant={
                    location.pathname === "/restaurant/reviews"
                      ? "light"
                      : "transparent"
                  }
                  color={
                    location.pathname === "/restaurant/reviews"
                      ? "orange"
                      : "gray"
                  }
                >
                  Reviews
                </Button>
              </Box>
              <Group p="md" justify="space-between">
                <Group>
                  <Avatar src="/krusty-crab.png" size="lg" radius="xl" />
                  <Box>
                    <Text fw={500} size="md">
                      Krusty Krab
                    </Text>
                  </Box>
                </Group>
                <ActionIcon component={Link} to="/login" variant="transparent">
                  <IconLogout2 size={24} color="black" />
                </ActionIcon>
              </Group>
            </Stack>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
      <Box p="sm" className={styles.navbar}>
        <Group>
          <ActionIcon variant="transparent" onClick={open}>
            <IconMenu2 size={24} color="black" />
          </ActionIcon>
          <Text>{heading}</Text>
        </Group>
        <Box>
          <Text fw={700} size="xl" c="orange.9">
            DISHCOVER
          </Text>
        </Box>
      </Box>{" "}
    </>
  );
};

export default DesktopNavbar;
