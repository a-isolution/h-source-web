"use client";

import React, { useState, useRef, useEffect } from "react";
import { Store, Clock, Truck, CreditCard, Pencil } from "lucide-react";
import {
  BusinessHours,
  DeliveryPreferences,
  PaymentInformation,
  StoreDetails,
} from "@/components/settings/containers";

const settings = [
  {
    title: "Store Details",
    icon: Store,
    content: <StoreDetails />,
  },
  {
    title: "Business Hours",
    icon: Clock,
    content: <BusinessHours />,
  },
  {
    title: "Delivery Preferences",
    icon: Truck,
    content: <DeliveryPreferences />,
  },
  {
    title: "Payment Information",
    icon: CreditCard,
    content: <PaymentInformation />,
  },
];

const Settings = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // default open first section
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div>
        <h1 className="text-xl font-medium">Settings</h1>
        <span className="font-medium text-[#A7A7A7] text-sm">
          Customize your store preferences and configurations
        </span>
      </div>

      <div className="bg-white w-[90%] md:w-[60%] rounded-xl my-6 shadow-sm divide-y divide-stone-200">
        {settings.map((setting, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="transition">
              <div
                className="flex items-center px-4 justify-between py-5 hover:bg-gray-50 transition cursor-pointer"
                onClick={() => toggleSection(index)}
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

              {/* Animated expandable content */}
              <div
                ref={(el: any) => (contentRefs.current[index] = el)}
                style={{
                  maxHeight: isOpen
                    ? contentRefs.current[index]?.scrollHeight + "px"
                    : "0px",
                  opacity: isOpen ? 1 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.5s ease, opacity 0.5s ease",
                  borderTop: "1px solid #f3f4f6", // border-t gray-100
                }}
              >
                {setting.content}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Settings;
