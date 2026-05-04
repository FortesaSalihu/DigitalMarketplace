"use client";

import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, useTheme, useMediaQuery } from "@mui/material";

// Import components
import {
  TextInput,
  SelectInput,
  ImageUploadInput,
  Button,
} from "@/components/inputs";
import Sidebar from "./Sidebar"; // Adjust path as needed
import { useSession } from "next-auth/react";
import styles from "./profileStyles";

export default function ProfileCard() {
  const countryOptions = [
    { value: "USA", label: "USA" },
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "India", label: "India" },
  ];

  return (
    <Box sx={styles.pageWrapper}>
      <Box sx={styles.container}>
        {/* Sidebar - Now imported as separate component */}
        <Sidebar userData={values} />

        {/* Main form */}
        <Paper sx={styles.form} elevation={1}>
          <Box sx={styles.tabRow}>
            <Typography sx={styles.tabActive}>Personal Info</Typography>
          </Box>

          <Box component="form" sx={styles.formInner}>
            {/* Profile Image Upload */}

            <Box sx={{ mb: 3 }}>
              <ImageUploadInput
                label="Profile Picture"
                name="profileImage"
                value={values.profileImage}
                onChange={handleImageChange}
                multiple={false}
                helperText="Upload your profile picture (max 5MB)"
                sx={{ mb: 2 }}
              />
            </Box>

            <Box sx={styles.row}>
              <TextInput
                name="fullName"
                label="Full Name"
                value={values.fullName}
                onChange={handleChange}
                sx={styles.field}
                size="small"
              />

              <TextInput
                name="email"
                label="Email Address"
                type="email"
                value={values.email}
                onChange={handleChange}
                sx={styles.field}
                size="small"
              />
            </Box>

            <Box sx={styles.row}>
              <TextInput
                label="City"
                name="city"
                value={values.city}
                onChange={handleChange}
                sx={styles.field}
                size="small"
              />

              <TextInput
                name="address"
                label="Address"
                value={values.address}
                onChange={handleChange}
                sx={styles.field}
                size="small"
              />
            </Box>

            <Box sx={styles.row}>
              <SelectInput
                label="Country"
                name="country"
                value={values.country}
                onChange={handleChange}
                options={countryOptions}
                sx={styles.field}
                size="small"
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: isSmall ? "center" : "flex-start",
                mt: 4,
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                loading={loading}
                onClick={handleSubmit}
                sx={{ minWidth: 140 }}
              >
                Update Profile
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
