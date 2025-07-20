import React from "react";
import styles from "./chat-box.module.css";
import { ActionIcon, Avatar, Box, Group, Text } from "@mantine/core";
import { IconArrowLeft, IconChevronLeft, IconPhone } from "@tabler/icons-react";
import { Link } from "react-router";

type Props = { includePhone?: boolean; name: string; avatarUrl: string
  role: "customer" | "restaurant_owner"
 };

const ChatBoxHeader = ({ includePhone = false, name, avatarUrl, role}: Props) => {
  console.log("ChatBoxHeader rendered with:", {
    includePhone,
    name,
    avatarUrl,
  });


  return (
    <Group
      style={{
        border: "1px solid #eee",
      }}
      p="1.0rem"
      justify="space-between"
    >
      <Group>
        <ActionIcon variant="transparent" component={Link} to={role === "customer" ? "/customer/offers" : "/restaurant/find"}>
          <IconChevronLeft />
        </ActionIcon>
        <Box style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Avatar src={avatarUrl} alt={name} size={60} radius="xl" />
          <Text size="xl" style={{ color: "#000", fontWeight: 500 }}>
            {name}
          </Text>
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
