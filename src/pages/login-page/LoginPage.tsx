import { Image, Stack, Text } from "@mantine/core";
import React from "react";
import LogInForm from "../../components/login-form/LogInForm";

type Props = {};

const LoginPage = (props: Props) => {
  return <Stack>
    <div className="logoContainer">
      <Image
        src="/logo.png"
        alt="Logo"
        style={{ width: "100px", height: "100px" }}
      />
      <Text c="orange">
        DISHCOVER
      </Text>
    </div>
    <LogInForm />
  </Stack>;
};

export default LoginPage;
