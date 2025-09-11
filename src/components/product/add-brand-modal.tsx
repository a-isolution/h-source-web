"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud } from "lucide-react";
import Spinner from "../spinner";
import { toast } from "sonner";
import { useCreateBrand } from "@/api/brands";
import { useQueryClient } from "@tanstack/react-query";

interface AddBrandModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AddBrandModal({ open, setOpen }: AddBrandModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const qc = useQueryClient();
  const { mutate, isPending } = useCreateBrand();

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!name || !description) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    // formData.append("file", file);

    mutate(
      { body: formData as any },
      {
        onSuccess: (data) => {
          toast.success(data?.message || "Brand created successfully");
          qc.invalidateQueries({ queryKey: ["brands"] });
          handleClose();
          resetForm();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[95%] sm:w-[80%] md:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Brand</DialogTitle>
          <DialogDescription className="my-2">
            Provide the brand name, description, and upload a logo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Brand Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Brand Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Coca Cola"
              disabled={isPending}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short description..."
              disabled={isPending}
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="file">Brand Logo</Label>
            <div className="border-2 border-dashed rounded-md p-4 text-center bg-gray-50">
              <input
                id="file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={isPending}
              />
              <Label
                htmlFor="file"
                className="cursor-pointer flex flex-col items-center justify-center gap-2 text-sm text-gray-600"
              >
                <UploadCloud className="w-6 h-6 text-gray-400" />
                {file ? file.name : "Click to upload logo"}
              </Label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="min-w-30 rounded-sm"
          >
            {isPending ? <Spinner /> : "Create Brand"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
