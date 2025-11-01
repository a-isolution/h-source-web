"use client";

import { useGetAuth } from "@/api/auth";
import { useGetMyOrders } from "@/api/order";
import { useGetMyProducts } from "@/api/products";
import { useGetStoreById } from "@/api/store";
import VerifiedBannerInfo from "@/components/dashboard/info";
import StoreProfileInfo from "@/components/dashboard/store-profile-info";
import { ArrowUpRight } from "lucide-react";
import React, { useState } from "react";

const Dashboard = () => {
  const { data: user } = useGetAuth();
  const { data: store } = useGetStoreById({
    storeId: user?.store?.id as string,
  });

  const { data: orders } = useGetMyOrders();
  const pendingOrders = orders?.data.filter(
    (order: any) => order.status === "pending"
  );

  const { data: products } = useGetMyProducts({
    params: { page: 0, pageSize: 100 },
  });
  const activeProducts = products?.data.filter(
    (product: any) => product.isActive === true
  );
  const lowStockProducts = products?.data.filter(
    (product: any) => product.stockQuantity <= 3
  );

  const [recentActivities, _] = useState(null);

  return (
    <div className="p-6 space-y-6">
      <VerifiedBannerInfo />
      <StoreProfileInfo />

      <div>
        <h1 className="text-xl font-medium">{store?.name}</h1>
        <span className="font-medium text-[#A7A7A7] text-sm">
          Managing your marketplace since{" "}
          {store?.createdAt ? new Date(store.createdAt).getFullYear() : null}
        </span>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Today's Earnings", value: "₦ 0" },
          { label: "Weekly Earnings", value: "₦ 0" },
          { label: "Total Earnings", value: "₦ 0" },
          { label: "Orders Returned", value: "0" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-2xl shadow flex flex-col gap-2"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <h2 className="text-2xl font-semibold">{item.value}</h2>
            <span className="text-green-600 flex items-center gap-1 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4" /> + 0%
            </span>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          {recentActivities ? (
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between">
                <div>
                  <p className="font-medium">
                    New order #ORD-2024-001 received
                  </p>
                  <span className="text-gray-500 text-xs">2 minutes ago</span>
                </div>
                <span className="font-medium">₦2,450</span>
              </li>
              <li className="flex justify-between">
                <div>
                  <p className="font-medium">
                    Coca-Cola 350ml stock running low
                  </p>
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
          ) : (
            <span className="text-gray-500 text-xs">No recent activities</span>
          )}
        </div>

        {/* Quick Stats */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Quick Stats
          </h3>
          <ul className="space-y-6 text-sm">
            <li className="flex justify-between items-center hover:bg-gray-50 p-3 rounded-lg transition duration-200">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Active Products</span>
              </div>
              <span className="font-semibold text-gray-800">
                {activeProducts?.length}
              </span>
            </li>
            <li className="flex justify-between items-center hover:bg-gray-50 p-3 rounded-lg transition duration-200">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <span>Pending Orders</span>
              </div>
              <span className="font-semibold text-orange-500">
                {pendingOrders?.length}
              </span>
            </li>
            <li className="flex justify-between items-center hover:bg-gray-50 p-3 rounded-lg transition duration-200">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 3v18m9-9H3"
                  />
                </svg>
                <span>Low Stock Items</span>
              </div>
              <span className="font-semibold text-red-500">
                {lowStockProducts?.length}
              </span>
            </li>
            <li className="flex justify-between items-center hover:bg-gray-50 p-3 rounded-lg transition duration-200">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 3v18m9-9H3"
                  />
                </svg>
                <span>Recycling Points</span>
              </div>
              <span className="font-semibold text-green-500">2,450</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
