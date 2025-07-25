import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ChatBox from "../../components/chat-box/ChatBox";
import ChatBoxHeader from "../../components/chat-box/ChatBoxHeader";
import { Box, Button, Center, Group, Loader, Text } from "@mantine/core";
import OfferAcceptedComponent from "../../components/offer-accepted-component/OfferAcceptedComponent";
import { useAuth } from "../../contexts/AuthContext";
import supabase from "../../supabase-client";

const CustomerChatPage = () => {
  const { offerId } = useParams<{ offerId: string }>();
  const { user, role } = useAuth(); // ⬅️ includes role
  const [receiverInfo, setReceiverInfo] = useState<{
    name: string;
    avatarUrl: string;
  } | null>(null);
  const [restaurant, setRestaurant] = useState<{
    name: string;
    avatarUrl: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [openOffer, setOpenOffer] = useState(false);

  const handleSendMessage = async (message: string) => {
    console.log("Message sent:", message);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const fetchReceiverInfo = async () => {
    if (!offerId) return;

    const { data, error } = await supabase
      .from("restaurant_offers")
      .select(
        `
          id,
          restaurant:restaurant_id (
            owner:owner_id (
              name,
              restaurant_owner_image_url
            )
          )
        `
      )
      .eq("id", offerId)
      .single();

    if (error || !data) {
      console.error("Failed to fetch restaurant owner info:", error);
      return;
    }

    // @ts-expect-error yeah lol dont how this works
    const o = data.restaurant?.owner;
    setRestaurant({
      name: o?.name ?? "Unknown Restaurant",
      avatarUrl: o?.restaurant_owner_image_url ?? "/fallback.png",
    });

    if (role === "customer") {
      // @ts-expect-error yeah lol dont how this works
      const owner = data.restaurant?.owner;
      setReceiverInfo({
        name: owner?.name ?? "Unknown",
        avatarUrl: owner?.restaurant_owner_image_url ?? "/fallback.png",
      });
      console.log("Receiver info for customer:", receiverInfo);
    } else if (role === "restaurant_owner") {
      setReceiverInfo({
        name: "Patrick Star",
        avatarUrl:
          "https://xivesioqwjixsrrkgkcv.supabase.co/storage/v1/object/public/restaurant-owner-image-url/customers/patrick_star.jpeg",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReceiverInfo();
  }, [offerId, role]);

  if (!offerId) return <Text>Error: No offer ID provided</Text>;
  if (loading || !receiverInfo || !restaurant)
    return (
      <Center h="100%">
        <Loader />
      </Center>
    );

  const sender = {
    id: user?.id,
    name: user?.name,
    avatarUrl: user?.avatar_url || "",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {openOffer && <OfferAcceptedComponent />}
      <ChatBoxHeader
        role={role || "customer"}
        name={receiverInfo.name}
        avatarUrl={receiverInfo.avatarUrl}
      />
      {role === "customer" && (
        <Group p="sm">
          <Button
            onClick={async () => {
              setOpenOffer(true);
              await supabase
                .from("restaurant_offers")
                .update({
                  status: "accepted",
                })
                .eq("id", offerId);
            }}
            color="accent"
            flex={1}
          >
            Accept Offer
          </Button>
          <Button variant="outline" flex={1}>
            Decline Offer
          </Button>
        </Group>
      )}
      <ChatBox
        restaurant={restaurant}
        onSend={handleSendMessage}
        offerId={parseInt(offerId)}
      />
    </div>
  );
};

export default CustomerChatPage;
