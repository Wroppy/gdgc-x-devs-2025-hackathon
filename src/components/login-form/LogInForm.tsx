import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
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
      <div>
        <div>
          <div>
            Log In
          </div>
        </div>
        <div>
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
          <Group justify="flex-end">
            <div>Create an account</div>
          </Group>
          <Button type="submit" loading={loading}>
            Login
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LogInForm;
