import React from "react";
import ChatBox from "../../components/chat-box/ChatBox";

type Props = {};

const CustomerChatPage = (props: Props) => {
  const handleSendMessage = async (message: string) => {
    // Logic to handle sending the message
    console.log("Message sent:", message);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  };
  return (
    <div>
      <ChatBox onSend={handleSendMessage} />
    </div>
  );
};

export default CustomerChatPage;
