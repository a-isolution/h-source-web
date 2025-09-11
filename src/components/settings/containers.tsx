"use client";

import { useCreateStore, useUpdateStore } from "@/api/store";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import Spinner from "../spinner";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateAvatar, useUpdateProfile } from "@/api/auth";

export const UserProfile = ({ user }: { user: any }) => {
  const qc = useQueryClient();
  const { mutate: updateUser, isPending: userIsPending } = useUpdateProfile();
  const { mutate: updateAvatar, isPending: avatarIsPending } =
    useUpdateAvatar();

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setBio(user.bio || "");
      setAddress(user.address || "");
      setCity(user.city || "");
      setState(user.state || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
      setAvatarPreview(user.avatar || null);
    }
  }, [user]);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateAvatar = () => {
    if (!avatarFile) {
      toast.error("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", avatarFile);

    updateAvatar(
      { body: formData },
      {
        onSuccess: () => {
          toast.success("Profile image updated successfully");
          qc.invalidateQueries({ queryKey: ["get-auth"] });
          setAvatarFile(null);
        },
        onError: () => {
          toast.error("Failed to update avatar");
        },
      }
    );
  };

  const handleUpdateUser = () => {
    updateUser(
      { body: { fullName, bio, address, city, state, phone } },
      {
        onSuccess: () => {
          toast.success("User profile updated successfully");
          qc.invalidateQueries({ queryKey: ["get-auth"] });
        },
        onError: () => {
          toast.error("Failed to update profile");
        },
      }
    );
  };

  return (
    <div className="p-4 space-y-6 h-auto w-[inherit] mb-10">
      <div className="flex items-center gap-4 h-auto">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-500 flex items-center justify-center">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="User avatar"
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-gray-500">No Avatar</span>
          )}
        </div>

        <div>
          <label
            htmlFor="avatarUpload"
            className="cursor-pointer text-sm text-blue-600 hover:underline"
          >
            Change Avatar
          </label>
          <input
            id="avatarUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
          {avatarFile && (
            <button
              onClick={handleUpdateAvatar}
              disabled={avatarIsPending}
              className="ml-4 px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition disabled:opacity-50"
            >
              {avatarIsPending ? "Uploading..." : "Upload"}
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-2 w-full border rounded-lg px-2.5 py-2 text-[13px] border-gray-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            rows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-2 w-full border rounded-lg px-2.5 py-2 text-[13px] border-gray-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-2 w-full border rounded-lg px-2.5 py-2 text-[13px] border-gray-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-2 w-full border rounded-lg px-2.5 py-2 text-[13px] border-gray-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">State</label>
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-2 w-full border rounded-lg px-2.5 py-2 text-[13px] border-gray-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            placeholder="phone"
            value={phone}
            disabled={true}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-2 w-full border rounded-lg px-2.5 py-2 text-[13px] border-gray-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            disabled={true}
            placeholder="email"
            value={email}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-2 w-full border rounded-lg px-2.5 py-2 text-[13px] border-gray-200"
          />
        </div>

        {/* Button aligned to the right */}
        <div className="flex justify-end">
          <button
            disabled={userIsPending}
            onClick={handleUpdateUser}
            className="bg-[#0049E5] text-white text-sm px-4 py-2 rounded-lg cursor-pointer"
          >
            {userIsPending ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export const StoreDetails = ({
  store,
  storeId,
}: {
  store: any;
  storeId: any;
}) => {
  const qc = useQueryClient();
  const { mutate: createStore, isPending: createIsPending } = useCreateStore();
  const { mutate: updateStore, isPending: updateIsPending } = useUpdateStore();

  const [storeName, setStoreName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (store) {
      setStoreName(store.name || "");
      setDescription(store.description || "");
      setAddress(store.address || "");
      setPhone(store.phone || "");
    }
  }, [store]);

  const handleSave = () => {
    if (storeId) {
      updateStore(
        { body: { name: storeName, description, address, phone }, storeId },
        {
          onSuccess: () => {
            toast.success("Store details udpated successfully");
            qc.invalidateQueries({ queryKey: ["store-id", storeId] });
          },
        }
      );
    } else {
      createStore(
        { body: { name: storeName, description, address, phone } },
        {
          onSuccess: () => {
            toast.success("Store details created successfully");
            qc.invalidateQueries({ queryKey: ["store-id", storeId] });
          },
        }
      );
    }
  };

  return (
    <div className="p-4 space-y-6 mb-6">
      <div>
        <label className="block text-sm font-medium">Store Name</label>
        <input
          type="text"
          placeholder="Store name"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          className="mt-2 w-full border rounded-lg px-2.5 py-2 text-[13px] border-gray-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          rows={5}
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 w-full border rounded-lg px-2.5 py-2 text-[13px] border-gray-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Store Address</label>
        <textarea
          rows={5}
          placeholder="Your store address..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-2 w-full border rounded-lg px-2.5 py-2 text-[13px] border-gray-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Phone Number</label>
        <input
          type="text"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-2 w-full border rounded-lg px-2.5 py-2 text-[13px] border-gray-200"
        />
      </div>

      {/* Button aligned to the right */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-[#0049E5] text-white text-sm px-4 py-2 rounded-lg cursor-pointer"
        >
          {createIsPending || updateIsPending ? <Spinner /> : " Save Changes"}
        </button>
      </div>
    </div>
  );
};

const defaultHours = [
  { name: "Monday", from: "09:00", to: "17:00", active: true },
  { name: "Tuesday", from: "09:00", to: "17:00", active: true },
  { name: "Wednesday", from: "09:00", to: "17:00", active: true },
  { name: "Thursday", from: "09:00", to: "17:00", active: true },
  { name: "Friday", from: "09:00", to: "17:00", active: true },
  { name: "Saturday", from: "10:00", to: "14:00", active: false },
  { name: "Sunday", from: "00:00", to: "00:00", active: false },
];

export const BusinessHours = ({
  store,
  storeId,
}: {
  store: any;
  storeId: any;
}) => {
  const qc = useQueryClient();
  const { mutate: createStore, isPending: createIsPending } = useCreateStore();
  const { mutate: updateStore, isPending: updateIsPending } = useUpdateStore();

  const [hours, setHours] = useState(defaultHours);

  const updateHour = (index: number, field: "from" | "to", value: string) => {
    const newHours = [...hours];
    newHours[index][field] = value;
    setHours(newHours);
  };

  const toggleDay = (index: number) => {
    const newHours = [...hours];
    newHours[index].active = !newHours[index].active;
    setHours(newHours);
  };

  // useEffect(() => {
  //   if (store?.availability !== null) {
  //     setHours(store?.availability);
  //   }
  // }, [store]);

  const handleSave = () => {
    // Base date for Sunday: 2023-09-30
    const baseDate = new Date("2023-09-30T00:00:00Z");

    // Convert to ISO 8601 format with date
    const formattedAvailability = hours.map((item, index) => {
      if (!item.active) {
        return {
          name: item.name,
          from: null,
          to: null,
          active: false,
        };
      }

      const fromDate = new Date(baseDate);
      const toDate = new Date(baseDate);

      fromDate.setDate(baseDate.getDate() + index + 1); // +1 because Sunday starts on 30th
      toDate.setDate(baseDate.getDate() + index + 1);

      const [fromHours, fromMinutes] = item.from.split(":");
      const [toHours, toMinutes] = item.to.split(":");

      fromDate.setUTCHours(Number(fromHours), Number(fromMinutes), 0);
      toDate.setUTCHours(Number(toHours), Number(toMinutes), 0);

      return {
        name: item.name,
        from: fromDate.toISOString(),
        to: toDate.toISOString(),
        active: item.active,
      };
    });

    console.log("Business Hours Saved (ISO):", formattedAvailability);

    const payload = {
      availability: formattedAvailability,
    };

    if (storeId) {
      updateStore(
        {
          body: payload as any,
          storeId,
        },
        {
          onSuccess: () => {
            toast.success("Delivery preference updated successfully");
            qc.invalidateQueries({ queryKey: ["store-id", storeId] });
          },
        }
      );
    } else {
      createStore(
        {
          body: payload as any,
        },
        {
          onSuccess: () => {
            toast.success("Delivery preference updated successfully");
            qc.invalidateQueries({ queryKey: ["store-id", storeId] });
          },
        }
      );
    }
  };

  return (
    <div className="p-4 space-y-6 mb-6">
      <p className="text-sm text-gray-600 mb-4">
        Set your store opening hours here.
      </p>

      <div className="space-y-4">
        {hours?.map((item, index) => (
          <div
            key={item.name}
            className="flex border border-stone-200 items-center justify-between rounded-lg px-4 py-3"
          >
            <span className="w-24 font-medium">{item.name}</span>

            {/* Open Time */}
            <input
              type="time"
              value={item.from}
              disabled={!item.active}
              onChange={(e) => updateHour(index, "from", e.target.value)}
              className={`border border-stone-200 rounded-lg px-2 py-1 text-sm w-32 ${
                !item.active ? "bg-gray-100 text-gray-400" : ""
              }`}
            />

            <span className="mx-2">to</span>

            {/* Close Time */}
            <input
              type="time"
              value={item.to}
              disabled={!item.active}
              onChange={(e) => updateHour(index, "to", e.target.value)}
              className={`border border-stone-200 rounded-lg px-2 py-1 text-sm w-32 ${
                !item.active ? "bg-gray-100 text-gray-400" : ""
              }`}
            />

            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={item.active}
                onChange={() => toggleDay(index)}
                className="sr-only peer"
              />
              {/* Track */}
              <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-colors"></div>

              {/* Knob */}
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
            </label>
          </div>
        ))}
      </div>

      {/* Button aligned to the right */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-[#0049E5] text-white text-sm px-4 py-2 rounded-lg cursor-pointer"
        >
          {createIsPending || updateIsPending ? <Spinner /> : " Save Changes"}
        </button>
      </div>
    </div>
  );
};

export const DeliveryPreferences = ({
  store,
  storeId,
}: {
  store: any;
  storeId: any;
}) => {
  const qc = useQueryClient();
  const { mutate: createStore, isPending: createIsPending } = useCreateStore();
  const { mutate: updateStore, isPending: updateIsPending } = useUpdateStore();

  const [isDeliveryEnabled, setIsDeliveryEnabled] = useState(false);
  const [deliveryRadius, setDeliveryRadius] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("");

  useEffect(() => {
    if (store) {
      setIsDeliveryEnabled(store.offerDeliveryService || "");
      setDeliveryRadius(store.deliveryRadius || "");
      setDeliveryFee(store.deliveryFee || "");
    }
  }, [store]);

  const handleSave = () => {
    if (storeId) {
      updateStore(
        {
          body: {
            offerDeliveryService: isDeliveryEnabled,
            deliveryRadius,
            deliveryFee,
          },
          storeId,
        },
        {
          onSuccess: () => {
            toast.success("Delivery preference udpated successfully");
            qc.invalidateQueries({ queryKey: ["store-id", storeId] });
          },
        }
      );
    } else {
      createStore(
        {
          body: {
            offerDeliveryService: isDeliveryEnabled,
            deliveryRadius,
            deliveryFee,
          },
        },
        {
          onSuccess: () => {
            toast.success("Delivery preference updated successfully");
            qc.invalidateQueries({ queryKey: ["store-id", storeId] });
          },
        }
      );
    }
  };

  return (
    <div className="p-4 space-y-6 mb-6">
      <p className="text-sm text-gray-600">
        Update your delivery options here.
      </p>

      {/* Delivery toggle */}
      <div>
        <label className="block text-sm font-medium">
          Offer Delivery Service
        </label>
        <div className="flex flex-row items-center justify-between mt-2">
          <p className="text-sm text-gray-600">
            Allow customers to request delivery.
          </p>

          {/* Toggle Switch */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isDeliveryEnabled}
              onChange={() => setIsDeliveryEnabled(!isDeliveryEnabled)}
              className="sr-only peer"
            />
            {/* Track */}
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-colors"></div>

            {/* Knob */}
            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
          </label>
        </div>
      </div>

      {/* Radius input */}
      <div>
        <label className="block text-sm font-medium">
          Delivery Radius (km)
        </label>
        <input
          type="text"
          value={deliveryRadius}
          onChange={(e) => setDeliveryRadius(e.target.value)}
          placeholder="e.g. 10"
          className="mt-2 w-full border rounded-lg px-2.5 py-2 text-[13px] border-gray-200"
        />
      </div>

      {/* Fee input */}
      <div>
        <label className="block text-sm font-medium">Delivery Fee (₦)</label>
        <input
          type="text"
          value={deliveryFee}
          onChange={(e) => setDeliveryFee(e.target.value)}
          placeholder="e.g. 500"
          className="mt-2 w-full border rounded-lg px-2.5 py-2 text-[13px] border-gray-200"
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-[#0049E5] text-white text-sm px-4 py-2 rounded-lg cursor-pointer"
        >
          {createIsPending || updateIsPending ? <Spinner /> : " Save Changes"}
        </button>
      </div>
    </div>
  );
};

export const PaymentInformation = ({
  store,
  storeId,
}: {
  store: any;
  storeId: any;
}) => {
  const qc = useQueryClient();
  const { mutate: createStore, isPending: createIsPending } = useCreateStore();
  const { mutate: updateStore, isPending: updateIsPending } = useUpdateStore();

  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [payoutSchedule, setPayoutSchedule] = useState("weekly");

  useEffect(() => {
    if (store) {
      setBankName(store.bankName || "");
      setAccountNumber(store.accountNumber || "");
      setAccountName(store.accountName || "");
      setPayoutSchedule(store.payoutSchedule || "");
    }
  }, [store]);

  const handleSave = () => {
    if (storeId) {
      updateStore(
        {
          body: {
            bankName,
            accountNumber,
            accountName,
            payoutSchedule,
          },
          storeId,
        },
        {
          onSuccess: () => {
            toast.success("Payment information udpated successfully");
            qc.invalidateQueries({ queryKey: ["store-id", storeId] });
          },
        }
      );
    } else {
      createStore(
        { body: { bankName, accountNumber, accountName } },
        {
          onSuccess: () => {
            toast.success("Payment information updated successfully");
            qc.invalidateQueries({ queryKey: ["store-id", storeId] });
          },
        }
      );
    }
  };

  return (
    <div className="p-4 space-y-6 mb-6">
      <p className="text-sm text-gray-600">
        Update your payment settings here.
      </p>

      <div>
        <label className="block text-sm font-medium">Bank Name</label>
        <input
          type="text"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          placeholder="e.g. GTBank"
          className="mt-2 w-full border rounded-lg px-2.5 py-2 text-[13px] border-gray-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Account Number</label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="e.g. 0123456789"
          className="mt-2 w-full border rounded-lg px-2.5 py-2 text-[13px] border-gray-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Account Name</label>
        <input
          type="text"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          placeholder="e.g. John Doe"
          className="mt-2 w-full border rounded-lg px-2.5 py-2 text-[13px] border-gray-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Payout Schedule</label>
        <select
          value={payoutSchedule}
          onChange={(e) => setPayoutSchedule(e.target.value)}
          className="mt-2 w-full border rounded-lg px-2.5 py-2 text-[13px] border-gray-200"
        >
          <option value="weekly">Weekly</option>
          <option value="bi-weekly">Bi-Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-[#0049E5] text-white text-sm px-4 py-2 rounded-lg cursor-pointer"
        >
          {createIsPending || updateIsPending ? <Spinner /> : " Save Changes"}
        </button>
      </div>
    </div>
  );
};
