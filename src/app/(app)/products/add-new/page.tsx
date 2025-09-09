"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, UploadCloud, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useGetBrands } from "@/api/brands";
import { useGetCategories } from "@/api/category";
import { useGetCurrencies } from "@/api/currency";
import { toast } from "sonner";
import {
  useCreateProduct,
  useGetProductById,
  useGetProductSizes,
  useUpdateProduct,
} from "@/api/products";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import AddBrandModal from "@/components/product/add-brand-modal";
import AddCategoryModal from "@/components/product/add-category-modal";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const CreateProduct = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const qc = useQueryClient();

  const { data } = useGetProductById({ productId });
  const { data: currencies } = useGetCurrencies();
  const { data: brands } = useGetBrands();
  const { data: categories } = useGetCategories();
  const { mutate, isPending } = useCreateProduct();
  const { mutate: editProduct, isPending: updateIsPending } =
    useUpdateProduct();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [currencyId, setCurrencyId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [sizeId, setSizeId] = useState("");
  const [isActive, setIsActive] = useState<number>(data?.isActive ?? 1);

  useEffect(() => {
    if (data && productId) {
      setName(data.name || "");
      setDescription(data.description || "");
      setStockQuantity(data.stockQuantity?.toString() || "");
      setCurrencyId(data.currencyId?.toString() || "");
      setBrandId(data.brandId?.toString() || "");
      setCategoryId(data.categoryId?.toString() || "");
      setIsActive(typeof data.isActive === "number" ? data.isActive : 1);

      if (typeof data.price === "number") {
        setPrice((data.price / 100).toFixed(2));
      } else {
        setPrice("");
      }

      setImages([]);
    }
  }, [data, productId]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!priceRegex.test(price)) {
      alert("Please enter a valid price with up to 2 decimal places.");
      return;
    }

    const priceFloat = parseFloat(price);
    const priceInt = Math.round(priceFloat * 100);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", priceInt.toString());
    formData.append("currencyId", currencyId);
    formData.append("brandId", brandId);
    formData.append("categoryId", categoryId);
    formData.append("isFeatured", "1");
    formData.append("isActive", isActive.toString()); // Use actual state value (1 or 0)
    formData.append("stockQuantity", stockQuantity);

    images.forEach((file) => {
      formData.append("files", file);
    });

    if (productId) {
      editProduct(
        { body: formData as any, productId },
        {
          onSuccess: (data) => {
            toast.success(data?.message || "Product updated successfully!");
            qc.invalidateQueries({ queryKey: ["my-products"] });
          },
        }
      );
    } else {
      mutate(
        { body: formData as any },
        {
          onSuccess: (data) => {
            toast.success(data?.message || "Product created successfully!");
            qc.invalidateQueries({ queryKey: ["my-products"] });
            // Clear form
            setName("");
            setPrice("");
            setDescription("");
            setStockQuantity("");
            setImages([]);
            setCurrencyId("");
            setBrandId("");
            setCategoryId("");
            setIsActive(1);
          },
        }
      );
    }

    // Optional: log formData for debugging
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  };

  const [openBrandModal, setOpenBrandModal] = useState(false);
  const handleAddBrand = () => setOpenBrandModal(true);

  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const handleAddCategory = () => setOpenCategoryModal(true);

  const { data: pSize } = useGetProductSizes();
  console.log(pSize, "sdfkjsf");

  return (
    <div className="p-2 sm:p-6 space-y-6">
      <div>
        <h1 className="text-xl font-medium">Products</h1>
        <span className="text-sm text-[#A7A7A7]">
          Manage your drinks and candy inventory
        </span>
      </div>

      {productId && (
        <div className="flex items-center space-x-2">
          <label htmlFor="isActiveToggle" className="cursor-pointer">
            Is Product Active:
          </label>
          <input
            id="isActiveToggle"
            type="checkbox"
            checked={isActive === 1}
            onChange={(e) => {
              setIsActive(e.target.checked ? 1 : 0);
            }}
            className="cursor-pointer"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-8">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product name"
            />
          </div>

          <div className="space-y-2">
            <Label>Brand</Label>
            <div className="flex flex-row items-center gap-2">
              <Select
                value={brandId}
                onValueChange={(value) => setBrandId(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands?.data?.map((brand: any) => (
                    <SelectItem key={brand.id} value={brand.id.toString()}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="min-w-fit">
                <Button
                  onClick={handleAddBrand}
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-1 w-fit"
                >
                  Add new
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <div className="flex flex-row items-center gap-2">
              <Select
                value={categoryId}
                onValueChange={(value) => setCategoryId(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.data?.map((cat: any) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="min-w-fit">
                <Button
                  onClick={handleAddCategory}
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-1 w-fit"
                >
                  Add new
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Product Size</Label>
            <div className="flex flex-row items-center gap-2">
              <Select
                value={sizeId}
                onValueChange={(value) => setSizeId(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a product size if applicable" />
                </SelectTrigger>
                <SelectContent>
                  {pSize?.data?.map((size: any) => (
                    <SelectItem key={size.id} value={size.id.toString()}>
                      {size.name} {size.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a product description..."
              className="w-full px-4 py-2 border rounded-sm bg-gray-50"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <Label>Price</Label>
            <Input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
          </div>

          <div className="space-y-2">
            <Label>Currency</Label>
            <Select
              value={currencyId}
              onValueChange={(value) => setCurrencyId(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies?.data?.map((cur: any) => (
                  <SelectItem key={cur.id} value={cur.id.toString()}>
                    {cur.name} ({cur.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Stock Quantity</Label>
            <Input
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              placeholder="Enter quantity"
            />
          </div>

          <div className="space-y-2">
            <Label>Upload Images</Label>
            <div className="w-full border-2 border-dashed rounded-md bg-gray-50 cursor-pointer relative">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="upload"
              />
              <label
                htmlFor="upload"
                className="flex flex-col items-center justify-center h-48"
              >
                <UploadCloud className="w-8 h-8 text-gray-400" />
                <span className="text-gray-500 text-sm mt-2">
                  {images.length > 0
                    ? `${images.length} image${
                        images.length > 1 ? "s" : ""
                      } selected`
                    : "Click to upload images"}
                </span>
              </label>
            </div>

            {images.length > 0 && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {images.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded text-sm bg-white"
                  >
                    <span className="truncate w-40">{file.name}</span>
                    <button
                      onClick={() => removeImage(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          className="bg-lime-400 min-w-32 text-black px-6 py-2 rounded-sm font-medium flex items-center gap-2 hover:bg-lime-500 transition"
        >
          {isPending || updateIsPending ? (
            <Spinner />
          ) : (
            <>
              {productId ? "Edit Product" : "Create Product"}{" "}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>

      <AddBrandModal open={openBrandModal} setOpen={setOpenBrandModal} />
      <AddCategoryModal
        open={openCategoryModal}
        setOpen={setOpenCategoryModal}
      />
    </div>
  );
};

export default CreateProduct;
