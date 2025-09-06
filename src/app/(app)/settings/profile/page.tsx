"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useGetAuth, useUpdateAvatar, useUpdateProfile } from "@/api/auth";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, User, UserPen } from "lucide-react";
import Image from "next/image";

const ProfilePage = () => {
  const { data: userData } = useGetAuth();
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: uploadAvatar, isPending: uploading } = useUpdateAvatar();
  const { mutate: updateProfile, isPending: updating } = useUpdateProfile();

  useEffect(() => {
    if (userData) {
      setUser(userData);
      setFormData({
        fullName: userData.fullName || "",
        bio: userData.bio || "",
        email: userData.email || "",
        phone: userData.phone || "",
        ...userData,
      });
    }
  }, [userData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formData) return;

    updateProfile(formData, {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
        setUser({ ...user, ...formData });
        setIsEditing(false);
      },
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    uploadAvatar(form, {
      onSuccess: () => toast.success("Avatar updated!"),
    });
  };

  if (!formData) return null;

  return (
    <div className="flex flex-col px-6 py-4 max-w-xl gap-6">
      <h1 className="text-2xl font-bold mb-2">My Profile</h1>

      {/* Avatar */}
      <div className="flex flex-col w-fit mx-auto items-center justify-center">
        {user?.avatar ? (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={64}
            height={64}
            className="rounded-full border w-24 h-24 object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full border flex items-center justify-center bg-gray-100 text-gray-500">
            <User className="w-8 h-8" />
          </div>
        )}

        <div className="flex self-end items-end justify-end">
          <label
            htmlFor="avatar"
            className="cursor-pointer p-1 rounded-full hover:bg-gray-100 transition"
            title="Change Avatar"
          >
            <UserPen className="w-6 h-6 text-gray-600" />
          </label>

          <Input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            disabled={uploading}
            className="hidden"
          />
        </div>
      </div>

      <div className="space-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Tell us a little about yourself..."
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="flex flex-row w-full items-center justify-between">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 mt-6">
        {isEditing ? (
          <>
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              disabled={updating}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={updating}
              className="min-w-30"
            >
              {updating ? "Saving..." : "Save Changes"}
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
