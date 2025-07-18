import { Center, Divider, Group } from "@mantine/core";
import React from "react";

type Props = {};

const NotFoundPage = (props: Props) => {
  return (
    <Center>
      <div style={{display: 'flex', gap: "1rem", fontSize: "2rem"}}>
        <div>404</div>
        <Divider orientation="vertical" />
        <div>Not Found</div>
      </div>
    </Center>
  );
};

export default NotFoundPage;
