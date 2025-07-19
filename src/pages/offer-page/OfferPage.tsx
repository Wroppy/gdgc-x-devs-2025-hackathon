import { ActionIcon, Box, Text, Title } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import React from "react";
import styles from "./offer-page.module.css";
import OfferForm from "../../components/offer-form/OfferForm";
import { Link } from "react-router";
import supabase from "../../supabase-client";
type Props = {};    
    

const OfferPage = (props: Props) => {

    const handleSubmit = async (data: {
        whyChooseUs: string;
        photo: string; //TODO: check this
        notes: string;
    }) => {
    console.log("Request submitted:", data);
    }

return (
    <div className={styles.offerPage}>
      <Box h="2.1rem" bg="orange" className={styles.offerPageHeader}>
        <ActionIcon
          component={Link}
          size="lg"
          variant="transparent"
          color="white"
          className={styles.backButton}
          to={"/"}  //TODO: decide where it lead to
        >
          <IconChevronLeft size={24} />
        </ActionIcon>
        <Text c="white">Offer Form</Text>
      </Box>
      <Box flex={1} p="md">
        <OfferForm onSubmit={handleSubmit} />
      </Box>
    </div>
  );
};

export default OfferPage;