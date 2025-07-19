import { Box, Select, Stack, Text } from "@mantine/core";
import React, { useEffect } from "react";
import BottomNavBar from "../../layouts/BottomNavBar";
import RestaurantOfferBox from "../../components/restaurant-offer-box/RestaurantOfferBox";

type Props = {};

const CustomerViewOffersPage = (props: Props) => {
  useEffect(() => {}, []);
  const fakes = [
    {
      name: "Chum Bucket",
      offerMessage: "Special discount and extra chum on your first order!",
      avatarUrl: "/chum-bucket.png",
    },
    {
      name: "Gusteau's",
      offerMessage:
        "At Gusteau's, anyone can cook - but only here can you taste the magic of Paris on a plate!",
      avatarUrl: "/gusteaus.png",
    },
  ];
  return (
    <Stack>
      <Stack p="sm">
        <Text fw={500} size="xl">
          Offers from restaurants
        </Text>
        <Select
          clearable
          label="Sort by"
          placeholder="Select sorting option"
          data={[
            { value: "date", label: "Date" },
            { value: "restaurant", label: "Restaurant Name" },
            { value: "price", label: "Price" },
          ]}
        />
      </Stack>
      <Box>
        {fakes.map((offer, index) => (
          <RestaurantOfferBox key={index} offer={offer} />
        ))}
      </Box>
      <BottomNavBar />
    </Stack>
  );
};

export default CustomerViewOffersPage;
