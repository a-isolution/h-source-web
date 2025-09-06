"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useLogout } from "@/api/auth";

export const UserProfile: React.FC = () => {
  const router = useRouter();
  const { mutate: logoutUser } = useLogout();

  const handleProfile = () => {
    console.log("Profile");
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  const handleLogout = () => logoutUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img
          src="/user-avatar.svg"
          alt="user"
          className="h-8 w-8 rounded-full border cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfile}>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={handleSettings}>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
