"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Link, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Import reusable components from inputs folder
import {
  TextInput,
  PasswordInput,
  Button,
  SwitchInput,
} from "@/components/inputs";

import { loginStyles } from "./loginStyles";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    alert(JSON.stringify({formData}, null, 4))

    if (!formData.email || !formData.password) {
      toast.error("email and password are required");

      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("login successful");
        router.push("/");
      }


    } catch (error) {

        toast.error("invalid email or password")

    } finally {
        setLoading(false)
    }
  };

  const handleSocial = (provider) => {
    console.log(`sign in with ${provider}`)
  }

  return (
    <Box sx={loginStyles.root}>
      <Box sx={loginStyles.header}>
        <Typography variant="body2">Home &gt; Account &gt; Login</Typography>
        <Typography variant="h5">Welcome back</Typography>
      </Box>

      <Box sx={loginStyles.container}>
        <Box sx={loginStyles.card} component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LockOpenIcon />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Sign in to your account
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ mb: 2 }}>
            Enter your credentials below to access your dashboard.
          </Typography>

          {/* Reusable TextInput */}
          <TextInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            autoComplete="username"
            sx={{ mb: 1 }}
          />

          {/* Reusable PasswordInput */}
          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            autoComplete="current-password"
            sx={{ mb: 1 }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            {/* Reusable SwitchInput for Remember me */}
            <SwitchInput
              label="Remember me"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              sx={{ mb: 0 }}
            />

            <Link href="#" underline="hover" variant="body2">
              Forgot password?
            </Link>
          </Box>

          {/* Reusable Button */}
          <Button
            type="submit"
            variant="contained"
            loading={loading}
            fullWidth
            sx={loginStyles.submitBtn}
          >
            Sign In
          </Button>

          <Box sx={{ my: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <Divider sx={{ flex: 1 }} />
            <Typography variant="body2">Or continue with</Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {/* Reusable Buttons for social login */}
            <Button
              onClick={() => handleSocial("Google")}
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ flex: 1, textTransform: "none" }}
            >
              Google
            </Button>

            <Button
              onClick={() => handleSocial("Facebook")}
              variant="outlined"
              startIcon={<FacebookIcon />}
              sx={{ flex: 1, textTransform: "none" }}
            >
              Facebook
            </Button>
          </Box>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link href="/register" underline="hover">
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
