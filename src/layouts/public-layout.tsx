"use client";

import React from "react";
import { useGetAuth } from "@/api/auth";
import { useRouter } from "next/navigation";
import PageLoader from "@/components/page-loader";
import { getToken } from "@/lib/auth";

type Props = { children: React.ReactNode };

const PublicAuthLayout = ({ children }: Props) => {
  const router = useRouter();
  const token = getToken();

  const [hasMounted, setHasMounted] = React.useState(false);
  const { data, isPending } = useGetAuth({ enabled: !!token });

  const noToken = !token;
  const isLoggedIn = token && data?.id;
  const isLoading = !!token && isPending;

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  React.useEffect(() => {
    if (isLoading || noToken) return;
    if (data?.id) router.push("/dashboard");
  }, [data?.id, router, noToken, isLoading]);

  if (!hasMounted || isLoggedIn || isLoading) return <PageLoader />;

  return children;
};

export default PublicAuthLayout;
