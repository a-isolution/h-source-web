import { useQuery } from "@tanstack/react-query";
import { client, TResponse } from "./api-client";

// actions
const getCurrencies = async () => {
  const res = await client.get<TResponse<any>>(
    "/currency?q=&page=1&pageSize=50"
  );
  return res.data.data;
};

// hooks
export const useGetCurrencies = () => {
  return useQuery({ queryKey: ["currencies"], queryFn: () => getCurrencies() });
};
