import { useMutation, useQuery } from "@tanstack/react-query";
import { client, onError, TResponse } from "./api-client";

// actions
const createProduct = async (body: TCreateProductBody) => {
  const res = await client.post("/product", body);
  return res.data;
};

const updateProduct = async (body: TCreateProductBody, productId: any) => {
  const res = await client.put(`/product/${productId}`, body);
  return res.data;
};

const deleteProduct = async (productId: any) => {
  const res = await client.delete(`/product/${productId}`);
  return res.data;
};

const getMyProducts = async ({ params }: { params: GetProductsParams }) => {
  const { page, pageSize, query, categoryId, brandId, isActive, isFeatured } =
    params;
  // Build query params object conditionally
  const queryParams: Record<string, any> = {
    q: query || "",
    page,
    pageSize,
  };

  if (categoryId) queryParams.categoryId = categoryId;
  if (brandId) queryParams.brandId = brandId;
  if (typeof isActive !== "undefined") queryParams.isActive = isActive;
  if (typeof isFeatured !== "undefined") queryParams.isFeatured = isFeatured;

  const searchParams = new URLSearchParams(queryParams).toString();

  const res = await client.get<TResponse<any>>(
    `/product/store?${searchParams}`
  );

  return res.data.data;
};

const getProductById = async ({ productId }: { productId: any }) => {
  const res = await client.get<TResponse<any>>(`/product/${productId}`);
  return res.data.data;
};

const getProductSizes = async () => {
  const res = await client.get<TResponse<any>>(
    `/catalog/size?q&page=1&pageSize=100&isActive=1`
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

export const useUpdateProduct = () => {
  return useMutation({
    onError,
    mutationFn: ({
      body,
      productId,
    }: {
      body: TCreateProductBody;
      productId: any;
    }) => updateProduct(body, productId),
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    onError,
    mutationFn: ({ productId }: { productId: any }) => deleteProduct(productId),
  });
};

export const useGetMyProducts = ({ params }: { params: GetProductsParams }) => {
  return useQuery({
    queryKey: ["my-products", params],
    queryFn: () => getMyProducts({ params }),
  });
};

export const useGetProductById = ({ productId }: { productId?: any }) => {
  return useQuery({
    queryKey: ["product-id", productId],
    queryFn: () => getProductById({ productId }),
    enabled: !!productId,
  });
};

export const useGetProductSizes = () => {
  return useQuery({
    queryKey: ["product-size"],
    queryFn: () => getProductSizes(),
  });
};

// types
export type TCreateProductBody = {
  name: string;
  description: string;
  price: any;
  currencyId: string;
  brandId: string;
  categoryId: string;
  isFeatured: boolean;
  isActive: boolean;
  stockQuantity: number;
  files: any;
};

export interface GetProductsParams {
  page: number;
  pageSize: number;
  query?: string;
  categoryId?: any;
  brandId?: any;
  isActive?: any;
  isFeatured?: any;
}
