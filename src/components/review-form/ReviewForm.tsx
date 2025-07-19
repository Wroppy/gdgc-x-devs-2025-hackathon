import {
  Button,
  Center,
  Divider,
  Rating,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import React, { useState } from "react";
import styles from "./review-form.module.css";
import { useNavigate } from "react-router";
import { Loader } from "@mantine/core";

type Props = {};

const LabelContainer = ({
  children,
  text,
  required = false,
}: {
  children: React.ReactNode;
  text: string;
  required?: boolean;
}) => {
  return (
    <Stack className={styles.labelContainer} gap="sm">
      <Text size="sm" fw={500}>
        {text}
        {required && <span className={styles.required}> *</span>}
      </Text>
      <Center>{children}</Center>
    </Stack>
  );
};

const ReviewForm = (props: Props) => {
  const [review, setReview] = useState("");
  const [tasteRating, setTasteRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [accuracyRating, setAccuracyRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setLoading(true);

  // Change this if we need to send data to backend
  setTimeout(() => {
    setLoading(false);
    setSubmitted(true);

  // After 1 seconds, redirect to customer home page
    setTimeout(() => {
      navigate("/customer");
    }, 1000);
  }, 500);
};

  return (
    <form className={styles.reviewForm} onSubmit={handleSubmit}>
      <Stack justify="space-between">
        <Stack>
          <LabelContainer
            required
            text="How would you rate the taste of your food?"
          >
            <Rating
              value={tasteRating}
              onChange={setTasteRating}
              fractions={2}
              size="lg"
            />
          </LabelContainer>
          <Divider />
          <LabelContainer text="Service Rating" required>
            <Rating
              value={serviceRating}
              onChange={setServiceRating}
              fractions={2}
              size="lg"
            />
          </LabelContainer>
          <Divider />

          <LabelContainer required text="Accuracy Rating">
            <Rating
              value={accuracyRating}
              onChange={setAccuracyRating}
              fractions={2}
              size="lg"
            />
          </LabelContainer>
          <Divider />

          <Textarea
            placeholder="E.g. This is a great restaurant! Highly recommend the pizza."
            label="Write a review (optional)"
            rows={10}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </Stack>

       {loading ? (
        <Center>
          <Loader color="orange" />
        </Center>
        ) : submitted ? (
        <Text ta="center" c="accent" fw={500}>
          Your review has been submitted!
        </Text>
        ) : (
        <Button fullWidth color="orange" type="submit">
          Submit Review
        </Button>
      )}
      </Stack>
    </form>
  );
};

export default ReviewForm;
