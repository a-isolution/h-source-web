import { getToken } from "@/lib/auth";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const AvatarUpload = () => {
  const token = getToken();
  const qc = useQueryClient();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarIsPending, setAvatarIsPending] = useState(false);

  const handleAvatarChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  const handleUpdateAvatar = async () => {
    if (!avatarFile) return;
    setAvatarIsPending(true);

    const formData = new FormData();
    formData.append("file", avatarFile);

    try {
      const response = await fetch(`${baseURL}/api/v1/auth/avatar`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Profile image updated successfully");
        qc.invalidateQueries({ queryKey: ["get-auth"] });
      } else {
        toast.error("Failed to upload avatar.");
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Something went wrong.");
    } finally {
      setAvatarIsPending(false);
    }
  };

  return (
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
        <div className="mt-2">
          <img
            src={URL.createObjectURL(avatarFile)}
            alt="Avatar Preview"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
      )}

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
  );
};

export default AvatarUpload;
