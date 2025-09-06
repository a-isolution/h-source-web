"use client";

import { useAtom } from "jotai";
import React, { useState } from "react";
import Spinner from "@/components/spinner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useResetPasswordCode } from "@/api/auth";
import { forgotPasswordAtom } from "@/lib/atom/forgot-password-atom";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [, setForgotState] = useAtom(forgotPasswordAtom);

  const { mutate, isPending } = useResetPasswordCode();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setForgotState((prev) => ({
      ...prev,
      email: email,
    }));

    mutate(
      { identifier: email },
      { onSuccess: () => router.push("/reset-password") }
    );
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Reset Password
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Please enter your credentials to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full items-center mt-6">
          {isPending ? <Spinner /> : " Send Reset Link"}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
