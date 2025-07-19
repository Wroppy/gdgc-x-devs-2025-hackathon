import { ActionIcon, Box, Text, Title } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import React from "react";
import styles from "./request-page.module.css";
import RequestForm from "../../components/request-form/RequestForm";
import { Link } from "react-router";
type Props = {};

const RequestPage = (props: Props) => {
  return (
    <div className={styles.requestPage}>
      <Box h="2.1rem" bg="orange" className={styles.requestPageHeader}>
        <ActionIcon
          component={Link}
          size="lg"
          variant="transparent"
          color="white"
          className={styles.backButton} to={"/customer"}        >
            <IconChevronLeft size={24} />
        </ActionIcon>
        <Text c="white">
            Request Form
        </Text>
    </Box>
    <Box flex={1} p="md">
        <RequestForm />
    </Box>
    </div>
  );
};

export default RequestPage;


