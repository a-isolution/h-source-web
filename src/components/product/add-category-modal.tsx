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
import { useQueryClient } from "@tanstack/react-query";
import { useCreateCategory } from "@/api/category";

interface AddCategoryModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AddCategoryModal({
  open,
  setOpen,
}: AddCategoryModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const queryClient = useQueryClient();
  const { mutate, isPending } = useCreateCategory();

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
  };

  const handleSubmit = () => {
    if (!name || !description) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    mutate(
      { body: formData as any },
      {
        onSuccess: (data) => {
          toast.success(data?.message || "Category created successfully!");
          queryClient.invalidateQueries({ queryKey: ["categories"] });
          handleClose();
          resetForm();
        },
        onError: (err: any) => {
          toast.error(err?.message || "Failed to create category");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription className="my-2">
            Provide the category name, description, and an optional image.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Category Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Soft Drinks"
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
            {isPending ? <Spinner /> : "Create Category"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
