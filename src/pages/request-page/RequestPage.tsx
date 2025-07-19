import { ActionIcon, Box, Title } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import React from "react";
import styles from "./request-page.module.css";
import RequestForm from "../../components/request-form/RequestForm";
type Props = {};

const RequestPage = (props: Props) => {
  return (
    <div className={styles.requestPage}>
      <Box h="2.1rem" bg="orange" className={styles.requestPageHeader}>
        <ActionIcon
          size="lg"
          variant="transparent"
          color="white"
          className={styles.backButton}
        >
            <IconChevronLeft size={24} />
        </ActionIcon>
        <Title order={3} c="white">
            Request Form
        </Title>
    </Box>
    <Box flex={1} p="md">
        <RequestForm />
    </Box>
    </div>
  );
};

export default RequestPage;


