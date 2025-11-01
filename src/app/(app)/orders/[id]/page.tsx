"use client";

import { useGetStoreOrderById } from "@/api/order";
import { useParams } from "next/navigation";
import React from "react";

const OrderDetailsPage = () => {
  const params = useParams();
  const orderId = params?.id as string;

  const { data } = useGetStoreOrderById({ orderId });
  console.log(orderId, data);

  return <div>OrderDetailsPage</div>;
};

export default OrderDetailsPage;
