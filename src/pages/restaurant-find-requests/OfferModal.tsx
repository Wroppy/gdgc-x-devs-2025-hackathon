import { Modal } from "@mantine/core";
import React from "react";
import OfferForm from "../../components/offer-form/OfferForm";
import supabase from "../../supabase-client";
import { notifications } from "@mantine/notifications";
import type { CustomerRequest } from "../../types/CustomerRequest";

type Props = {
  opened: boolean;
  onClose: () => void;
  offerTime: string;
  request: CustomerRequest;
  onSubmit: (id: string) => void; // Callback when the offer is submitted
  // Add any other props you need for the modal
};

const OfferModal = ({
  onSubmit,
  opened,
  onClose,
  offerTime,
  request,
}: // Add any other props you need for the modal
Props) => {
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
        status: "sent",
      })
      .select()
      .single();
    if (error) {
      console.error("Error inserting offer:", error);
    }

    const { error: e } = await supabase.from("messages").insert({
      offer_id: data?.id,
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
        offer_id: data?.id,
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
          sender_id: 1,
          content: publicUrl,
          sender_type: "restaurant_owner",
        });
        if (a) {
          console.error("Error inserting image message:", a);
        }
      }
    }
    onClose(); // Close the modal after submission
    notifications.show({
      title: "Offer Submitted",
      message: "Your offer has been submitted to Patrick Star.",
      color: "green",
    });
    onSubmit(request_id); // Call the onSubmit callback if provided
  };

  return (
    <Modal title="Make an Offer" opened={opened} onClose={onClose}>
      <OfferForm
        reqId={request.id.toString()}
        onSubmit={handleSubmit}
        offerTime={offerTime}
      />
    </Modal>
  );
};

export default OfferModal;
