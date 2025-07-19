import {
  Box,
  Center,
  Loader,
  Select,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import BottomNavBar from "../../layouts/BottomNavBar";
import RestaurantOfferBox from "../../components/restaurant-offer-box/RestaurantOfferBox";
import type { Offer } from "../../types/Offer";

type Props = {};

const Skeletons = () => {
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
    <Box>
      {fakes.map((offer, index) => (
        <Skeleton key={index} animate>
          <RestaurantOfferBox key={index} offer={offer} />
        </Skeleton>
      ))}
    </Box>
  );
};

const CustomerViewOffersPage = (props: Props) => {
  useEffect(() => {}, []);

  const [offers, setOffers] = useState<Offer[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching offers
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (loading) {
      // its showing some stuff
      // Randomly add the fakes
      return;
    }

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

    // Randomly add the fakes in random times
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        setOffers((prevOffers) => [fakes[i], ...prevOffers]);
      }, Math.random() * 5000 + 500);
    }
  }, [loading]);

  return (
    <Stack>
      <Stack p="sm">
        <Text fw={500} size="1.5rem">
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
        {loading ? (
          <Skeletons />
        ) : offers.length === 0 ? (
          <Stack justify="center" align="center">
            <Text ta="center" display={"block"}>
              Please wait a second while restaurants make their offers!
            </Text>
            <Loader />
          </Stack>
        ) : (
          offers.map((offer, index) => (
            <RestaurantOfferBox key={index} offer={offer} />
          ))
        )}
      </Box>
      <BottomNavBar />
    </Stack>
  );
};

export default CustomerViewOffersPage;
