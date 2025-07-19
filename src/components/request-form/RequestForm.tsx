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
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import styles from "./request-form.module.css";


const cuisineOptions = ["Asian", "Italian", "Mexican", "Indian", "French"];
const moodOptions = ["Casual", "Romantic", "Family", "Party", "Quiet"];

const RequestForm = () => {
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

    const handleSubmit = (e: React.FormEvent) => {
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
                        BUDGET PER PERSON:
                    </Text>
                    <RangeSlider 
                        minRange={10} min={0} max={100} step={10} defaultValue={[10, 20]} 
                        label={(value) => (value === 100 ? "$100+" : `$${value}`)}
                        w="100%"
                        marks={[
                            { value: 0, label: '$0' },
                            { value: 50, label: '$50' },
                            { value: 100, label: '$100+' },
                        ]}
                        classNames={{ markLabel: styles.markLabel}}
                        
                        />

                    <TagsInput
                        label="MOOD"
                        data={moodOptions}
                        value={mood}
                        onChange={setMood}
                        clearable
                        mt="md"
                        styles={{
                            input: { marginTop: "8px" }
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
                        Send Request
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default RequestForm;