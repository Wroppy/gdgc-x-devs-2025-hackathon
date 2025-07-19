import React from "react";
import ChatBox from "../../components/chat-box/ChatBox";
import ChatBoxHeader from "../../components/chat-box/ChatBoxHeader";

type Props = {};

const CustomerChatPage = (props: Props) => {
  const handleSendMessage = async (message: string) => {
    // Logic to handle sending the message
    console.log("Message sent:", message);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  };

  const sender = {
    name: "Restuarant name placeholder",
    url: "https://example.com/restaurant-logo.png",
  }


  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      
    }}>
      <ChatBoxHeader  name={sender.name} avatarUrl={sender.url} />
      <ChatBox onSend={handleSendMessage} />
    </div>
  );
};

export default CustomerChatPage;
