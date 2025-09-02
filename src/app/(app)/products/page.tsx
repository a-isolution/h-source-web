"use client";

import SearchBar from "@/components/search";
import SelectBox from "@/components/select-box";
import { Pen, Plus, Trash } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Products = () => {
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-xl font-medium">Products</h1>
          <span className="font-medium text-[#A7A7A7] text-sm">
            Manage your drinks and candy inventory
          </span>
        </div>
        <Link
          href="/products/add-new"
          className="inline-flex text-sm items-center gap-2 bg-lime-400 text-black px-4 py-2 rounded-md font-medium hover:bg-lime-500 transition"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </Link>
      </div>

      {/* Search and Filter bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 my-6">
        <div className="relative w-full md:w-[250px] lg:w-[450px]">
          <SearchBar />
        </div>

        <div className="flex gap-2 w-full md:w-auto text-xs">
          <SelectBox
            label="Categories"
            placeholder="Select a category"
            options={[
              { label: "Drinks", value: "drinks" },
              { label: "Snacks", value: "snacks" },
              { label: "Candy", value: "candy" },
            ]}
            value={category}
            onChange={setCategory}
            className="w-[200px]"
          />

          <SelectBox
            label="Products"
            placeholder="Select a product"
            options={[
              { label: "Drinks", value: "drinks" },
              { label: "Snacks", value: "snacks" },
              { label: "Candy", value: "candy" },
            ]}
            value={product}
            onChange={setProduct}
            className="w-[200px]"
          />
        </div>
      </div>

      {/* Product grid */}
      <div className="w-full sm:w-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {[...Array(20)].map((_, i) => {
          const outOfStock = i % 3 === 0;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-3 flex flex-col relative group"
            >
              {/* Product image + overlays */}
              <div className="relative">
                <img
                  src="/coke.png"
                  alt="product"
                  className="rounded-lg bg-gray-100 object-cover w-full h-[230px] sm:w-[280px]"
                />

                {/* Out of Stock Label */}
                {outOfStock && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow">
                    Out of stock
                  </span>
                )}

                {/* Toggle Switch (show only on hover) */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={!outOfStock}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-lime-400 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4"></div>
                  </label>
                </div>
              </div>

              {/* Details */}
              <div className="my-3 flex flex-col gap-1">
                <h2 className="font-semibold text-base">Coca-Cola 350ml</h2>

                <div className="flex flex-row items-center gap-6 text-sm">
                  <p className="text-gray-500">• Drinks</p>
                  <p className="text-gray-500">
                    • {outOfStock ? "0" : "45"} units
                  </p>
                </div>

                <p className="font-bold text-xl">₦350</p>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center mt-2">
                <button className="flex items-center gap-2 bg-[#ADF802] hover:bg-lime-500 text-black px-4 py-1.5 rounded-3xl text-sm font-medium shadow w-[50%]">
                  <Pen className="w-4 h-4" /> Edit
                </button>
                <button className="flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-500 px-3 py-2 rounded-xl">
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Products;
