import React, { useState } from "react";
import ChatBox from "../../components/chat-box/ChatBox";
import ChatBoxHeader from "../../components/chat-box/ChatBoxHeader";
import { Box, Button, Group, stylesToString } from "@mantine/core";

type Props = {};

const CustomerChatPage = (props: Props) => {
  const handleSendMessage = async (message: string) => {
    // Logic to handle sending the message
    console.log("Message sent:", message);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  };

  const [openOffer, setOpenOffer] = useState(false);

  const sender = {
    name: "Restuarant name placeholder",
    url: "https://example.com/restaurant-logo.png",
  };

  const acceptOffer = () => {
    setOpenOffer(true);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {
        openOffer && (
          
        )
      }
      <ChatBoxHeader name={sender.name} avatarUrl={sender.url} />
      <Group p="sm">
        <Button color="accent" flex={1}>Accept Offer</Button>
        <Button variant="outline" flex={1}>Decline Offer</Button>
      </Group>
      <ChatBox onSend={handleSendMessage} />
    </div>
  );
};

export default CustomerChatPage;
