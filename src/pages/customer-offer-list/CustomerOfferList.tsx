import React from "react";
import MessagesContainer from "../../components/messages-container/MessagesContainer";
import BottomNavBar from "../../layouts/BottomNavBar";

type Props = {};

const CustomerOfferList = (props: Props) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
    }}>
      <MessagesContainer /> 
      <BottomNavBar />
    </div>
  );
};

export default CustomerOfferList;
