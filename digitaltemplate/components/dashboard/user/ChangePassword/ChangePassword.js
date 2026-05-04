"use client";

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { changePasswordStyles } from "./changePasswordStyles";
import { toast } from "react-toastify";

import { PasswordInput, Button } from "@/components/inputs";

export default function ChangePassword() {
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
