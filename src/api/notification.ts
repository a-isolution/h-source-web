import { useMutation, useQuery } from "@tanstack/react-query";
import { client, onError, TResponse } from "./api-client";

// actions
const getNotifications = async () => {
  const res = await client.get<TResponse<any>>("/notification");
  return res.data.data;
};

const getNotificationSettings = async () => {
  const res = await client.get<TResponse<any>>("/notification/settings");
  return res.data.data;
};

const updateNotificationSettings = async (body: any) => {
  const res = await client.put("/notification/settings", body);
  return res.data.data;
};

// hooks
export const useGetNotifications = () => {
  return useQuery({
    queryKey: ["notification"],
    queryFn: () => getNotifications(),
  });
};

export const useGetNotificationSettings = () => {
  return useQuery({
    queryKey: ["notification-settings"],
    queryFn: () => getNotificationSettings(),
  });
};

export const useUpdateNotificationSettings = () => {
  return useMutation({
    onError,
    mutationFn: (body: any) => updateNotificationSettings(body),
  });
};
