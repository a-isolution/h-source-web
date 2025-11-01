"use client";

import { useHealthCheck, useLogin } from "@/api/auth";
import Spinner from "@/components/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/password-input";

const Login = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      { password: password, phone: phone },
      { onSuccess: () => router.push("/dashboard") }
    );
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Login to Your Account
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Please enter your credentials to continue.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+2347040506070"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <PasswordInput
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-end my-6">
            <a
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              Forgot Password?
            </a>
          </div>

          <Button type="submit" className="w-full items-center">
            {isPending ? <Spinner /> : "Login"}
          </Button>
        </form>
      </div>

      <div className="flex self-center justify-center items-center ">
        <p>
          Dont have an account?{" "}
          <Link href={"/register"} className="underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
