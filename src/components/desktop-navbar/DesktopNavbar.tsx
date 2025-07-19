import { Avatar, Box, Group, Image, Text } from "@mantine/core";
import React from "react";
import styles from "./desktop-navbar.module.css";
import { Link, useLocation } from "react-router";
import classnames from "classnames";

type Props = {};

const DesktopNavbar = (props: Props) => {
  const location = useLocation();
  return (
    <Box p="sm" className={styles.navbar}>
      <Group>
        <Image src="/logo.png" alt="Logo" h={50} w={"auto"} />
        <Text fw={700} size="xl" c="orange.9">
          DISHCOVER
        </Text>
      </Group>
      <Group>
        <Text
          component={Link}
          to="/restaurant"
          size="md"
          className={classnames(styles.navLink, {
            [styles.activeLink]: location.pathname === "/restaurant",
          })}
        >
          Home
        </Text>
        <Text
          className={classnames(styles.navLink, {
            [styles.activeLink]: location.pathname === "/restaurant/find",
          })}
          component={Link}
          to="/restaurant/find"
          size="md"
        >
          Search
        </Text>
        <Text
          component={Link}
          to="/restaurant/about"
          size="md"
          className={classnames(styles.navLink, {
            [styles.activeLink]: location.pathname === "/restaurant/about",
          })}
        >
          About Us
        </Text>
        <Text
          component={Link}
          to="/restaurant"
          size="md"
          className={classnames(styles.navLink, {
            [styles.activeLink]: location.pathname === "/restaurant/reviews",
          })}
        >
          Reviews
        </Text>
        <Avatar src="/krusty-crab.png" />
      </Group>
    </Box>
  );
};

export default DesktopNavbar;
