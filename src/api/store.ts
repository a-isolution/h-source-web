import { useMutation, useQuery } from "@tanstack/react-query";
import { client, onError, TResponse } from "./api-client";

export type TCreateStoreBody = {
  name?: string;
  description?: string;
  address?: string;
  phone?: string;
  isOnline?: boolean;
  offerDeliveryService?: boolean;
  deliveryRadius?: string | number;
  deliveryFee?: string | number;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  payoutSchedule?: string;
  availability?: {
    name: string;
    from: string;
    to: string;
    active: boolean;
  }[];
};

// actions
const createStore = async (body: TCreateStoreBody) => {
  const res = await client.post("/store", body);
  return res.data;
};

const updateStore = async (body: TCreateStoreBody, storeId: any) => {
  const res = await client.put(`/store/${storeId}`, body);
  return res.data;
};

const getStoreById = async ({ storeId }: { storeId: any }) => {
  const res = await client.get<TResponse<any>>(`/store/${storeId}`);
  return res.data.data;
};

// hooks
export const useCreateStore = () => {
  return useMutation({
    onError,
    mutationFn: ({ body }: { body: TCreateStoreBody }) => createStore(body),
  });
};

export const useUpdateStore = () => {
  return useMutation({
    onError,
    mutationFn: ({ body, storeId }: { body: TCreateStoreBody; storeId: any }) =>
      updateStore(body, storeId),
  });
};

export const useGetStoreById = ({ storeId }: { storeId?: any }) => {
  return useQuery({
    queryKey: ["store-id", storeId],
    queryFn: () => getStoreById({ storeId }),
    enabled: !!storeId,
  });
};
