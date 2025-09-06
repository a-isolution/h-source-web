import { useMutation, useQuery } from "@tanstack/react-query";
import { client, onError, TResponse } from "./api-client";
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

const updateProfle = async (body: any) => {
  const res = await client.put("/auth/profile", body);
  return res.data.data;
};

const updateAvatar = async (body: TVerifyPhone) => {
  const res = await client.put("/auth/avatar", body);
  return res.data.data;
};

const register = async (body: TRegisterBody) => {
  const res = await client.post("/auth/create", body);
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

const resetPasswordCode = async (body: TResetPasswordCodeBoy) => {
  const res = await client.post("/auth/password/reset/code", body);
  return res.data.data;
};

// const verifyResetCode = async () => {
//   const res = await client.post("/auth/logout");
//   return res.data.data;
// };

const resetPassword = async (body: TResetPasswordBody) => {
  const res = await client.post("/auth/password/reset", body);
  return res.data.data;
};

const verifyEmailCode = async (body: TVerifyEmailCode) => {
  const res = await client.post("/auth/verify/email/code", body);
  return res.data.data;
};

const verifyEmail = async (body: TVerifyEmail) => {
  const res = await client.post("/auth/verify/email", body);
  return res.data.data;
};

const verifyPhoneCode = async (body: TVerifyPhoneCode) => {
  const res = await client.post("/auth/verify/phone/code", body);
  return res.data.data;
};

const verifyPhone = async (body: TVerifyPhone) => {
  const res = await client.post("/auth/verify/phone", body);
  return res.data.data;
};

// hooks
export const useGetAuth = ({ enabled }: TGetAuth = { enabled: false }) => {
  return useQuery({ enabled, queryKey: ["auth"], queryFn: () => getAuth() });
};

export const useUpdateProfile = () => {
  return useMutation({
    onError,
    mutationFn: (body: any) => updateProfle(body),
  });
};

export const useUpdateAvatar = () => {
  return useMutation({
    onError,
    mutationFn: (body: any) => updateAvatar(body),
  });
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

export const useRegister = () => {
  return useMutation({
    onError,
    mutationFn: (body: TRegisterBody) => register(body),
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

export const useResetPasswordCode = () => {
  return useMutation({
    onError,
    mutationFn: (body: TResetPasswordCodeBoy) => resetPasswordCode(body),
  });
};

export const useResetPassword = () => {
  return useMutation({
    onError,
    mutationFn: (body: TResetPasswordBody) => resetPassword(body),
  });
};

export const useVerifyEmailCode = () => {
  return useMutation({
    onError,
    mutationFn: (body: TVerifyEmailCode) => verifyEmailCode(body),
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    onError,
    mutationFn: (body: TVerifyEmail) => verifyEmail(body),
  });
};

export const useVerifyPhoneCode = () => {
  return useMutation({
    onError,
    mutationFn: (body: TVerifyPhoneCode) => verifyPhoneCode(body),
  });
};

export const useVerifyPhone = () => {
  return useMutation({
    onError,
    mutationFn: (body: TVerifyPhone) => verifyPhone(body),
  });
};

// types
export type TGetAuth = { enabled?: boolean };
export type TLoginBody = { phone: string; password: string };
export type TRegisterBody = { email: string; phone: string; password: string };
export type TResetPasswordCodeBoy = { identifier: string };
export type TResetPasswordBody = {
  identifier: string;
  code: string;
  password: string;
};
export type TVerifyEmailCode = { email: string };
export type TVerifyEmail = { email: string; code: string };
export type TVerifyPhoneCode = { phone: string };
export type TVerifyPhone = { phone: string; code: string };
