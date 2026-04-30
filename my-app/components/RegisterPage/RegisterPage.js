"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Link } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { toast } from "react-toastify";

import { registerStyles } from "./registerStyles";

// Reusable inputs
import TextInput from "@/components/inputs/TextInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import Button from "@/components/inputs/Button";
import SwitchInput from "@/components/inputs/SwitchInput";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!formData.fullName) {
      toast.error("please enter your full name");
      return setLoading(false);
    }
    if (!formData.email) {
      toast.error("please enter an email");
      return setLoading(false);
    }
    if (!formData.password) {
      toast.error("please enter a password");
      return setLoading(false);
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("password do not match");
      return setLoading(false);
    }

    try {
      const res = await fetch(`${process.env.API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.err || "Registraion  failed");
      }

      toast.success(data.msg || "Registraion successfully");

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
      });
    } catch (error) {
      toast.error(error.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={registerStyles.root}>
      <Box sx={registerStyles.header}>
        <Typography variant="body2">Home &gt; Account &gt; Register</Typography>
        <Typography variant="h5">Create an account</Typography>
      </Box>

      <Box sx={registerStyles.container}>
        <Box sx={registerStyles.card} component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PersonAddIcon />
            <Typography variant="h6" fontWeight={700}>
              Create your account
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ mb: 2 }}>
            Sign up to get access to all features.
          </Typography>

          <TextInput
            label="Full name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            fullWidth
          />

          <TextInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            sx={{ mt: 1 }}
          />

          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            sx={{ mt: 1 }}
          />

          <PasswordInput
            label="Confirm password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            sx={{ mt: 1 }}
          />

          <SwitchInput
            label={
              <Box component="span" sx={{ fontSize: "0.875rem" }}>
                I agree to the{" "}
                <Link href="#" sx={{ fontSize: "inherit" }}>
                  Terms & Conditions
                </Link>
              </Box>
            }
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            sx={{ mt: 1 }}
          />

          <Button
            type="submit"
            variant="contained"
            loading={loading}
            fullWidth
            sx={registerStyles.submitBtn}
          >
            Create account
          </Button>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2">
              Already have an account? <Link href="#">Sign in</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
