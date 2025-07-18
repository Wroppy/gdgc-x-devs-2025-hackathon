import { Button, Textarea } from "@mantine/core";
import React, { useState } from "react";
import styles from "./review-form.module.css";

type Props = {};

const ReviewForm = (props: Props) => {
  const [review, setReview] = useState("");
  return (
    <form>
      {/* Need to include stars */}
      <Textarea
        placeholder="E.g. This is a great restaurant! Highly recommend the pizza."
        label="Write a review"
        rows={4}
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <Button type="submit">
        Submit Review
      </Button>
    </form>
  );
};

export default ReviewForm;
