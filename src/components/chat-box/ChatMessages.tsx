import { Avatar, Box, Image, Text } from "@mantine/core";
import React from "react";
import styles from "./chat-box.module.css";

type SenderMessageProps = {
  content: string;
  avatarUrl?: string;
};
type RecipientMessageProps = {
  content: string;
  avatarUrl?: string;
};

const imageStart = `${
  import.meta.env.VITE_SUPABASE_URL
}/storage/v1/object/public`;

const ReceiverMessage = ({ content, avatarUrl = "" }: RecipientMessageProps) => {
  return (
    <div className={styles.message}>
      <Avatar src={avatarUrl} />
      <Box p="xs" bg="#cccccc" className={styles.senderMessage}>
        {content.startsWith(imageStart) ? (
          <Image
            src={content}
            alt="Image"
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        ) : (
          content
        )}
      </Box>
      <Box flex={1} />
    </div>
  );
};

const SenderMessage = ({ content, avatarUrl }: SenderMessageProps) => {
  return (
    <div className={styles.message}>
      <Box flex={1} />
      <Box p="xs" bg="orange" className={styles.receiverMessage}>
        {content.startsWith(imageStart) ? (
          <Image
            src={content}
            alt="Image"
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        ) : (
          content
        )}
      </Box>
      <Avatar src={avatarUrl} />
    </div>
  );
};

export { SenderMessage, ReceiverMessage };
