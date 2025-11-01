import { useMutation, useQuery } from "@tanstack/react-query";
import { client, onError, TResponse } from "./api-client";

export type TPaymentMethod = "wallet" | "card" | "bank_transfer" | "cash";
export type TPaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type TOrderItemStatus =
  | "pending"
  | "shipped"
  | "refunded"
  | "confirmed"
  | "delivered"
  | "cancelled"
  | "processing";

export type TCreateOrderBody = {
  email: string;
  name: string;
  phone: string;
  shippingAddress: string;
  billingAddress?: string;
  notes?: string;
  paymentProvider: string;
  paymentMethod?: string;
  shippingMethodId?: string;
  useEscrow?: boolean;
};

export type TCreatePaymentDetailsBody = {
  paymentProvider: string;
  paymentMethod: string;
  amount: number;
  fees?: number;
  netAmount: number;
  externalTransactionId?: string;
  externalReference?: string;
  isEscrow?: boolean;
  status?: TPaymentStatus;
};

export type TUpdatePaymentStatusBody = {
  status: string;
  gatewayResponse?: any;
};

export type TUpdateOrderStatusBody = {
  status: string;
};

export type TUpdateOrderItemStatusBody = {
  status: TOrderItemStatus;
  notes?: string;
};

export type TDispatchOrderBody = {
  trackingNumber?: string;
  carrier?: string;
};

export type TMarkDeliveredBody = {
  deliveryNotes?: string;
};

// actions
const createOrder = async (body: TCreateOrderBody) => {
  const res = await client.post("/order/checkout", body);
  return res.data;
};

const acceptOrder = async (orderId: any) => {
  const res = await client.put(`/order/${orderId}/store/accept`);
  return res.data;
};

const rejectOrder = async (itemId: any) => {
  const res = await client.put(`/order/${itemId}/store/reject`);
  return res.data;
};

const acceptOrderItem = async (itemId: any) => {
  const res = await client.put(`/order/store/item/${itemId}/accept`);
  return res.data;
};

const rejectOrderItem = async (itemId: any) => {
  const res = await client.put(`/order/store/item/${itemId}/reject`);
  return res.data;
};

const getStoreOrders = async () => {
  const res = await client.get<TResponse<any>>(`/order/store`);
  return res.data.data;
};

const getOrderById = async (orderId: any) => {
  const res = await client.get<TResponse<any>>(`/order/${orderId}`);
  return res.data.data;
};

const getStoreOrderById = async (orderId: any) => {
  const res = await client.get<TResponse<any>>(`/order/${orderId}/store`);
  return res.data.data;
};

const getStoreOrderItems = async () => {
  const res = await client.get<TResponse<any>>(`/order/store/item`);
  return res.data.data;
};

const getMyOrders = async () => {
  const res = await client.get<TResponse<any>>(`/order`);
  return res.data.data;
};

const updateOrderStatus = async (
  orderId: any,
  body: TUpdateOrderStatusBody
) => {
  const res = await client.put(`/order/${orderId}/status`, body);
  return res.data;
};

const cancelOrder = async (orderId: any) => {
  const res = await client.put(`/order/${orderId}/cancel`);
  return res.data;
};

const dispatchOrder = async (orderId: any, body: TDispatchOrderBody) => {
  const res = await client.put(`/order/${orderId}/store/dispatch`, body);
  return res.data;
};

const deliveredOrder = async (orderId: any, body: TMarkDeliveredBody) => {
  const res = await client.put(`/order/${orderId}/delivered`, body);
  return res.data;
};

const updateOrderItemStatus = async (
  itemId: any,
  body: TUpdatePaymentStatusBody
) => {
  const res = await client.put(`/order/item/${itemId}/status`, body);
  return res.data;
};

const getOrderTimeine = async (orderId: string) => {
  const res = await client.get<TResponse<any>>(`/order/${orderId}/timeline`);
  return res.data.data;
};

const getOrderAnalytics = async () => {
  const res = await client.get<TResponse<any>>(`/order/analytiscs`);
  return res.data.data;
};

const createPaymentDetails = async (
  orderId: any,
  body: TCreatePaymentDetailsBody
) => {
  const res = await client.post(`/order/${orderId}/payment`, body);
  return res.data;
};

const updatePaymentStatus = async (
  paymentId: any,
  body: TUpdatePaymentStatusBody
) => {
  const res = await client.put(`/order/payment/${paymentId}/status`, body);
  return res.data;
};

