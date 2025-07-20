import React, { useState } from "react";
import {
  Button,
  NumberInput,
  TextInput,
  Textarea,
  TagsInput,
  Box,
  Stack,
  Text,
  RangeSlider,
  Group,
  Loader,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import styles from "./request-form.module.css";
import { IconMapPin, IconPin, IconTarget } from "@tabler/icons-react";
import { useTimeout } from "@mantine/hooks";

const cuisineOptions = [
  "American",
  "Asian",
  "Italian",
  "Mexican",
  "Indian",
  "French",
];
const moodOptions = [
  "Casual",
  "Romantic",
  "Family",
  "Party",
  "Quiet",
  "Business",
  "Outdoor",
  "Indoor",
  "Pet-friendly",
  "Vegan-friendly",
];

type Props = {
  onSubmit?: (data: {
    time: Date | null;
    groupSize: number;
    location: string;
    cuisine: string[];
    mood: string[];
    budgetRange: [number, number];
    notes: string;
  }) => Promise<void>;
};

const getAddressFromCoords = async (lat: number, lng: number) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
  );
  const data = await res.json();
  return data.display_name || "Address not found";
};

const RequestForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [groupSize, setGroupSize] = useState<number>(6);
  const [location, setLocation] = useState("");
  const [cuisine, setCuisine] = useState<string[]>([]);
  const [mood, setMood] = useState<string[]>(["Casual"]);
  const [budgetRange, setBudgetRange] = useState<[number, number]>([10, 20]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDateChange = (value: Date | string | null) => {
    if (value instanceof Date || value === null) {
      setDate(value);
    } else {
      setDate(new Date(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      time: date,
      groupSize,
      location,
      cuisine,
      mood,
      budgetRange,
      notes,
    };
    console.log("Form submitted:", payload);
    await onSubmit?.(payload);
  };

  const findLocation = async () => {
    setLoading(true);
    // Placeholder for location finding logic
    console.log("Finding location...");
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        ({ coords }) => {
          const location =
            "Auckland Dockline Tram Track, Daldy Street Shared Path, North Wharf, Wynyard Quarter, Auckland, Waitematā, Auckland, 1001, New Zealand";
          new Promise((resolve) => setTimeout(resolve, 300)).then(() => {
            setLocation(location);
            setLoading(false);
          });
        },
        () => {
          setLocation("Unable to retrieve your location.");
        }
      );
    } else {
      // ERROR:
      setLocation("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Box h="100%">
      <form onSubmit={handleSubmit} className={styles.requestForm}>
        <Stack justify="space-between" h="100%">
          <Stack>
            <DateTimePicker
              label="Time"
              placeholder="Pick date and time"
              value={date}
              onChange={handleDateChange}
              required
            />
            <NumberInput
              label="Group Size"
              min={1}
              value={groupSize}
              onChange={(value) => setGroupSize(Number(value))}
              required
            />
            <TextInput
              flex={1}
              leftSection={<IconMapPin size={20} />}
              rightSection={
                loading ? (
                  <Loader size="sm" />
                ) : (
                  <IconTarget
                    size={20}
                    onClick={findLocation}
                    style={{ cursor: "pointer" }}
                  />
                )
              }
              readOnly
              label="Current At"
              placeholder="Enter address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <TagsInput
              label="Cuisine Type"
              data={cuisineOptions}
              value={cuisine}
              onChange={setCuisine}
              clearable
            />
            <Text size="sm" fw={500} mb={4}>
              Maximum Budget per Person
            </Text>
            <RangeSlider
              minRange={10}
              min={0}
              max={100}
              step={10}
              defaultValue={[10, 20]}
              label={(value) => (value === 100 ? "$100+" : `$${value}`)}
              w="100%"
              marks={[
                { value: 0, label: "$0" },
                { value: 50, label: "$50" },
                { value: 100, label: "$100+" },
              ]}
              classNames={{ markLabel: styles.markLabel }}
              value={budgetRange}
              onChange={setBudgetRange}
            />

            <TagsInput
              label="Desired Mood"
              data={moodOptions}
              value={mood}
              onChange={setMood}
              clearable
              mt="md"
              styles={{
                input: { marginTop: "8px" },
              }}
            />

            <Textarea
              label="Additional Notes"
              placeholder="Enter additional details to your request here"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              autosize
              minRows={3}
            />
          </Stack>

          <Button type="submit" color="orange">
            Submit Request
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default RequestForm;
