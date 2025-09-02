"use client";

import React, { useState } from "react";
import { Bell, Trash, X } from "lucide-react";

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    title: "New Order Received",
    message: "Order #12345 has been placed.",
    timestamp: "2025-08-27T12:30:00Z",
    read: false,
  },
  {
    id: 2,
    title: "Inventory Low",
    message: "Candy Bar stock is below threshold.",
    timestamp: "2025-08-26T09:10:00Z",
    read: true,
  },
  {
    id: 3,
    title: "User Feedback",
    message: "A customer left a 5-star review.",
    timestamp: "2025-08-25T17:20:00Z",
    read: false,
  },
];

const Notification = () => {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-xl font-medium">Notifications</h1>
          <span className="font-medium text-[#A7A7A7] text-sm">
            Stay updated with recent activity
          </span>
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No notifications.</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start justify-between gap-4 p-4 border rounded-lg ${
                notification.read ? "bg-white" : "bg-blue-50"
              }`}
            >
              <div className="flex gap-4">
                <div className="mt-1">
                  <Bell className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-sm font-semibold">
                    {notification.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(notification.id)}
                className="text-gray-400 hover:text-red-500 self-center px-1"
                aria-label="Delete notification"
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notification;
