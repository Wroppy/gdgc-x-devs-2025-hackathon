import { ActionIcon, Box, Stack, TextInput } from "@mantine/core";
import React, { useEffect, useState, type FormEvent } from "react";
import styles from "./chat-box.module.css";
import { IconSend } from "@tabler/icons-react";
import { ReceiverMessage, SenderMessage } from "./ChatMessages";
import supabase from "../../supabase-client";
import { useAuth } from "../../contexts/AuthContext";

type Props = {
  onSend: (message: string) => Promise<void>;
  offerId: number;
  restaurant: {
    name: string;
    avatarUrl: string;
  };
};

type Message = {
  id: number;
  offer_id: number;
  sender_id: number;
  sender_type: "customer" | "restaurant_owner";
  content: string;
  sent_at: string;
};

const ChatBox = ({ onSend, offerId, restaurant }: Props) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const { user, role } = useAuth(); // Includes user.id and role

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("offer_id", offerId)
        .order("sent_at", { ascending: true });

      if (error) {
        console.error("Failed to load messages:", error);
      } else {
        const transformed = (data || [])
          .map(transformToMessage)
          .filter(Boolean);
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
          filter: `offer_id=eq.${offerId}`,
        },
        (payload) => {
          const newMessage = transformToMessage(payload.new);
          if (newMessage) {
            setMessages((prev) => [...prev, newMessage]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [offerId]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);

    const { error } = await supabase.from("messages").insert({
      offer_id: offerId,
      sender_type: role, // "customer" or "restaurant_owner"
      sender_id: user?.id,
      content: message,
    });

    if (error) {
      console.error("Send error:", error);
    } else {
      setMessage("");
      await onSend(message); // Optional callback
    }

    setLoading(false);
  };

  console.log(role);

  //

  return (
    <Stack p="md" className={styles.chatBox}>
      <Stack justify="flex-end" gap="xs" className={styles.messagesBox}>
        {messages.map((msg, i) => {
          const isSender = msg.sender_type === role;
          return isSender ? (
            <SenderMessage
              key={i}
              content={msg.content}
              avatarUrl={
                role === "restaurant_owner"
                  ? restaurant.avatarUrl
                  : "/patrick-star.png"
              }
            />
          ) : (
            <ReceiverMessage
              key={i}
              content={msg.content}
              avatarUrl={
                role === "restaurant_owner"
                  ? "/patrick-star.png"
                  : restaurant.avatarUrl
              }
            />
          );
        })}
      </Stack>
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <TextInput
          autoComplete="off"
          disabled={loading}
          placeholder="Type your message here..."
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
