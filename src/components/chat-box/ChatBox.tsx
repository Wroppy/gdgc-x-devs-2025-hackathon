//NOTE: The file contains hardcoded values for demonstration purposes.
// Once you are able to get user data from the auth context, you can replace these hardcoded values with dynamic ones.
// HARDCODED VALUES:

import { ActionIcon, Box, Stack, TextInput } from "@mantine/core";
import React, { useEffect, useState, type FormEvent } from "react";
import styles from "./chat-box.module.css";
import { IconSend } from "@tabler/icons-react";
import { ReceiverMessage, SenderMessage } from "./ChatMessages";
import supabase from "../../supabase-client";

type Props = {
  onSend: (message: string) => Promise<void>;
  offerId: number;
};

type Message = {
  id: number;
  offer_id: number;
  sender_id: number;
  sender_type: "customer" | "restaurant";
  content: string;
  sent_at: string;
};

const ChatBox = ({ onSend, offerId }: Props) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // Hardcoded customer ID
  const CUSTOMER_ID = 1;
  const RESTAURANT_OWNER_ID = 9;
  const OFFER_ID = 2;

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("offer_id", OFFER_ID)
        .order("sent_at", { ascending: true });

      if (error) {
        console.error("Failed to load messages:", error);
      } else {
        const transformed = (data || [])
          .map(transformToMessage)
          .filter(Boolean);
        console.log("Fetched messages:", transformed);
        setMessages(transformed as Message[]);
      }
    };

    fetchMessages();

    const channel = supabase
      .channel("realtime:messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `offer_id=eq.${OFFER_ID}`,
        },
        (payload) => {
          const newMessage = payload.new;
          setMessages((prev) => [...prev, newMessage as Message]);
        }
      )
      .subscribe();

    // ✅ Cleanup on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [offerId]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);

    const { error } = await supabase.from("messages").insert({
      offer_id: OFFER_ID,
      sender_type: "restaurant_owner",
      sender_id: RESTAURANT_OWNER_ID,
      content: message,
    });

    if (error) {
      console.error("Send error:", error);
    } else {
      setMessage(""); // Clear input only on success
      await onSend(message); // Optional, for any side-effects like logging
    }

    setLoading(false);
  };

  return (
    <Stack p="md" className={styles.chatBox}>
      <Stack justify="flex-end" gap="xs" className={styles.messagesBox}>
        {messages.map((msg, i) => {
          const isSender = msg.sender_type === "customer";
          return isSender ? (
            <SenderMessage key={i} content={msg.content} />
          ) : (
            <ReceiverMessage key={i} content={msg.content} />
          );
        })}
      </Stack>
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <TextInput
          disabled={loading}
          placeholder={"Type your message here..."}
          rightSection={
            <ActionIcon
              loading={loading}
              type="submit"
              variant="transparent"
              size="lg"
            >
              <IconSend size={20} />
            </ActionIcon>
          }
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </Stack>
  );
};

const transformToMessage = (rawData: any): Message | null => {
  try {
    return {
      id: Number(rawData.id),
      offer_id: Number(rawData.offer_id),
      sender_id: Number(rawData.sender_id),
      sender_type: rawData.sender_type,
      content: String(rawData.content || ""),
      sent_at: String(rawData.sent_at || new Date().toISOString()),
    };
  } catch (error) {
    console.error("Failed to transform message:", error);
    return null;
  }
};

export default ChatBox;
