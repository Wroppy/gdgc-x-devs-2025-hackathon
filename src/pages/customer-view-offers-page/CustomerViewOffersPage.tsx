import { Box, Loader, Select, Skeleton, Stack, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import BottomNavBar from "../../layouts/BottomNavBar";
import RestaurantOfferBox from "../../components/restaurant-offer-box/RestaurantOfferBox";
import type { Offer } from "../../types/Offer";
import supabase from "../../supabase-client";
import { Link } from "react-router";

const Skeletons = () => {
  const fakes = [
    {
      restaurantName: "Chum Bucket",
      offerMessage: "Special discount and extra chum on your first order!",
      restaurantImage: "/chum-bucket.png",
    },
    {
      restaurantName: "Gusteau's",
      offerMessage:
        "At Gusteau's, anyone can cook - but only here can you taste the magic of Paris on a plate!",
      restaurantImage: "/gusteaus.png",
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
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      const { data, error } = await supabase.from("restaurant_offers").select(`
          id,
          offer_message,
          additional_notes,
          food_images,
          expires_at,
          created_at,
          restaurant:restaurant_id (
            name,
            restaurant_image_url,
            owner:owner_id (
              name,
              restaurant_owner_image_url
            )
          )
        `);

      if (error) {
        console.error("Error fetching offers:", error);
        return;
      }

      const parsed: Offer[] = (data || []).map((offer: any) => ({
        id: offer.id,
        restaurantName: offer.restaurant?.name ?? "Unknown",
        offerMessage: offer.offer_message,
        additionalInfo: offer.additional_notes ?? "",
        imageUrl: offer.food_images ?? [],
        createdAt: offer.created_at,
        restaurantImage:
          offer.restaurant?.restaurant_image_url ?? "/fallback.png",
      }));

      console.log("Fetched offers:", parsed);

      setOffers(parsed);
      setLoading(false);
    };

    fetchOffers();

    const channel = supabase
      .channel("realtime:restaurant_offers")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "restaurant_offers" },
        async (payload) => {
          const { data, error } = await supabase
            .from("restaurant_offers")
            .select(
              `
          id,
          offer_message,
          additional_notes,
          food_images,
          expires_at,
          created_at,
          restaurant:restaurant_id (
            name,
            restaurant_image_url,
            owner:owner_id (
              name,
              restaurant_owner_image_url
            )
          )
        `
            )
            .eq("id", payload.new.id)
            .single();

          if (error || !data) {
            console.error("Failed to refetch new offer:", error);
            return;
          }

          console.log(data.restaurant);

          const newParsed: Offer = {
            id: data.id,
            restaurantName: data.restaurant[0]?.name ?? "Unknown",
            offerMessage: data.offer_message,
            additionalInfo: data.additional_notes ?? "",
            imageUrl: data.food_images ?? [],
            createdAt: data.created_at,
            restaurantImage:
              data.restaurant[0]?.restaurant_image_url ?? "/fallback.png",
          };

          setOffers((prev) => [newParsed, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (loading) return;

    const fakes = [
      {
        restaurantName: "Chum Bucket",
        offerMessage: "Special discount and extra chum on your first order!",
        restaurantImage: "/chum-bucket.png",
      },
      {
        restaurantName: "Gusteau's",
        offerMessage:
          "At Gusteau's, anyone can cook - but only here can you taste the magic of Paris on a plate!",
        restaurantImage: "/gusteaus.png",
      },
    ];

    for (let i = 0; i < fakes.length; i++) {
      setTimeout(() => {
        setOffers((prev) => [fakes[i], ...prev]);
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
            <Text ta="center">
              Please wait a second while restaurants make their offers!
            </Text>
            <Loader />
          </Stack>
        ) : (
          offers.map((offer, index) => (
            <Box
              key={index}
              component={Link}
              to={`/customer/chat/${offer.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <RestaurantOfferBox offer={offer} />
            </Box>
          ))
        )}
      </Box>
      <BottomNavBar notifications={offers.length} />
    </Stack>
  );
};

export default CustomerViewOffersPage;
