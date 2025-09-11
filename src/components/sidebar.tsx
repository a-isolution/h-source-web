// Sidebar.tsx
"use client";

import React from "react";
import {
  Home,
  ShoppingCart,
  MessageSquare,
  Settings,
  X,
  Layers,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useGetAuth } from "@/api/auth";
import { useGetStoreById, useUpdateStore } from "@/api/store";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useGetAuth();
  const storeId = data?.store.id || null;
  const { data: store } = useGetStoreById({ storeId });
  const [isOnline, setIsOnline] = React.useState(store?.isOnline);

  const qc = useQueryClient();
  const { mutate: updateStore } = useUpdateStore();
  const toggleStoreOnline = () => {
    updateStore(
      { storeId: store?.id, body: { isOnline: !isOnline } },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: ["store-id", storeId] });
          toast.success(`Store online status updated`);
          setIsOnline((prev: any) => !prev);
        },
      }
    );
  };

  React.useEffect(() => {
    if (store?.isOnline !== undefined) {
      setIsOnline(store.isOnline);
    }
  }, [store?.isOnline]);

  const menuItems = [
    { label: "Dashboard", icon: Home, to: "/dashboard" },
    { label: "Products", icon: Layers, to: "/products" },
    { label: "Orders", icon: ShoppingCart, to: "/orders" },
    // { label: "Messages", icon: MessageSquare, to: "/messages" },
    { label: "Settings", icon: Settings, to: "/settings" },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen max-h-screen bg-white border-r border-stone-100 transform transition-transform z-50 w-56 flex flex-col
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:top-0 md:left-0
  `}
    >
      {/* Mobile close button */}
      <div className="md:hidden flex justify-end p-4 border-b border-stone-100">
        <button onClick={() => setIsOpen(false)} className="text-gray-700">
          <X size={24} />
        </button>
      </div>

      {/* Logo (only on md+) */}
      <div className="hidden md:flex items-center gap-4 p-4">
        <Image
          width={12}
          height={12}
          src="/app-logo.svg"
          alt="logo"
          className="h-12 w-12"
        />
        <div className="flex flex-col gap-2">
          <Image
            width={12}
            height={12}
            src="/h-source.svg"
            alt="logo"
            className="w-auto h-auto"
          />
          <span className="font-medium text-[#A7A7A7] text-[13px]">
            Vendor Marketplace
          </span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname.includes(item.to);
          return (
            <button
              key={item.label}
              onClick={() => handleNavigation(item.to)}
              className={`w-full flex items-center gap-3 p-2 rounded-md font-medium text-sm text-left hover:bg-gray-100 transition ${
                isActive ? "text-black bg-[#ADF802]" : "text-gray-700"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Store toggle (top) */}
      <div className="p-4 border-b border-stone-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`p-1.5 rounded-full ${
              isOnline ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                isOnline ? "bg-green-500" : "bg-red-500"
              }`}
            />
          </div>
          <span className="text-sm text-gray-700">
            {isOnline ? "Store Online" : "Store Offline"}
          </span>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isOnline}
            onChange={toggleStoreOnline}
            className="sr-only peer"
          />
          <div className="w-10 h-5 bg-gray-200 rounded-full peer-checked:bg-green-500 transition-colors"></div>
          <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform"></div>
        </label>
      </div>
    </aside>
  );
};
