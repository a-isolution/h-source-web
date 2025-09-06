import { useMutation, useQuery } from "@tanstack/react-query";
import { client, onError, TResponse } from "./api-client";

// actions
const createBrand = async (body: TCreateBrandBody) => {
  const res = await client.post("/catalog/brand", body);
  return res.data;
};

const getBrands = async () => {
  const res = await client.get<TResponse<any>>(
    "/catalog/brand?q&page=1&pageSize=100&isActive=1"
  );
  return res.data.data;
};

// hooks
export const useCreateBrand = () => {
  return useMutation({
    onError,
    mutationFn: ({ body }: { body: TCreateBrandBody }) => createBrand(body),
  });
};

export const useGetBrands = () => {
  return useQuery({ queryKey: ["brands"], queryFn: () => getBrands() });
};

// types
export type TCreateBrandBody = {
  name: string;
  description: string;
  file: any;
};
