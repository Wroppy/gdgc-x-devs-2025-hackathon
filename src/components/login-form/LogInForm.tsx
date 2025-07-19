import {
  Button,
  Center,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useState, type FormEvent } from "react";
import { IconLock, IconMail } from "@tabler/icons-react";
import styles from "./login-form.module.css";

type Props = {
  login?: (email: string, password: string) => Promise<void>;
};

const LogInForm = ({ login }: Props) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    // LOGIC FOR LOGIN
    // PARENT PASSES IN ONSUBMIT FUNCTION
    if (login) {
      await login(email, password);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="sm">
        <div>
          <Center>
            <Text size="lg" fw={500}>
              Login to your account
            </Text>
          </Center>

          <Center>
            <Text c="dimmed" size="sm">
              Enter your email and password to log in.
            </Text>
          </Center>
        </div>
        <Stack gap="sm">
          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            type="email"
            disabled={loading}
            leftSection={<IconMail size={14} />}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            disabled={loading}
            leftSection={<IconLock size={14} />}
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Button fullWidth type="submit" loading={loading}>
            Continue
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default LogInForm;
