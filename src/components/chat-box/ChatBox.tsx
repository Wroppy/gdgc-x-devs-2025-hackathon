import { ActionIcon, Box, Stack, TextInput } from "@mantine/core";
import React, { useState, type FormEvent } from "react";
import styles from "./chat-box.module.css";
import {
  IconImageInPicture,
  IconMicrophone,
  IconPhoto,
  IconSend,
} from "@tabler/icons-react";
import messages from "../../dummy-data/dummy-messages";
import { ReceiverMessage, SenderMessage } from "./ChatMessages";

const RightSection = ({ onClick }: { onClick: (e: FormEvent) => void }) => {
  return <div className={styles.rightSection}></div>;
};

type Props = {
  onSend: (message: string) => Promise<void>;
};

const ChatBox = ({ onSend }: Props) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    await onSend(message);

    setLoading(false);
  };

  const USER_ID = "alice123"

  return (
    <Stack p="md" className={styles.chatBox}>
      <Stack justify="flex-end" gap="xs" className={styles.messagesBox}>
        {messages.map((msg) => {
          const isSender = msg.senderId === USER_ID;
          return isSender ? (
            <SenderMessage key={msg.id} content={msg.content} />
          ) : (
            <ReceiverMessage key={msg.id} content={msg.content} />
          );
        })}
      </Stack>
      <form onSubmit={onSubmit} className={styles.inputForm}>
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

export default ChatBox;
