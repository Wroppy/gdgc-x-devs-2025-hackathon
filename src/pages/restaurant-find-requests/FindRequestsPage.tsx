import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import supabase from "../../supabase-client";
import UserRequest from "./UserRequest";
import type { CustomerRequest } from "../../types/CustomerRequest";

type Props = {};

const FindRequestsPage = (props: Props) => {
  const { user, role } = useAuth();
  console.log("User:", user);
  console.log("Role:", role);

  const [requests, setRequests] = useState<CustomerRequest[]>([]);

  useEffect(() => {
    supabase.from("customer_requests").select("*").then(({data}) => {
      setRequests(data as CustomerRequest[]);
    })
  }, [])


  const s = supabase
    .from("customer_requests")
    .on("INSERT", (payload) => {
      setRequests((prevRequests) => [...prevRequests, payload.new as unknown as any]);
    })
    .subscribe();

  return <div>
    {requests.map((request) => (
      <UserRequest key={request.id} customerRequest={request} />
    ))}
  </div>;
};

export default FindRequestsPage;
