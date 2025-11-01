"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRegister } from "@/api/auth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/password-input";
import { registerAtom } from "@/lib/atom/register-atom";
import { useAtom } from "jotai";
import Spinner from "@/components/spinner";

const Register = () => {
  const [data, setData] = useAtom(registerAtom);
  const [error, setError] = useState("");

  const { mutate, isPending } = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.email || !data.password || !data.phone) {
      setError("All fields are required.");
      return;
    }
    setError("");

    mutate({ email: data.email, password: data.password, phone: data.phone });
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Create an Account
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Join us by filling out the information below.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+2347040506070"
              value={data.phone}
              onChange={handleChange}
              required
            />
          </div>

          <PasswordInput
            label="Password"
            value={data.password}
            onChange={handleChange}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full my-4">
            {isPending ? <Spinner /> : "Register"}
          </Button>
        </form>
      </div>

      <div className="flex self-center justify-center items-center ">
        <p>
          Already have an account?{" "}
          <Link href={"/login"} className="underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
