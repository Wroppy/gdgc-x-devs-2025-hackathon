import { ActionIcon, Box, Text, Title } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import React from "react";
import styles from "./offer-page.module.css";
import OfferForm from "../../components/offer-form/OfferForm";
import { Link } from "react-router";
import supabase from "../../supabase-client";

const OfferPage = (props: Props) => {
  const handleSubmit = async ({
    whyChooseUs,
    photo,
    notes,
    request_id,
  }: {
    whyChooseUs: string;
    photo: File | null;
    notes: string;
    request_id: string;
  }) => {
    const { data, error } = await supabase
      .from("restaurant_offers")
      .insert({
        request_id,
        restaurant_id: 1,
        offer_message: whyChooseUs,
        food_images: photo ? [`public/${Date.now()}-${photo.name}`] : null,
      })
      .select()
      .single();
    if (error) {
      console.error("Error inserting offer:", error);
    }

    const { error: e } = await supabase.from("messages").insert({
      offer_id: data?.id as string,
      sender_type: "restaurant_owner",
      is_message: true,
      sender_id: 1,
      content: whyChooseUs,
    });
    if (e) {
      console.error("Error inserting message:", e);
    }

    if (notes) {
      const { error: h } = await supabase.from("messages").insert({
        offer_id: data?.id as string,
        is_message: true,
        sender_id: 1,
        content: notes,
        sender_type: "restaurant_owner",
      });
      if (h) {
        console.error("Error inserting notes message:", h);
      }
    }
    if (photo) {
      const { data, error } = await supabase.storage
        .from("restaurant-owner-image-url")
        .upload(`public/${Date.now()}-${photo.name}`, photo);

      if (error) {
        console.error("Error uploading file:", error);
      } else {
        // // Get the public URL of the uploaded file
        const publicUrl = supabase.storage
          .from("restaurant-owner-image-url")
          .getPublicUrl(data.path).data.publicUrl;
        console.log("File uploaded successfully:", publicUrl);
      }
    }
  };

  return (
    <div className={styles.offerPage}>
      <Box h="2.1rem" bg="orange" className={styles.offerPageHeader}>
        <ActionIcon
          component={Link}
          size="lg"
          variant="transparent"
          color="white"
          className={styles.backButton}
          to={"/restaurant/find"} //TODO: decide where it lead to
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
