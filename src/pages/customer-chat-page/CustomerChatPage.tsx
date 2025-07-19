import React, { useState } from "react";
import ChatBox from "../../components/chat-box/ChatBox";
import ChatBoxHeader from "../../components/chat-box/ChatBoxHeader";
import { Box, Button, Group, stylesToString } from "@mantine/core";
import OfferAcceptedComponent from "../../components/offer-accepted-component/OfferAcceptedComponent";
import { useAuth } from "../../contexts/AuthContext";

type Props = {};

const CustomerChatPage = (props: Props) => {
  const handleSendMessage = async (message: string) => {
    // Logic to handle sending the message
    console.log("Message sent:", message);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  };

  const [openOffer, setOpenOffer] = useState(false);
  const { user } = useAuth();

  const offerId = 2;

  const sender = {
    id: user?.id,
    name: user?.name,
    avatarUrl: user?.avatar_url || "",
  };

  console.log("Sender:", sender);

  const acceptOffer = () => {
    setOpenOffer(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {openOffer && <OfferAcceptedComponent />}
      <ChatBoxHeader
        name={sender.name || ""}
        avatarUrl={sender.avatarUrl || ""}
      />
      <Group p="sm">
        <Button
          onClick={() => {
            acceptOffer();
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
      <ChatBox onSend={handleSendMessage} offerId={offerId} />
    </div>
  );
};

export default CustomerChatPage;
