import { useMutation, useQuery } from "@tanstack/react-query";
import { client, onError, onSuccess, TResponse } from "./api-client";
import { useRouter } from "next/navigation";
import { clearToken, TOKEN_KEY } from "@/lib/auth";
import { toast } from "sonner";

export const prepareRequestHeader = (token: string) => {
  const authHeader = token ? `Bearer ${token}` : null;
  client.defaults.headers.common.Authorization = authHeader;
};

// actions
const getAuth = async () => {
  const res = await client.get<TResponse<any>>("/auth");
  return res.data.data;
};

const login = async (body: TLoginBody) => {
  const res = await client.post("/auth/login", body);
  return res.data.data;
};

const logout = async () => {
  const res = await client.post("/auth/logout");
  return res.data.data;
};

// hooks
export const useGetAuth = ({ enabled }: TGetAuth = { enabled: false }) => {
  return useQuery({ enabled, queryKey: ["auth"], queryFn: () => getAuth() });
};

export const useLogin = () => {
  return useMutation({
    onError,
    mutationFn: (body: TLoginBody) => login(body),
    onSuccess: (data) => {
      const msg = data?.message || "Logged in";
      const token = data?.token;

      toast.success(msg);
      prepareRequestHeader(token);
      localStorage.setItem(TOKEN_KEY, token);
    },
  });
};

export const useLogout = () => {
  const id = "auth";
  const router = useRouter();

  const handleLogout = () => {
    clearToken();
    router.push("/login");
  };

  return useMutation({
    mutationFn: logout,
    onError: () => {
      onError(null);
      handleLogout();
    },
    onSuccess: () => {
      handleLogout();
      toast.success("Logged out");
    },
  });
};

// types
export type TGetAuth = { enabled?: boolean };
export type TLoginBody = { phone: string; password: string };
