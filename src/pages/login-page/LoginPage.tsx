import { Box, Button, Center, Divider, Image, Stack, Text } from "@mantine/core";
import React from "react";
import LogInForm from "../../components/login-form/LogInForm";
import { IconBrandApple, IconBrandAppleFilled, IconBrandGoogle, IconBrandGoogleFilled } from "@tabler/icons-react";
import styles from "./login-page.module.css";
type Props = {};

const LoginPage = (props: Props) => {
  return (
    <Stack p="lg" gap="lg">
      <div className={styles.logoContainer}>
        <Image
          src="/logo.png"
          alt="Logo"
          h={100}
          w={"auto"}
        />
        <Text c="orange" size="2rem" fw={500}>DISHCOVER</Text>
      </div>
      <LogInForm />
      <Divider label="OR" labelPosition="center" />
      <Stack gap="xs" className={styles.authProviderButtons}>
        <Button variant="outline">
          <IconBrandGoogleFilled className={styles.buttonIcon} /> Continue with Google
        </Button>
        <Button variant="outline">
          <IconBrandAppleFilled className={styles.buttonIcon}/> Continue with Apple
        </Button>
      </Stack>
      <Center>
        <Text>
          By clicking continue, you agree to our {" "} 
          <Text span c="accent" fw={500}>
            Terms of Service
          </Text> and <Text span c="accent" fw={500}  >
            Privacy Policy
          </Text>
        </Text>
      </Center>
    </Stack>
  );
};

export default LoginPage;
