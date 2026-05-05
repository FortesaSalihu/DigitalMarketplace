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
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
    const {data: session} = useSession()

    const [values, setValues] = useState({
      fullName: "",
      email: "",
      city: "",
      address: "",
      country: "",
      profileImage: null,
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (session?.user) {
        setValues((prev) => ({
          ...prev,
          fullName: session.user.name || "",
          email: session.user.email || "",
          city: session.user.city || "",
          address: session.user.address || "",
          country: session.user.country || "",
          profileImage: session.user.avatar || null,
          createdAt: session.user.createdAt,
        }));
      }
    }, [session]);

    const handleChange = (e) => {
      setValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };

    const handleImageChange = (imageData) => {
      setValues((prev) => ({
        ...prev,
        profileImage: imageData,
      }));
    };

    const handleSubmit = async () => {
      try {
        setLoading(true);

        alert(JSON.stringify({values}, null, 4))
        const res = await fetch(`${process.env.API}/user/profile/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: values.fullName,
            email: values.email,
            city: values.city,
            address: values.address,
            country: values.country,

            avatar: values.profileImage,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Profile update failed");
        }

        alert("Profile updated successfully");
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };


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
