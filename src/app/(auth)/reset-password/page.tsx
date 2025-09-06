"use client";

import { useAtom } from "jotai";
import React, { useState } from "react";
import Spinner from "@/components/spinner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPassword } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/password-input";
import { forgotPasswordAtom } from "@/lib/atom/forgot-password-atom";

const ResetPassword = () => {
  const router = useRouter();
  const [codeInput, setCodeInput] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [forgotState] = useAtom(forgotPasswordAtom);
  const { mutate, isPending } = useResetPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (resetPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    mutate(
      {
        identifier: forgotState.email,
        code: codeInput,
        password: resetPassword,
      },
      {
        onSuccess: () => router.push("/login"),
        onError: () => setError("Failed to reset password. Please try again."),
      }
    );
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Reset Password
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Please enter the code and your new password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="code">Verification Code</Label>
          <Input
            id="code"
            type="text"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            required
          />
        </div>

        <PasswordInput
          label="Password"
          value={resetPassword}
          onChange={(e) => setResetPassword(e.target.value)}
        />

        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" className="w-full items-center mt-6">
          {isPending ? <Spinner /> : "Reset Password"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
