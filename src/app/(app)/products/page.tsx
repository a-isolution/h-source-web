"use client";

import { useGetAuth } from "@/api/auth";
import { useGetBrands } from "@/api/brands";
import { useGetCategories } from "@/api/category";
import {
  useDeleteProduct,
  useGetMyProducts,
  useUpdateProduct,
} from "@/api/products";
import { useGetStoreById } from "@/api/store";
import DeleteModal from "@/components/delete-modal";
import { CustomPagination } from "@/components/pagination";
import SearchBar from "@/components/search";
import SelectBox from "@/components/select-box";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { isStoreProfileComplete } from "@/lib/store-profile-checker";
import { useQueryClient } from "@tanstack/react-query";
import { Pen, Plus, SearchX, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Products = () => {
  const router = useRouter();
  const qc = useQueryClient();

  const { data: auth } = useGetAuth();
  const storeId = auth?.store.id || null;
  const { data: store } = useGetStoreById({ storeId });
  const complete = isStoreProfileComplete(store);

  const handleClick = () => {
    if (!complete) {
      toast.message(
        "Please complete your store profile before adding a product."
      );
      return;
    }

    router.push("/products/add-new");
  };

  const { data: brands } = useGetBrands();
  const { data: Categories } = useGetCategories();

  const { mutate: updateProduct } = useUpdateProduct();

  const { mutate: deleteProduct, isPending } = useDeleteProduct();
  const [deleteId, setDeleteId] = useState<any | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleDeleteProduct = () => {
    deleteProduct(
      { productId: deleteId },
      {
        onSuccess: () => {
          setDeleteId(null);
          setOpenDeleteModal(false);
          qc.invalidateQueries({ queryKey: ["my-products"] });
        },
      }
    );
  };

  const pageSize = 30;
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState();
  const [brandId, setBrandId] = useState();
  const [isActive, setIsActive] = useState();
  const [isFeatured, setIsFeatured] = useState();

  const { data, isLoading, isFetching, isFetched } = useGetMyProducts({
    params: {
      page,
      pageSize,
      query,
      categoryId,
      brandId,
      isActive,
      isFeatured,
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(searchInput);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-xl font-medium">Products</h1>
          <span className="font-medium text-sm text-[#A7A7A7]">
            Add, edit, and manage your product inventory
          </span>
        </div>

        <Button
          onClick={handleClick}
          className="inline-flex text-sm items-center gap-2 bg-lime-400 text-black px-4 py-2 rounded-md font-medium hover:bg-lime-500 transition"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </Button>
      </div>

      {/* Search and Filter bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 my-6">
        <div className="relative w-full md:w-[250px] lg:w-[450px]">
          <SearchBar
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products..."
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto text-xs">
          <SelectBox
            label="Categories"
            placeholder="Select a category"
            options={[
              { label: "All Categories", value: "all" },
              ...(Categories?.data?.map((cat: any) => ({
                label: cat.name,
                value: cat.id,
              })) || []),
            ]}
            value={categoryId ?? "all"}
            onChange={(val: any) =>
              setCategoryId(val === "all" ? undefined : val)
            }
            className="w-[200px]"
          />

          <SelectBox
            label="Brands"
            placeholder="Select a brand"
            options={[
              { label: "All Brands", value: "all" },
              ...(brands?.data?.map((brand: any) => ({
                label: brand.name,
                value: brand.id,
              })) || []),
            ]}
            value={brandId ?? "all"}
            onChange={(val: any) => setBrandId(val === "all" ? undefined : val)}
            className="w-[200px]"
          />
        </div>
      </div>

      {data?.data?.length === 0 && (
        <div className="w-full h-[400px] flex flex-col items-center justify-center text-gray-500">
          <SearchX className="w-10 h-10 mb-2" />
          <p className="text-lg font-medium">No product found</p>
        </div>
      )}

      {isLoading && (
        <div className="w-full h-[400px] flex flex-col items-center justify-center text-gray-500">
          <Spinner />
        </div>
      )}

      {/* Product grid */}
      <div className="w-full sm:w-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {data?.data?.map((i: any) => {
          return (
            <div
              key={i.id}
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
                {i.stockQuantity === 0 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow">
                    Out of stock
                  </span>
                )}

                {/* Toggle Switch (show only on hover) */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={i.isActive}
                      className="sr-only peer"
                      onChange={(e) => {
                        const updatedProduct = {
                          ...i,
                          isActive: e.target.checked ? 1 : 0,
                        };
                        updateProduct(
                          {
                            body: updatedProduct,
                            productId: i.id,
                          },
                          {
                            onSuccess: () => {
                              toast.success(
                                `Product set to ${
                                  !i.isActive ? "Active" : "Inactive"
                                }`
                              );
                            },
                          }
                        );
                      }}
                    />
                    <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-lime-400 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4"></div>
                  </label>
                </div>
              </div>

              {/* Details */}
              <div className="my-3 flex flex-col gap-1">
                <h2 className="font-semibold text-base">{i.name}</h2>

                <div className="flex flex-row items-center gap-6 text-sm">
                  <p className="text-gray-500">• {i.category.name}</p>
                  <p className="text-gray-500">• {i.stockQuantity} units</p>
                </div>

                <p className="font-bold text-xl">
                  {i.currency.code} {i.price / 100}
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center mt-2">
                <Button
                  onClick={() => router.push(`/products/add-new?id=${i.id}`)}
                  className="flex items-center gap-2 bg-[#ADF802] hover:bg-lime-500 text-black px-3 py-1.5 rounded-3xl text-sm font-medium shadow w-[50%]"
                >
                  <Pen className="w-4 h-4" /> Edit
                </Button>

                <Button
                  onClick={() => {
                    setDeleteId(i.id);
                    setOpenDeleteModal(true);
                  }}
                  className="flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-500 px-3 py-2 rounded-xl"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 mb-20">
        <CustomPagination
          totalPages={data?.pagination?.totalPages}
          onPageChange={(page) => setPage(page - 1)}
        />
      </div>

      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={handleDeleteProduct}
        isLoading={isPending}
        confirmText="Delete Product"
      />
    </>
  );
};

export default Products;
