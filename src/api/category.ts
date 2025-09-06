import { useMutation, useQuery } from "@tanstack/react-query";
import { client, onError, TResponse } from "./api-client";

// actions
const createCategory = async (body: TCreateCategoryBody) => {
  const res = await client.post("/catalog/brand", body);
  return res.data;
};

const getCategories = async () => {
  const res = await client.get<TResponse<any>>(
    "/catalog/category?q&page=1&pageSize=100&isActive=1"
  );
  return res.data.data;
};

// hooks
export const useCreateCategory = () => {
  return useMutation({
    onError,
    mutationFn: ({ body }: { body: TCreateCategoryBody }) =>
      createCategory(body),
  });
};

export const useGetCategories = () => {
  return useQuery({ queryKey: ["categories"], queryFn: () => getCategories() });
};

// types
export type TCreateCategoryBody = {
  name: string;
  description: string;
};
