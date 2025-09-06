import axios from "axios";
import { toast } from "sonner";
import { clearToken, getToken } from "@/lib/auth";

const DEFAULT_ERROR_MESSAGE = "An error occured";

export type TResponse<T> = { data: T; message: string };

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const client = axios.create({ baseURL: `${baseURL}/api/v1` });

export const onError = (error: any) => {
  const err = error.response?.data?.message;

  let msg = !!err ? (Array.isArray(err) ? err[0] : err) : DEFAULT_ERROR_MESSAGE;
  if (msg) toast.error(msg);
};

export const onMutate = (msg: string, id?: string) => {
  toast.loading(msg, { id });
};

export const onSuccess = (id?: string, msg?: string) => {
  toast.success(msg || "Success", { id });
};

client.interceptors.request.use(async (config) => {
  const token = getToken();

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response.status !== 401) throw error;
    // await logout();
    clearToken();
  }
);
