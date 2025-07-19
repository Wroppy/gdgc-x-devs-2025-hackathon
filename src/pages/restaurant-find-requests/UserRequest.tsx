import type { CustomerRequest } from "../../types/CustomerRequest";
import CustomerAvatar from "../../components/customer-avatar/CustomerAvatar";
import { Accordion, Box, Button, Group, Text } from "@mantine/core";
import styles from "./resturant-find-requests.module.css";

type Props = {
  customerRequest: CustomerRequest;
  onClick: () => void;
};

const UserRequest = ({ customerRequest, onClick }: Props) => {
  // const placeholder = {
  //   name: "John Doe",
  //   group_size: 4,
  //   id: 1,
  //   created_at: new Date().toISOString(),
  //   preferred_time: new Date().toISOString(),
  // };
  const {
    group_size,
    created_at,
    preferred_time,
    notes,
    preferred_cuisines,
    preferred_vibes,
    budget_lower,
    budget_upper,
  } = customerRequest;

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
          <Box ml={`calc(38px + var(--mantine-spacing-md))`}>
            {/* 👇 You can put expanded details here */}
            <Box>
              <Text size="sm" c="dimmed">
                Preferred Cuisines: {(preferred_cuisines || []).join(", ")}
              </Text>
              <Text size="sm" c="dimmed">
                Preferred Vibes: {(preferred_vibes || []).join(", ")}
              </Text>
              <Text size="sm" c="dimmed">
                Preferred Price Range: ${budget_lower} - ${budget_upper}
              </Text>
            </Box>
            <Text size="sm" c="dimmed">
              {notes ? "Notes: " + notes : "No additional notes provided."}
            </Text>

            <Group justify="flex-end">
              <Button 
              onClick={onClick}
              variant="outline">Make an offer</Button>
            </Group>
          </Box>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default UserRequest;
