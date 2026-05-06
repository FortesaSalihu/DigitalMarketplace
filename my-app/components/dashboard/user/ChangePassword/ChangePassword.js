"use client";

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { changePasswordStyles } from "./changePasswordStyles";
import { toast } from "react-toastify";

import { PasswordInput, Button } from "@/components/inputs";
import { FallbackMode } from "next/dist/lib/fallback";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!formData.currentPassword) {
      toast.error("Pleade enter  your current password");

      setLoading(false);
      return;
    }

    if (!formData.newPassword) {
      toast.error("Please enter a new password");
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("new passowrd must be at least 6 character long");

      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("new paswords do not match");

      setLoading(false);

      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      toast.error("new password must be  diffrent from  current password");

      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.API}/user/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "failed  to change password");
      }

      toast.success("password changed successfully");

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.message || "something  went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={changePasswordStyles.root}>
      <Box sx={changePasswordStyles.container}>
        <Box
          sx={changePasswordStyles.card}
          component="form"
          onSubmit={handleSubmit}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <LockResetIcon />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Update your password
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ mb: 3 }}>
            Create a new strong password to keep your account secure.
          </Typography>

          {/* Current Password */}
          <PasswordInput
            label="Current Password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Enter your current password"
            required
            fullWidth
            autoComplete="current-password"
            sx={{ mb: 2 }}
          />

          {/* New Password */}
          <PasswordInput
            label="New Password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter your new password"
            required
            fullWidth
            autoComplete="new-password"
            sx={{ mb: 2 }}
            helperText="Password must be at least 6 characters long"
          />

          {/* Confirm New Password */}
          <PasswordInput
            label="Confirm New Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your new password"
            required
            fullWidth
            autoComplete="new-password"
            sx={{ mb: 3 }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            loading={loading}
            fullWidth
            sx={changePasswordStyles.submitBtn}
          >
            Update Password
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
