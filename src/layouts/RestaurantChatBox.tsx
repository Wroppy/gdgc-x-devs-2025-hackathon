import React, { useEffect } from "react";
import { Link, Outlet, useParams } from "react-router";
import supabase from "../supabase-client";
import { useDisclosure } from "@mantine/hooks";
import {
  Box,
  Button,
  ButtonGroupSection,
  Group,
  Modal,
  Stack,
} from "@mantine/core";

type Props = {};

const RestaurantChatBox = (props: Props) => {
  // Get the offerId from the slugs (the last part of the URL) /page/:offerId
  const { offerId } = useParams<{ offerId: string }>();
  const [opened, { open }] = useDisclosure(false);

  useEffect(() => {
    // Subscribe to the offer updates
    const subscription = supabase
      .channel("restaurant_offers")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "restaurant_offers" },
        (payload) => {
          console.log("Change received!", payload);

          // Handle the update here, e.g., refresh the chat messages or UI
          if (
            payload.new.id === parseInt(offerId || "0") &&
            payload.new.status === "accepted"
          ) {
            console.log("Offer updated:", payload.new);
            // You can add logic to refresh the chat messages or UI here
            open(); // Open the modal when the offer is accepted
          }
        }
      );
    subscription.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        console.log("Subscribed to restaurant_offers updates");
      }
    });
    return () => {
      // Unsubscribe when the component unmounts
      supabase.removeChannel(subscription);
      console.log("Unsubscribed from restaurant_offers updates");
    };
  }, [offerId, open]);
  return (
    <>
      <Modal opened={opened} onClose={() => {}} title="Offer Accepted">
        <Stack>
          <Box>The customer has accepted your offer!</Box>
          <Box>The booking has been confirmed.</Box>
          <Group justify="flex-end">
            <Button component={Link} to="/restaurant">
              Go back to home page
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Outlet />
    </>
  );
};

export default RestaurantChatBox;
