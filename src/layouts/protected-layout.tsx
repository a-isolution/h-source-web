"use client";

import React from "react";
import { getToken } from "@/lib/auth";
import { useGetAuth } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PageLoader from "@/components/page-loader";

type Props = { children: React.ReactNode };

const ProtectedLayout = ({ children }: Props) => {
  const router = useRouter();
  const token = getToken();
  const { data, isPending } = useGetAuth({ enabled: !!token });

  const isEnabled = !!token;
  const loading = isEnabled && isPending;

  React.useEffect(() => {
    if (loading) return;
    if (!data?.id) router.push("/");
  }, [data?.id, router, loading]);

  if (!token || loading) return <PageLoader />;

  console.log(token, "token in protected layout");

  return children;
};

export default ProtectedLayout;
