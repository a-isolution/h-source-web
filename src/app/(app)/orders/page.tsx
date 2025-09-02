"use client";

import React, { useState } from "react";

const orders = [
  {
    id: "ORD-2024-001",
    customer: "John Doe",
    time: "2 minutes ago",
    items: [
      { name: "Coca-Cola 350ml", qty: 2, price: 700 },
      { name: "Chocolate Bar", qty: 1, price: 200 },
    ],
    total: 900,
    status: "new", // new | inprogress | completed | cancelled
    payment: "paid",
  },
  {
    id: "ORD-2024-002",
    customer: "John Doe",
    time: "2 minutes ago",
    items: [{ name: "Coca-Cola 350ml", qty: 2, price: 700 }],
    total: 700,
    status: "inprogress",
    payment: "paid",
  },
  {
    id: "ORD-2024-003",
    customer: "John Doe",
    time: "2 minutes ago",
    items: [{ name: "Coca-Cola 350ml", qty: 2, price: 700 }],
    total: 700,
    status: "completed",
    payment: "paid",
  },
  {
    id: "ORD-2024-004",
    customer: "John Doe",
    time: "2 minutes ago",
    items: [{ name: "Coca-Cola 350ml", qty: 2, price: 700 }],
    total: 700,
    status: "cancelled",
    payment: "refunded",
  },
];

const Orders = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders =
    activeTab === "all" ? orders : orders.filter((o) => o.status === activeTab);

  return (
    <>
      <div>
        <h1 className="text-xl font-medium">Orders</h1>
        <span className="font-medium text-[#A7A7A7] text-sm">
          Manage your sales and customer orders{" "}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 my-6 flex-wrap">
        {["all", "new", "inprogress", "completed", "cancelled"].map((tab) => {
          const count =
            tab === "all"
              ? orders.length
              : orders.filter((o) => o.status === tab).length;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium border border-stone-200 ${
                activeTab === tab
                  ? "bg-lime-400 text-black"
                  : "bg-white text-gray-700"
              }`}
            >
              <span className="capitalize">
                {tab === "all" ? "All Orders" : tab}
              </span>

              {/* Count Badge */}
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Orders grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-sm p-4 flex flex-col justify-between"
          >
            {/* Order Header */}
            <div className="flex justify-between items-start">
              <h3 className="font-semibold">{order.id}</h3>
              <div className="flex gap-2">
                {order.status === "new" && (
                  <span className="text-xs px-2 py-1 rounded-full border text-blue-600 border-blue-200">
                    NEW
                  </span>
                )}
                {order.status === "inprogress" && (
                  <span className="text-xs px-2 py-1 rounded-full border text-indigo-600 border-indigo-200">
                    IN PROGRESS
                  </span>
                )}
                {order.status === "completed" && (
                  <span className="text-xs px-2 py-1 rounded-full border text-green-600 border-green-200">
                    COMPLETED
                  </span>
                )}
                {order.status === "cancelled" && (
                  <span className="text-xs px-2 py-1 rounded-full border text-red-600 border-red-200">
                    CANCELLED
                  </span>
                )}
                <span className="text-xs px-2 py-1 rounded-full border text-emerald-600 border-emerald-200">
                  {order.payment.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Customer Info */}
            <p className="text-sm text-gray-700 mt-1">{order.customer}</p>
            <p className="text-xs text-gray-400">{order.time}</p>

            {/* Items */}
            <div className="mt-3 text-sm">
              <p className="font-medium">Items</p>
              {order.items.map((item, idx) => (
                <p key={idx} className="flex justify-between text-gray-600">
                  <span>
                    {item.qty}x {item.name}
                  </span>
                  <span>₦{item.price}</span>
                </p>
              ))}
            </div>

            {/* Total */}
            <p className="mt-2">
              Total{" "}
              <span className="font-semibold float-right">₦{order.total}</span>
            </p>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              {order.status === "new" && (
                <>
                  <button className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm">
                    Cancel
                  </button>
                  <button className="bg-lime-400 px-4 py-1 rounded-full text-sm font-medium">
                    Accept
                  </button>
                </>
              )}

              {order.status === "inprogress" && (
                <>
                  <button className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-sm">
                    Dispatch
                  </button>
                  <button className="bg-lime-400 px-4 py-1 rounded-full text-sm font-medium">
                    Mark as Delivered
                  </button>
                </>
              )}

              {order.status === "completed" && (
                <button className="bg-lime-400 px-4 py-1 rounded-full text-sm font-medium">
                  View Details
                </button>
              )}

              {order.status === "cancelled" && (
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 rounded-full border text-red-600 border-red-200">
                    REFUNDED
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Orders;
