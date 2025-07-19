import { Box, Loader, Select, Skeleton, Stack, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import BottomNavBar from "../../layouts/BottomNavBar";
import RestaurantOfferBox from "../../components/restaurant-offer-box/RestaurantOfferBox";
import type { Offer } from "../../types/Offer";
import supabase from "../../supabase-client";

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

const CustomerViewOffersPage = () => {
  useEffect(() => {}, []);

  const [offers, setOffers] = useState<Offer[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("restaurant_offers")
      .select("*")
      .then((response) => {
        if (response.error) {
          console.error("Error fetching offers:", response.error);
        } else {
          const parsed = response.data.map((offer) => ({
            name: "Krusty Krab",
            offerMessage: offer.offer_message,
            avatarUrl: "/krusty-crab.png",
          }));
          setOffers((prev) => [...parsed, ...prev]);
          setLoading(false);
        }
      });

    const channel = supabase
      .channel("realtime:restaurant_offers")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "restaurant_offers" },
        (payload) => {
          const newOffer = {
            name: "Krusty Krab",
            offerMessage: payload.new.offer_message,
            avatarUrl: "/krusty-crab.png",
          };
          setOffers((prevOffers) => [newOffer, ...prevOffers]);
        }
      )
      .subscribe((status, error) => {
        if (error) {
          console.error("Error subscribing to restaurant offers:", error);
        } else {
          console.log("Subscribed to restaurant offers channel");
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
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
