import { Modal } from '@mantine/core'
import React from 'react'
import OfferForm from '../../components/offer-form/OfferForm'

type Props = {
  opened: boolean
  onClose: () => void
  offerTime: string;
  // Add any other props you need for the modal
}

const OfferModal = ({
  opened,
  onClose,
  offerTime
  // Add any other props you need for the modal
}: Props) => {
  const onSubmit = async (data: {
    whyChooseUs: string;
    photo: File | null; // This will be the image URL
    notes: string;
    request_id: string;
  }) => {
    // Handle the form submission logic here
    console.log("Offer submitted:", data);
    // You can also close the modal after submission if needed
    onClose();
  }
  
  return (
    <Modal
      title="Make an Offer"
      opened={opened}
      onClose={onClose}
    >
      <OfferForm onSubmit={onSubmit} offerTime={offerTime} />
    </Modal>
  )
}

export default OfferModal