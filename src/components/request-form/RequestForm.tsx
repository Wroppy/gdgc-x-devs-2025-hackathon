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
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import styles from "./request-form.module.css";
import { IconMapPin, IconPin, IconTarget } from "@tabler/icons-react";

const cuisineOptions = ["Asian", "Italian", "Mexican", "Indian", "French"];
const moodOptions = ["Casual", "Romantic", "Family", "Party", "Quiet"];

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

const RequestForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [groupSize, setGroupSize] = useState<number>(6);
  const [location, setLocation] = useState("");
  const [cuisine, setCuisine] = useState<string[]>(["Asian"]);
  const [mood, setMood] = useState<string[]>(["Casual"]);
  const [budgetRange, setBudgetRange] = useState<[number, number]>([10, 20]);
  const [notes, setNotes] = useState("");

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

  const findLocation = () => {
    // Placeholder for location finding logic
    console.log("Finding location...");
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(({coords}) => {
        // SUCCESSFUL:
        const {latitude, longitude} = coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        setLocation(`${latitude}, ${longitude}`);
      }, () => {
        setLocation("Unable to retrieve your location.");
      });
    } else {
        // ERROR:
        setLocation("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit} className={styles.requestForm}>
        <Stack>
          <DateTimePicker
            label="TIME"
            placeholder="Pick date and time"
            value={date}
            onChange={handleDateChange}
            required
          />
          <NumberInput
            label="GROUP SIZE"
            min={1}
            value={groupSize}
            onChange={(value) => setGroupSize(Number(value))}
            required
          />
          <TextInput
            flex={1}
            leftSection={<IconMapPin size={20} />}
            rightSection={
              <IconTarget
                size={20}
                onClick={findLocation}
                style={{ cursor: "pointer" }}
              />
            }
            readOnly
            label="NEAR LOCATION"
            placeholder="Enter address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <TagsInput
            label="CUISINE TYPE"
            data={cuisineOptions}
            value={cuisine}
            onChange={setCuisine}
            clearable
          />
          <Text size="sm" fw={500} mb={4}>
            BUDGET PER PERSON
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
            label="MOOD"
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
            label="ADDITIONAL NOTES"
            placeholder="Enter additional details to your request here"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            autosize
            minRows={3}
          />

          <Button type="submit" color="orange">
            Send the Request
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default RequestForm;
