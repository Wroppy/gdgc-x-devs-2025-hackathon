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

export type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  restaurant_id?: number;
  role?: "customer" | "restaurant_owner";
};

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
        const fetchedCustomer = {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          avatar_url: customer.customer_image_url,
          role: "customer",
        };
        navigate("/customer");
        setUser(fetchedCustomer);
        setRole("customer");
        showNotification({
          title: "Login successful",
          message: `Welcome back, ${fetchedCustomer.name}!`,
          color: "green",
        });
        console.log("User set to: ", fetchedCustomer);
        // Set user in AuthContext
      } else if (owner) {
        const fetchedOwner = {
          id: owner.id,
          name: owner.name,
          email: owner.email,
          phone: owner.phone,
          avatar_url: owner.restaurant_owner_image_url,
          restaurant_id: owner.restaurant_id,
          role: "restaurant_owner",
        };
        navigate("/restaurant");
        setUser(fetchedOwner);
        setRole("restaurant_owner");
        showNotification({
          title: "Login successful",
          message: `Welcome back, ${fetchedOwner.name}!`,
          color: "green",
        });
        console.log("User set to: ", fetchedOwner);
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
