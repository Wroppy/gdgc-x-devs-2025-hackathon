import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import supabase from "../../supabase-client";
import UserRequest from "./UserRequest";
import type { CustomerRequest } from "../../types/CustomerRequest";
import {
  Box,
  Center,
  Loader,
  Select,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";

const Skeletons = () => {
  const placeholder = {
    name: "Loading...",
    id: 0,
    group_size: 0,
    created_at: new Date().toISOString(),
    preferred_time: new Date().toISOString(),
    notes: "",
    preferred_cuisines: [],
    preferred_vibes: [],
    budget_lower: 0,
    budget_upper: 0,
  };
  return (
    <Skeleton>
      <UserRequest customerRequest={placeholder} />
    </Skeleton>
  );
};

const FindRequestsPage = () => {
  const { user, role } = useAuth();
  const [loading, setLoading] = useState(true);
  console.log("User:", user);
  console.log("Role:", role);

  const [requests, setRequests] = useState<CustomerRequest[]>([]);

  useEffect(() => {
    supabase
      .from("customer_requests")
      .select("*")
      .then(({ data }) => {
        if (!data) {
          console.error("No data found");
          setLoading(false);
          return;
        }
        setRequests(data?.reverse() as CustomerRequest[]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("realtime:customer_requests")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "customer_requests",
        },
        (payload) => {
          setRequests((prev) => [payload.new as CustomerRequest, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <Stack>
      <Stack p="lg">
        <Text fw={500} size="lg">
          Requests
        </Text>
        <Select
          label="Sort by"
          clearable
          data={[
            { value: "group-size", label: "Group Size" },
            { value: "distance", label: "Distance" },
            { value: "time-posted", label: "Time Posted" },
          ]}
          placeholder="Select sorting option"
        />
      </Stack>
      <Box>
        {loading ? (
          <>
            <Skeletons />
            <Skeletons />
            <Skeletons />
            <Skeletons />
            <Skeletons />
          </>
        ) : requests.length === 0 && !loading ? (
          <Center>
            <Stack>
              <Text ta="center">No requests currently found.</Text>
              <Text ta="center">
                Don't worry, we are working hard to find more requests for you!
              </Text>
              <Center>
                <Loader />
              </Center>
            </Stack>
            <Box></Box>
          </Center>
        ) : requests.length === 0 ? (
          <div>None!</div>
        ) : (
          requests.map((request) => (
            <UserRequest key={request.id} customerRequest={request} />
          ))
        )}
      </Box>
    </Stack>
  );
};

export default FindRequestsPage;
