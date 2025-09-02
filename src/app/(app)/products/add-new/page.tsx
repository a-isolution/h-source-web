"use client";

import SearchBar from "@/components/search";
import { UploadCloud, ArrowRight, Search } from "lucide-react";
import React, { useState } from "react";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [query, setQuery] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-medium">Products</h1>
        <span className="font-medium text-[#A7A7A7] text-sm">
          Manage your drinks and candy inventory
        </span>
      </div>

      {/* Product Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product name"
              className="w-full px-4 py-2 border rounded-sm bg-gray-50"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a product description..."
              className="w-full px-4 py-2 border rounded-sm bg-gray-50"
            />
          </div>
        </div>

        {/* Price + Upload */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full px-4 py-2 border rounded-md bg-gray-50"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Upload Image</label>
            <div className="w-full h-48 border-2 border-dashed rounded-md flex flex-col items-center justify-center bg-gray-50 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="upload"
              />
              <label htmlFor="upload" className="flex flex-col items-center">
                <UploadCloud className="w-8 h-8 text-gray-400" />
                <span className="text-gray-500 text-sm mt-2">
                  {image ? image.name : "Click to upload image"}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button className="bg-lime-400 text-black px-6 py-2 rounded-md font-medium flex items-center gap-2 hover:bg-lime-500 transition">
          Finish <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;
