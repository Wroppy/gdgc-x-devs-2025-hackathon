import { ActionIcon, Box, Text } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import React from "react";
import styles from "./offer-page.module.css";
import OfferForm from "../../components/offer-form/OfferForm";
import { Link, useSearchParams } from "react-router";
import supabase from "../../supabase-client";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";

const OfferPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestId = searchParams.get("request_id");
  const requestIdNumber = requestId ? parseInt(requestId, 10) : null;
  const { user, role } = useAuth();
  const requester = {
    id: user?.id, // Default to 1 if not set
    type: role || "restaurant_owner", // Default to restaurant_owner if not set
    restaurantId: user?.restaurant_id, // Default to 1 if not set
  };

  console.log(requestId);
  console.log("Requester:", requester);

  const handleSubmit = async ({
    whyChooseUs,
    photo,
    notes,
  }: {
    whyChooseUs: string;
    photo: File | null;
    notes: string;
  }) => {
    const { data, error } = await supabase
      .from("restaurant_offers")
      .insert({
        request_id: requestIdNumber,
        restaurant_id: requester.restaurantId,
        offer_message: whyChooseUs,
        food_images: photo ? [`public/${Date.now()}-${photo.name}`] : null,
        additional_notes: notes,
      })
      .select()
      .single();
    if (error) {
      console.error("Error inserting offer:", error);
    }

    console.log("Inserted offer:", data);
    console.log("Inserted offer ID:", data?.id);

    const { error: e } = await supabase.from("messages").insert({
      offer_id: data?.id,
      sender_type: requester.type,
      is_message: true,
      sender_id: requester.id,
      content: whyChooseUs,
    });
    if (e) {
      console.error("Error inserting message:", e);
    }

    if (notes) {
      const { error: h } = await supabase.from("messages").insert({
        offer_id: data?.id,
        is_message: true,
        sender_id: requester.id,
        content: notes,
        sender_type: requester.type,
      });
      if (h) {
        console.error("Error inserting notes message:", h);
      }
    }
    if (photo) {
      const { data: d, error } = await supabase.storage
        .from("restaurant-owner-image-url")
        .upload(`public/${Date.now()}-${photo.name}`, photo);

      if (error) {
        console.error("Error uploading file:", error);
      } else {
        // // Get the public URL of the uploaded file
        const publicUrl = supabase.storage
          .from("restaurant-owner-image-url")
          .getPublicUrl(d.path).data.publicUrl;
        console.log("File uploaded successfully:", publicUrl);
        const { error: a } = await supabase.from("messages").insert({
          offer_id: data?.id,
          is_message: false,
          sender_id: requester.id,
          content: publicUrl,
          sender_type: requester.type,
        });
        if (a) {
          console.error("Error inserting image message:", a);
        }
      }
    }
    if (data?.id) {
      navigate(`/restaurant/chat/${data.id}`);
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
