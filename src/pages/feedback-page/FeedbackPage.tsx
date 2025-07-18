import { ActionIcon, Box, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import React from "react";
import styles from "./feedback-page.module.css";
import ReviewForm from "../../components/review-form/ReviewForm";
type Props = {};

const FeedbackPage = (props: Props) => {
  return (
    <div className={styles.feedbackPage}>
      <Box h="2.1rem" bg="accent" className={styles.feedbackPageHeader}>
        <ActionIcon
          size="lg"
          variant="transparent"
          className={styles.backButton}
        >
          <IconArrowLeft color="black" size={20} />
        </ActionIcon>
        <Text>Feedback Form</Text>
      </Box>
      <Box flex={1} p="md">
        <ReviewForm />
      </Box>
    </div>
  );
};

export default FeedbackPage;
