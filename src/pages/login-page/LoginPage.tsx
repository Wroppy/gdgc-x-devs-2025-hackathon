import { Stack, Text } from "@mantine/core";
import React from "react";
import LogInForm from "../../components/login-form/LogInForm";

type Props = {};

const LoginPage = (props: Props) => {
  return <Stack>
    <div className="logoContainer">
      <img
        src="https://raw.githubusercontent.com/gdgc-x-devs-2025-hackathon/gdgc-x-devs-2025-hackathon/main/src/assets/logo.png"
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
