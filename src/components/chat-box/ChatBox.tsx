import { ActionIcon, Box, TextInput } from "@mantine/core";
import React, { useState, type FormEvent } from "react";
import styles from "./chat-box.module.css";
import {
  IconImageInPicture,
  IconMicrophone,
  IconPhoto,
  IconSend,
} from "@tabler/icons-react";

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

  return (
    <Box p="md" className={styles.chatBox}>
      <div className={styles.messagesBox}></div>
      <form onSubmit={onSubmit} className={styles.inputForm}>
        <TextInput
          disabled={loading}
          placeholder={"Type your message here..."}
          rightSection={
            <ActionIcon loading={loading} type="submit" variant="transparent" size="lg">
              <IconSend />
            </ActionIcon>
          }
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </Box>
  );
};

export default ChatBox;
