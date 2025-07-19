import {
  Button,
  FileButton,
  Group,
  Image,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { useEffect, useState } from "react";
import supabase from "../../supabase-client";
import styles from "./offer-form.module.css";

type Props = {
  onSubmit: (data: {
    whyChooseUs: string;
    photo: string; // This will be the image URL
    notes: string;
  }) => Promise<void>;
};


const OfferForm = ({ onSubmit }: Props) => {
  const [offerTime, setOfferTime] = useState<string | null>(null);
  const [whyChooseUs, setWhyChooseUs] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState<File | null>(null);   // TODO: decide if we need this to send it to supabase
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // TODO: Fetch offer time from Supabase
  useEffect(() => {
    const fetchOfferTime = async () => {
      const { data, error } = await supabase
        .from("offers")
        .select("offer_time")
        .eq("id", 1)
        .single();

      if (data) {
        setOfferTime(new Date(data.offer_time).toLocaleString());
      } else {
        console.error("Error fetching offer time:", error);
      }
    };
    fetchOfferTime();
  }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
        whyChooseUs,
        photo: previewUrl ?? '',
        notes,
        };
        console.log("Form submitted:", payload);
    await onSubmit?.(payload);
    };


  return (
    <form onSubmit={handleSubmit} className={styles.offerForm}>
      <Stack>
        <Text size="sm" fw={500} mb={4}>
          DATE & TIME
        </Text>
        <Text>{offerTime || "Loading..."}</Text>
        <Textarea
          label="WHY CHOOSE US?"
          placeholder="Reason for why customer should choose your restaurant."
          value={whyChooseUs}
          onChange={(e) => setWhyChooseUs(e.target.value)}
          autosize
          required
          minRows={3}
        />

        <Text size="sm" fw={500} mb={4}>
          PHOTOS
        </Text>
        <Group>
          {previewUrl && <Image src={previewUrl} w={80} h={80} radius="sm" />}
          <FileButton
            onChange={(file) => {
              if (file) {
                setImage(file);
                setPreviewUrl(URL.createObjectURL(file));
              }
            }}
            accept="image/png,image/jpeg"
          >
            {(props) => (
              <Button radius="xl" variant="default" {...props}>
                +
              </Button>
            )}
          </FileButton>
        </Group>

        <Textarea
          label="ADDITIONAL NOTES"
          placeholder="Enter additional details to your offer here."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          autosize
          minRows={3}
        />

        <Button fullWidth color="orange" onClick={handleSubmit}>
          Send the Offer
        </Button>
      </Stack>
      </form>
  );
};

export default OfferForm;
