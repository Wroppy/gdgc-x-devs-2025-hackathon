import { ActionIcon, Box, Text, Title } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import React from "react";
import styles from "./request-page.module.css";
import RequestForm from "../../components/request-form/RequestForm";
import { Link, useNavigate } from "react-router";
import supabase from "../../supabase-client";

type Props = {};

const RequestPage = (props: Props) => {
  const navigate = useNavigate();

  const handleSubmit = async (data: {
    time: Date | null;
    groupSize: number;
    location: string;
    cuisine: string[];
    mood: string[];
    budgetRange: [number, number];
    notes: string;
  }) => {
    console.log("Request submitted:", data);

    supabase
      .from("customer_requests")
      .insert([
        {
          customer_id: "1",
          group_size: data.groupSize,
          // location: data.location,
          preferred_cuisines: data.cuisine,
          preferred_vibes: data.mood,
          notes: data.notes,
          preferred_time: data.time ? data.time.toISOString() : null,
          budget_lower: data.budgetRange[0],
          budget_upper: data.budgetRange[1],
        },
      ])

      .then(({ data, error }) => {
        if (error) {
          console.error("Error inserting request:", error);
        } else {
          console.log("Request inserted successfully:", data);
          navigate("/customer/offers");
        }
      });
  };

  return (
    <div className={styles.requestPage}>
      <Box p="sm" bg="orange" className={styles.requestPageHeader}>
        <ActionIcon
          component={Link}
          size="lg"
          variant="transparent"
          color="white"
          className={styles.backButton}
          to={"/customer"}
        >
          <IconChevronLeft size={24} />
        </ActionIcon>
        <Box>
          <Text fw={500} c="white">
            Send a request to become available for offers
          </Text>
        </Box>
      </Box>
      <Box flex={1} p="md">
        <RequestForm onSubmit={handleSubmit} />
      </Box>
    </div>
  );
};

export default RequestPage;
