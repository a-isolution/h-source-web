import { useMutation, useQuery } from "@tanstack/react-query";
import { client, onError, TResponse } from "./api-client";

// actions
const createProduct = async (body: TCreateProductBody) => {
  const res = await client.post("/product", body);
  return res.data;
};

const getMyProducts = async ({ params }: { params: GetMyProductsParams }) => {
  const { page, pageSize, query, type } = params;
  const res = await client.get<TResponse<any>>(
    `/product/vendor?page=${page}&pageSize=${pageSize}`
  );
  return res.data.data;
};

// hooks
export const useCreateProduct = () => {
  return useMutation({
    onError,
    mutationFn: ({ body }: { body: TCreateProductBody }) => createProduct(body),
  });
};

export const useGetMyProducts = ({
  params,
}: {
  params: GetMyProductsParams;
}) => {
  return useQuery({
    queryKey: ["my-products"],
    queryFn: () => getMyProducts({ params }),
  });
};

// types
export type TCreateProductBody = {
  name: string;
  description: string;
  price: string;
  currencyId: string;
  brandId: string;
  categoryId: string;
  isFeatured: boolean;
  isActive: boolean;
  stockQuantity: number;
  files: any;
};

export interface GetMyProductsParams {
  page: number;
  pageSize: number;
  query?: string;
  type?: string;
}
