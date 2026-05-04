"use client";

import React, { useState } from "react";
import { Box, Typography, Alert, Divider } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import { payoutFormStyles } from "./payoutFormStyles";

// Import reusable components from inputs folder
import { TextInput, Button } from "@/components/inputs";

export default function DigitalPayoutForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
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
    setError("");
    setSuccess(false);
    setLoading(true);

    // Validation
    if (!formData.fullName) {
      setError("Please enter your full name.");
      setLoading(false);
      return;
    }
    if (!formData.phone) {
      setError("Please enter your phone number.");
      setLoading(false);
      return;
    }
    if (!formData.email) {
      setError("Please enter your email address.");
      setLoading(false);
      return;
    }
    if (!formData.city) {
      setError("Please enter your city.");
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Placeholder for real payout logic
      setSuccess(true);
      console.log("Payout request submitted:", formData);
    } catch (err) {
      setError("Failed to process payout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={payoutFormStyles.root}>
      <Box sx={payoutFormStyles.container}>
        <Box
          sx={payoutFormStyles.card}
          component="form"
          onSubmit={handleSubmit}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <PaymentIcon />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Payout Information
            </Typography>
          </Box>
          <Divider />
          <Typography variant="body2" sx={{ mb: 3 }}>
            Enter your details to process your payment.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Payout request submitted successfully!
            </Alert>
          )}

          {/* First row: Full Name and Phone */}
          <Box sx={payoutFormStyles.row}>
            <TextInput
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              fullWidth
              autoComplete="name"
              sx={payoutFormStyles.field}
            />
            <TextInput
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              fullWidth
              autoComplete="tel"
              sx={payoutFormStyles.field}
            />
          </Box>

          {/* Second row: Email and City */}
          <Box sx={payoutFormStyles.row}>
            <TextInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              fullWidth
              autoComplete="email"
              sx={payoutFormStyles.field}
            />
            <TextInput
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              required
              fullWidth
              autoComplete="address-level2"
              sx={payoutFormStyles.field}
            />
          </Box>

          {/* Blue Pay Now Button */}
          <Button
            type="submit"
            variant="contained"
            loading={loading}
            fullWidth
            sx={payoutFormStyles.payButton}
            startIcon={<PaymentIcon />}
          >
            Pay Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
