import { ActionIcon, Box, Text } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import React from "react";
import styles from "./feedback-page.module.css";
import ReviewForm from "../../components/review-form/ReviewForm";
type Props = {};

const FeedbackPage = (props: Props) => {
  return (
    <div className={styles.feedbackPage}>
      <Box p="sm" bg="orange" className={styles.feedbackPageHeader}>
        <ActionIcon
          size="lg"
          variant="transparent"
          className={styles.backButton}
        >
          <IconChevronLeft color="white" size={24}  />
        </ActionIcon>
        <Text c="white" fw={500}>Feedback Form</Text>
      </Box>
      <Box flex={1} p="md">
        <ReviewForm />
      </Box>
    </div>
  );
};

export default FeedbackPage;
