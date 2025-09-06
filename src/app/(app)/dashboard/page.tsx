"use client";

import { useGetAuth, useVerifyEmail, useVerifyEmailCode } from "@/api/auth";
import VerifiedBannerInfo from "@/components/dashboard/info";
import VerifyEmailModal from "@/components/modals/verify-email-modal";
import VerifyPhoneModal from "@/components/modals/verify-phone-modal";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import React, { useState } from "react";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <VerifiedBannerInfo />

      <div>
        <h1 className="text-xl font-medium">Sarah&apos;s Corner Store</h1>
        <span className="font-medium text-[#A7A7A7] text-sm">
          Managing your marketplace since 2023
        </span>

        {/* Info Banner */}
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Today's Earnings", value: "₦25,430" },
          { label: "Weekly Earnings", value: "₦25,430" },
          { label: "Total Earnings", value: "₦1,247,680" },
          { label: "Container Returns", value: "847" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-2xl shadow flex flex-col gap-2"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <h2 className="text-2xl font-semibold">{item.value}</h2>
            <span className="text-green-600 flex items-center gap-1 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4" /> +12.5%
            </span>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex justify-between">
              <div>
                <p className="font-medium">New order #ORD-2024-001 received</p>
                <span className="text-gray-500 text-xs">2 minutes ago</span>
              </div>
              <span className="font-medium">₦2,450</span>
            </li>
            <li className="flex justify-between">
              <div>
                <p className="font-medium">Coca-Cola 350ml stock running low</p>
                <span className="text-gray-500 text-xs">15 minutes ago</span>
              </div>
              <span className="text-red-500 text-sm">5 units left</span>
            </li>
            <li className="flex justify-between">
              <div>
                <p className="font-medium">Container pickup completed</p>
                <span className="text-gray-500 text-xs">1 hour ago</span>
              </div>
              <span className="font-medium">45 containers</span>
            </li>
            <li className="flex justify-between">
              <div>
                <p className="font-medium">Order #ORD-2024-000 completed</p>
                <span className="text-gray-500 text-xs">2 hours ago</span>
              </div>
              <span className="font-medium">₦1,250</span>
            </li>
            <li className="flex justify-between">
              <div>
                <p className="font-medium">Fanta 450ml stock running low</p>
                <span className="text-gray-500 text-xs">6 hours ago</span>
              </div>
              <span className="text-red-500 text-sm">4 units left</span>
            </li>
          </ul>
        </div>

        {/* Quick Stats */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex justify-between">
              <span>Active Products</span>
              <span className="font-medium">127</span>
            </li>
            <li className="flex justify-between">
              <span>Pending Orders</span>
              <span className="font-medium text-orange-500">8</span>
            </li>
            <li className="flex justify-between">
              <span>Low Stock Items</span>
              <span className="font-medium text-red-500">3</span>
            </li>
            <li className="flex justify-between">
              <span>Recycling Points</span>
              <span className="font-medium text-green-500">2,450</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
