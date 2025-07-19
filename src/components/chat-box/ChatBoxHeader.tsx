import React from "react";
import styles from "./chat-box.module.css";
import { ActionIcon, Avatar, Box, Group } from "@mantine/core";
import { IconArrowLeft, IconChevronLeft, IconPhone } from "@tabler/icons-react";

type Props = { includePhone?: boolean; name: string; avatarUrl: string };

const ChatBoxHeader = ({includePhone=false, name, avatarUrl}: Props) => {
  return (
    <Group
      style={{
        border: "1px solid #eee",
      }}
      p="0.5rem"
      justify="space-between"
    >
      <Group>
        <ActionIcon variant="transparent">
          <IconChevronLeft />
        </ActionIcon>
        <Box style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
          <Avatar src={avatarUrl} alt={name} />
          <div>{name}</div>
        </Box>
      </Group>
      {includePhone && (
        <ActionIcon variant="transparent">
          <IconPhone color="black" />
        </ActionIcon>
      )}
    </Group>
  );
};

export default ChatBoxHeader;
