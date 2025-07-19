import { Box, Center, Image, Stack, Text, Transition } from "@mantine/core";
import React, { useEffect } from "react";
import { Link } from "react-router";

type Props = {};

const OfferAcceptedComponent = (props: Props) => {
  return (
    <Center
      style={{
        position: "absolute",
        width: "100dvw",
        height: "100dvh",
        backgroundColor: "white",
        zIndex: 1000,
      }}
    >
      <Stack align="center">
        <Image src="/logo.png" alt="Logo" h={150} w={"auto"} />
        <Text c="orange" size="1.5rem" fw={500}>
          Booking Confirmed!
        </Text>
        <Text ta="center" size="2rem">
          The Krabby Patty
        </Text>
        <Text>Time: 12:00 PM - 1:00 PM, 20th October 2023</Text>
        <Text>Location: 123 Bikini Bottom Street, Bikini Bottom</Text>
        <Text>
          Go <Text component={Link} td="underline" to="/customer" c="accent">back</Text>
        </Text>
      </Stack>
    </Center>
  );
};

export default OfferAcceptedComponent;
