"use client";

import React, { useState, useRef, useEffect } from "react";
import { Store, Clock, Truck, CreditCard, Pencil, User2 } from "lucide-react";
import {
  BusinessHours,
  DeliveryPreferences,
  PaymentInformation,
  StoreDetails,
  UserProfile,
} from "@/components/settings/containers";
import { useGetAuth } from "@/api/auth";
import { useGetStoreById } from "@/api/store";

const Settings = () => {
  const { data } = useGetAuth();
  const storeId = data?.store.id || null;

  const { data: store } = useGetStoreById({ storeId });

  const [openUserIndex, setOpenUserIndex] = useState<number | null>(0);
  const [openStoreIndex, setOpenStoreIndex] = useState<number | null>(null);

  const userContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const storeContentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleUserSection = (index: number) => {
    setOpenUserIndex(openUserIndex === index ? null : index);
  };

  const toggleStoreSection = (index: number) => {
    setOpenStoreIndex(openStoreIndex === index ? null : index);
  };

  return (
    <div className="w-full h-full">
      <div className="mb-6">
        <h1 className="text-xl font-medium">Settings</h1>
        <span className="font-medium text-[#A7A7A7] text-sm">
          Customize your store preferences and configurations
        </span>
      </div>

      <main className="w-full mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            User Information
          </h2>
          <p className="text-sm text-gray-500">
            Your personal details and contact information.
          </p>
        </div>
        <div className="w-full sm:w-full lg:w-[60%] rounded-xl my-6 shadow-sm divide-y divide-stone-200">
          {[
            {
              title: "User Profile",
              icon: User2,
              content: <UserProfile user={data} />,
            },
          ].map((setting, index) => {
            const isOpen = openUserIndex === index;
            return (
              <div key={index} className="transition">
                <div
                  className="flex items-center px-4 justify-between py-5 hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => toggleUserSection(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-gray-100">
                      <setting.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="font-medium text-gray-800">
                      {setting.title}
                    </span>
                  </div>
                  <Pencil className="h-4 w-4 text-gray-600" />
                </div>

                <div
                  ref={(el: any) => (userContentRefs.current[index] = el)}
                  style={{
                    maxHeight: isOpen
                      ? userContentRefs.current[index]?.scrollHeight + "px"
                      : "0px",
                    opacity: isOpen ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.5s ease, opacity 0.5s ease",
                    borderTop: "1px solid #f3f4f6",
                  }}
                >
                  {setting.content}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <main className="mb-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Store Information
          </h2>
          <p className="text-sm text-gray-500">
            Details about your store including name, address, and delivery
            options.
          </p>
        </div>
        <div className="bg-white w-full lg:w-[60%] rounded-xl my-6 shadow-sm divide-y divide-stone-200">
          {[
            {
              title: "Store Details",
              icon: Store,
              content: <StoreDetails store={store} storeId={storeId} />,
            },
            {
              title: "Business Hours",
              icon: Clock,
              content: <BusinessHours store={store} storeId={storeId} />,
            },
            {
              title: "Delivery Preferences",
              icon: Truck,
              content: <DeliveryPreferences store={store} storeId={storeId} />,
            },
            {
              title: "Payment Information",
              icon: CreditCard,
              content: <PaymentInformation store={store} storeId={storeId} />,
            },
          ].map((setting, index) => {
            const isOpen = openStoreIndex === index;
            return (
              <div key={index} className="transition">
                <div
                  className="flex items-center px-4 justify-between py-5 hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => toggleStoreSection(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-gray-100">
                      <setting.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="font-medium text-gray-800">
                      {setting.title}
                    </span>
                  </div>
                  <Pencil className="h-4 w-4 text-gray-600" />
                </div>

                <div
                  ref={(el: any) => (storeContentRefs.current[index] = el)}
                  style={{
                    maxHeight: isOpen
                      ? storeContentRefs.current[index]?.scrollHeight + "px"
                      : "0px",
                    opacity: isOpen ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.5s ease, opacity 0.5s ease",
                    borderTop: "1px solid #f3f4f6",
                  }}
                >
                  {setting.content}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Settings;
