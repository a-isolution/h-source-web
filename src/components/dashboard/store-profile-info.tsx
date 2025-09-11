"use client";

import React from "react";
import { useGetAuth } from "@/api/auth";
import { useGetStoreById } from "@/api/store";
import { isStoreProfileComplete } from "@/lib/store-profile-checker";
import Link from "next/link";

const StoreProfileInfo = () => {
  const { data: auth } = useGetAuth();
  const storeId = auth?.store.id || null;
  const { data: store } = useGetStoreById({ storeId });
  const completedProfile = isStoreProfileComplete(store);

  return (
    <div>
      {!completedProfile && (
        <div className="rounded-lg border border-gray-700 bg-gray-50 p-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-sm text-gray-700">
              Your store profile is incomplete. Please complete all required
              fields, including contact information, delivery details, and
              payout settings to activate your store.
            </p>

            <div className="flex flex-row items-center gap-4">
              <Link
                href={"/settings"}
                className="inline-flex rounded-sm items-center justify-center whitespace-nowrap bg-gray-800 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2"
              >
                Complete Store Profile
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreProfileInfo;
