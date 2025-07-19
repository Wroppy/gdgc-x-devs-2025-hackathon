import {
  Box,
  Button,
  Center,
  Divider,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import React from "react";
import LogInForm from "../../components/login-form/LogInForm";
import {
  IconBrandAppleFilled,
  IconBrandGoogleFilled,
} from "@tabler/icons-react";
import styles from "./login-page.module.css";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router";
import supabase from "../../supabase-client";
import { useAuth } from "../../contexts/AuthContext";

type Props = {};

const LoginPage = (props: Props) => {
  const navigate = useNavigate();
  const { setUser, setRole } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data: customer } = await supabase
        .from("customers")
        .select("*")
        .eq("email", email)
        .single();

      const { data: owner } = await supabase
        .from("restaurant_owners")
        .select("*")
        .eq("email", email)
        .single();

      if (customer) {
        navigate("/customer");
        setUser(customer);
        setRole("customer");
        showNotification({
          title: "Login successful",
          message: `Welcome back, ${customer.name}!`,
          color: "green",
        });
        console.log("User set to: ", customer);
        // Set user in AuthContext
      } else if (owner) {
        navigate("/restaurant");
        setUser(owner);
        setRole("restaurant_owner");
        showNotification({
          title: "Login successful",
          message: `Welcome back, ${owner.name}!`,
          color: "green",
        });
        console.log("User set to: ", owner);
      } else {
        showNotification({
          title: "Login failed",
          message: "Email not found in our system.",
          color: "red",
        });
      }
    } catch (error) {
      showNotification({
        title: "Login error",
        message: "Something went wrong. Please try again.",
        color: "red",
      });
    }
  };

  return (
    <Stack p="lg" gap="lg">
      <div className={styles.logoContainer}>
        <Image src="/logo.png" alt="Logo" h={100} w={"auto"} />
        <Text c="orange" size="2rem" fw={500}>
          DISHCOVER
        </Text>
      </div>
      <LogInForm login={handleLogin} />

      <Divider label="OR" labelPosition="center" />
      <Stack gap="xs" className={styles.authProviderButtons}>
        <Button variant="outline">
          <IconBrandGoogleFilled className={styles.buttonIcon} /> Continue with
          Google
        </Button>
        <Button variant="outline">
          <IconBrandAppleFilled className={styles.buttonIcon} /> Continue with
          Apple
        </Button>
      </Stack>
      <Center>
        <Text ta="center">
          By clicking continue, you agree to our{" "}
          <Text span c="accent" fw={500}>
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text span c="accent" fw={500}>
            Privacy Policy
          </Text>
        </Text>
      </Center>
    </Stack>
  );
};

export default LoginPage;
