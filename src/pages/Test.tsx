import React from "react";
import RequestForm from "../components/request-form/RequestForm";
import RestaurantNavBar from "../layouts/RestaurantNavBar";
import BottomNavBar from "../layouts/BottomNavBar";

type Props = {};

const Test = (props: Props) => {
  return (
    <div>
        <RequestForm />
        <BottomNavBar />
    </div>
  );
};

export default Test;
