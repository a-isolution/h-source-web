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
import { UserRound } from "lucide-react";

export const UserProfile: React.FC = () => {
  const router = useRouter();
  const { mutate: logoutUser } = useLogout();

  // const handleProfile = () => router.push("/settings/profile");
  const handleSettings = () => router.push("/settings");
  const handleLogout = () => logoutUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserRound className="h-9 w-9 rounded-full border cursor-pointer p-1.5 bg-green-100 text-gray-700" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* <DropdownMenuItem onClick={handleProfile}>Profile</DropdownMenuItem> */}

        <DropdownMenuItem onClick={handleSettings}>Settings</DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
