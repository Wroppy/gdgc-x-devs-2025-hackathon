import { Avatar, Box, Text } from "@mantine/core";
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

const SenderMessage = ({ content, avatarUrl }: SenderMessageProps) => {
  return (
    <div className={styles.message}>
      <Avatar />
      <Box p="xs" bg="#cccccc" className={styles.senderMessage}>
        {content}
      </Box>
      <Box flex={1} />
    </div>
  );
};

const ReceiverMessage = ({ content, avatarUrl }: RecipientMessageProps) => {
  return (
    <div className={styles.message}>
      <Box flex={1} />
      <Box p="xs" bg="orange" className={styles.receiverMessage}>
        {content}
      </Box>
      <Avatar />
    </div>
  );
};

export { SenderMessage, ReceiverMessage };
