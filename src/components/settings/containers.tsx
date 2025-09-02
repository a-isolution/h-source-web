"use client";

import React, { useState } from "react";

export const StoreDetails = () => {
  const [storeName, setStoreName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSave = () => {
    const data = {
      storeName,
      description,
      address,
      phone,
    };
    console.log("Store Details Saved:", data);
    alert("Store details saved successfully!");
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
          Save Changes
        </button>
      </div>
    </div>
  );
};

const defaultHours = [
  { day: "Monday", open: "09:00", close: "17:00", enabled: true },
  { day: "Tuesday", open: "09:00", close: "17:00", enabled: true },
  { day: "Wednesday", open: "09:00", close: "17:00", enabled: true },
  { day: "Thursday", open: "09:00", close: "17:00", enabled: true },
  { day: "Friday", open: "09:00", close: "17:00", enabled: true },
  { day: "Saturday", open: "10:00", close: "14:00", enabled: false },
  { day: "Sunday", open: "00:00", close: "00:00", enabled: false },
];

export const BusinessHours = () => {
  const [hours, setHours] = useState(defaultHours);

  const updateHour = (
    index: number,
    field: "open" | "close",
    value: string
  ) => {
    const newHours = [...hours];
    newHours[index][field] = value;
    setHours(newHours);
  };

  const toggleDay = (index: number) => {
    const newHours = [...hours];
    newHours[index].enabled = !newHours[index].enabled;
    setHours(newHours);
  };

  const handleSave = () => {
    console.log("Business Hours Saved:", hours);
    alert("Business hours saved successfully!");
  };

  return (
    <div className="p-4 space-y-6 mb-6">
      <p className="text-sm text-gray-600 mb-4">
        Set your store opening hours here.
      </p>

      <div className="space-y-4">
        {hours.map((item, index) => (
          <div
            key={item.day}
            className="flex border border-stone-200 items-center justify-between rounded-lg px-4 py-3"
          >
            <span className="w-24 font-medium">{item.day}</span>

            {/* Open Time */}
            <input
              type="time"
              value={item.open}
              disabled={!item.enabled}
              onChange={(e) => updateHour(index, "open", e.target.value)}
              className={`border border-stone-200 rounded-lg px-2 py-1 text-sm w-32 ${
                !item.enabled ? "bg-gray-100 text-gray-400" : ""
              }`}
            />

            <span className="mx-2">to</span>

            {/* Close Time */}
            <input
              type="time"
              value={item.close}
              disabled={!item.enabled}
              onChange={(e) => updateHour(index, "close", e.target.value)}
              className={`border border-stone-200 rounded-lg px-2 py-1 text-sm w-32 ${
                !item.enabled ? "bg-gray-100 text-gray-400" : ""
              }`}
            />

            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={item.enabled}
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
          Save Changes
        </button>
      </div>
    </div>
  );
};

export const DeliveryPreferences = () => {
  const [isDeliveryEnabled, setIsDeliveryEnabled] = useState(false);
  const [deliveryRadius, setDeliveryRadius] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("");

  const handleSave = () => {
    const data = {
      deliveryEnabled: isDeliveryEnabled,
      deliveryRadius,
      deliveryFee,
    };
    console.log("Delivery Preferences Saved:", data);
    alert("Delivery preferences saved successfully!");
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
          Save Changes
        </button>
      </div>
    </div>
  );
};

export const PaymentInformation = () => {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [payoutSchedule, setPayoutSchedule] = useState("weekly");

  const handleSave = () => {
    const data = {
      bankName,
      accountNumber,
      accountName,
      payoutSchedule,
    };
    console.log("Payment Info Saved:", data);
    alert("Payment information saved successfully!");
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
          Save Changes
        </button>
      </div>
    </div>
  );
};