const releaseEscrow = async (paymentId: string) => {
  const res = await client.put(`/order/payment/${paymentId}/release-escorw`);
  return res.data;
};

// hooks
export const useCreateOrder = () => {
  return useMutation({
    onError,
    mutationFn: ({ body }: { body: TCreateOrderBody }) => createOrder(body),
  });
};

export const useAcceptOrder = () => {
  return useMutation({
    onError,
    mutationFn: ({ orderId }: { orderId: any }) => acceptOrder(orderId),
  });
};

export const useRejectOrder = () => {
  return useMutation({
    onError,
    mutationFn: ({ orderId }: { orderId: any }) => rejectOrder(orderId),
  });
};

export const useAcceptOrderItem = () => {
  return useMutation({
    onError,
    mutationFn: ({ itemId }: { itemId: any }) => acceptOrderItem(itemId),
  });
};

export const useRejectOrderItem = () => {
  return useMutation({
    onError,
    mutationFn: ({ itemId }: { itemId: any }) => rejectOrderItem(itemId),
  });
};

export const useGetStoreOrders = () => {
  return useQuery({
    queryKey: ["store-orders"],
    queryFn: () => getStoreOrders(),
  });
};

export const useGetOrderById = ({ orderId }: { orderId: any }) => {
  return useQuery({
    queryKey: ["order-id", orderId],
    queryFn: () => getOrderById(orderId),
  });
};

export const useGetStoreOrderById = ({ orderId }: { orderId: any }) => {
  return useQuery({
    queryKey: ["store-order-id", orderId],
    queryFn: () => getStoreOrderById(orderId),
  });
};

export const useGetMyOrders = () => {
  return useQuery({
    queryKey: ["my-orders"],
    queryFn: () => getMyOrders(),
  });
};

export const useGetStoreOrderItems = () => {
  return useQuery({
    queryKey: ["store-order-items"],
    queryFn: () => getStoreOrderItems(),
  });
};

export const useUpdateOrderStatus = () => {
  return useMutation({
    onError,
    mutationFn: ({
      orderId,
      body,
    }: {
      orderId: any;
      body: TUpdateOrderStatusBody;
    }) => updateOrderStatus(orderId, body),
  });
};

export const useCancelOrder = () => {
  return useMutation({
    onError,
    mutationFn: ({ orderId }: { orderId: any }) => cancelOrder(orderId),
  });
};

export const useDispatchOrder = () => {
  return useMutation({
    onError,
    mutationFn: ({
      orderId,
      body,
    }: {
      orderId: any;
      body: TDispatchOrderBody;
    }) => dispatchOrder(orderId, body),
  });
};

export const useDeliveredOrder = () => {
  return useMutation({
    onError,
    mutationFn: ({
      orderId,
      body,
    }: {
      orderId: any;
      body: TMarkDeliveredBody;
    }) => deliveredOrder(orderId, body),
  });
};

export const useUpdateOrderItemStatus = () => {
  return useMutation({
    onError,
    mutationFn: ({
      itemId,
      body,
    }: {
      itemId: any;
      body: TUpdateOrderItemStatusBody;
    }) => updateOrderItemStatus(itemId, body),
  });
};

export const useGetOrderTimeine = ({ orderId }: { orderId: any }) => {
  return useQuery({
    queryKey: ["order-timeline"],
    queryFn: () => getOrderTimeine(orderId),
  });
};

export const useGetOrderAnalytics = () => {
  return useQuery({
    queryKey: ["order-analytics"],
    queryFn: () => getOrderAnalytics(),
  });
};

export const useCreatePaymentDetails = () => {
  return useMutation({
    onError,
    mutationFn: ({
      orderId,
      body,
    }: {
      orderId: any;
      body: TCreatePaymentDetailsBody;
    }) => createPaymentDetails(orderId, body),
  });
};

export const useUpdatePaymentStatus = () => {
  return useMutation({
    onError,
    mutationFn: ({
      paymentId,
      body,
    }: {
      paymentId: any;
      body: TUpdatePaymentStatusBody;
    }) => updatePaymentStatus(paymentId, body),
  });
};

export const useReleaseEscrow = () => {
  return useMutation({
    onError,
    mutationFn: ({ paymentId }: { paymentId: any }) => releaseEscrow(paymentId),
  });
};
