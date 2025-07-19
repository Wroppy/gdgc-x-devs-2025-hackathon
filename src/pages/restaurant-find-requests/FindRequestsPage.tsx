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
import DesktopNavbar from "../../components/desktop-navbar/DesktopNavbar";
import OfferModal from "./OfferModal";
import { useDisclosure } from "@mantine/hooks";
import type { Status } from "../../types/Status";

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
      <UserRequest
        onClick={() => {}}
        customerRequest={placeholder}
        status="awaiting"
      />
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

  const [openedRequest, setOpenedRequest] = useState<CustomerRequest | null>(
    null
  );
  const [opened, { open, close }] = useDisclosure(false);

  const handleOfferClick = (request: CustomerRequest) => {
    setOpenedRequest(request);
    open();
  };

  const [statuses, setStatuses] = useState<{
    [key: string]: Status;
  }>({});

  // Subscribed to get status
  useEffect(() => {
    const channel = supabase
      .channel("realtime:restaurant_offers")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "restaurant_offers",
        },
        (payload) => {
          const updatedOffer = payload.new as {
            request_id: string;
            status: Status;
          };
          setStatuses((prev) => ({
            ...prev,
            [updatedOffer.request_id]: updatedOffer.status,
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const onModalSubmit = (id: string) => {
    console.log(id, statuses)
    setStatuses((prev) => ({
      ...prev,
      [id]: "sent",
    }));
    console.log(statuses)
  };

  return (
    <>
      <OfferModal
        onSubmit={onModalSubmit}
        request={openedRequest || ({ id: 1 } as CustomerRequest)}
        opened={opened}
        onClose={close}
        offerTime={new Date(
          openedRequest?.preferred_time || ""
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      />
      <Stack>
        <Box>
          <DesktopNavbar heading="Find Customers" />
          <Box pl="sm" pr="sm">
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
          </Box>
        </Box>
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
                  Don't worry, we are working hard to find more requests for
                  you!
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
              <UserRequest
                onClick={() => handleOfferClick(request)}
                key={request.id}
                status={statuses[request.id] || "awaiting"}
                customerRequest={request}
              />
            ))
          )}
        </Box>
      </Stack>
    </>
  );
};

export default FindRequestsPage;
