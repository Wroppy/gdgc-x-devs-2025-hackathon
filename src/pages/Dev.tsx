import React from "react";
import LogInForm from "../components/login-form/LogInForm";
import ReviewForm from "../components/review-form/ReviewForm";

type Props = {};

const Dev = (props: Props) => {
  return (
    <div>
      <LogInForm />
      <ReviewForm />
    </div>
  );
};

export default Dev;
