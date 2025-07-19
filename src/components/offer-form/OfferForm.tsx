import {
  Box,
  Button,
  FileButton,
  FileInput,
  Group,
  Image,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import supabase from "../../supabase-client";
import styles from "./offer-form.module.css";
import { useSearchParams } from "react-router";
import CustomerAvatar from "../customer-avatar/CustomerAvatar";

type Props = {
  onSubmit: (data: {
    whyChooseUs: string;
    photo: string; // This will be the image URL
    notes: string;
  }) => Promise<void>;
};

const OfferForm = ({ onSubmit }: Props) => {
  const [searchParams] = useSearchParams();
  const offerTime = useMemo(() => {
    const dateParam = searchParams.get("date");
    console.log(dateParam);
    if (dateParam) {
      return new Date(dateParam.replace(" ", "+")).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      
    }
    return null;
  }, [searchParams]);

  const [whyChooseUs, setWhyChooseUs] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState<File | null>(null); // TODO: decide if we need this to send it to supabase
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      whyChooseUs,
      photo: previewUrl ?? "",
      notes,
    };
    console.log("Form submitted:", payload);
    setUploading(true);
    await onSubmit?.(payload);
    setUploading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.offerForm}>
      <Stack>
        <Group gap="sm">
          <CustomerAvatar/> 
          <Text size="xl" fw={500}>Patrick Star</Text>
        </Group>
        <Text size="sm" fw={500} mb={4}>
          Date & time: {" "}<Text span>{offerTime || "Loading..."}</Text>
        </Text>
        <Text></Text>
        <Textarea
          label="Why choose us?"
          placeholder="Reasons for why customer should choose your restaurant."
          value={whyChooseUs}
          onChange={(e) => setWhyChooseUs(e.target.value)}
          autosize
          required
          minRows={3}
          disabled={uploading}
        />

        <Text size="sm" fw={500} mb={4}>
          Send a photo with your offer (optional)
        </Text>
        <FileInput
          placeholder="Upload a photo"
          value={image}
          onChange={(file) => {
            setImage(file);
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
              };
              reader.readAsDataURL(file);
            } else {
              setPreviewUrl(null);
            }
          }}
          accept="image/*"
          clearable
          disabled={uploading}
          />

        <Textarea
          label="Additional notes (optional)"
          placeholder="Enter additional details to your offer here."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          autosize
          minRows={3}
          disabled={uploading}
        />

        <Button loading={uploading} fullWidth color="orange" onClick={handleSubmit}>
          Send offer
        </Button>
      </Stack>
    </form>
  );
};

export default OfferForm;
