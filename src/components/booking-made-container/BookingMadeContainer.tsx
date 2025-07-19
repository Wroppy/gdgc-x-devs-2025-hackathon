import { Center, Image, Text } from "@mantine/core";
import React from "react";

type Props = {};

const BookingMadeContainer = (props: Props) => {
  return (
    <Center>
      <Image src="/logo.png" alt="Logo" h={100} w={"auto"} />
      <Text c="orange" size="3rem" fw={500} ta="center">
        Booking Made!
      </Text>
    </Center>
  );
};

export default BookingMadeContainer;
