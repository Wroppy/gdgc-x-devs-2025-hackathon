import React from "react";
import type { CustomerRequest } from "../../types/CustomerRequest";
import CustomerAvatar from "../../components/customer-avatar/CustomerAvatar";
import { Accordion, Box, Text } from "@mantine/core";
import styles from "./resturant-find-requests.module.css";

type Props = {
  customerRequest: CustomerRequest;
};

const UserRequest = ({ customerRequest }: Props) => {
  // const placeholder = {
  //   name: "John Doe",
  //   group_size: 4,
  //   id: 1,
  //   created_at: new Date().toISOString(),
  //   preferred_time: new Date().toISOString(),
  // };
  const { group_size, created_at, preferred_time } = customerRequest;

  return (
    <Accordion variant="separated" radius="md">
      <Accordion.Item value={created_at}>
        <Accordion.Control>
          <div className={styles.userRequest}>
            <Box className={styles.userRequestAvatar}>
              <CustomerAvatar />
            </Box>
            <div className={styles.userRequestDetails}>
              <Text size="lg" fw={500}>
                Patrick Star
              </Text>
              <Text>
                Preferred time:{" "}
                {new Date(preferred_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <Text size="sm" c="dimmed">
                {group_size} people
              </Text>
            </div>
            <div>
              Posted:{" "}
              {new Date(created_at)
                .toLocaleTimeString()
                .replace(/:\d{2} /, " ")}
            </div>
          </div>
        </Accordion.Control>
        <Accordion.Panel>
          {/* 👇 You can put expanded details here */}
          <Text size="sm" c="dimmed">
            More request info can go here...
          </Text>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default UserRequest;
