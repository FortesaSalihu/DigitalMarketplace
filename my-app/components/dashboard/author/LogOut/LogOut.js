"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@mui/material/Button";
import Logout from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckCircle from "@mui/icons-material/CheckCircle";
import logoutStyles from "./logoutStyles";

export default function StylishLogoutPage() {
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const styles = logoutStyles;

  const handleSignOut = async () => {
    setIsLoggingOut(true);

    setTimeout(async () => {
      await signOut({
        redirect: false,
        callbackUrl: "/login",
      });

      setIsLoggingOut(false);

      setIsLoggedOut(true);

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }, 1500);
  };

  const handleCancel = () => {
    router.back();
  };
  // Success state
  if (isLoggedOut) {
    return (
      <Box sx={styles.rootContainer}>
        <Box sx={styles.successCard}>
          <Box sx={styles.successIcon}>
            <CheckCircle sx={{ fontSize: 40, color: "white" }} />
          </Box>

          <Typography variant="h3" sx={styles.logoutTitle}>
            Successfully Logged Out
          </Typography>

          <Typography variant="body1" sx={styles.logoutMessage}>
            You have been successfully logged out of your account. Redirecting
            to login page...
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Box sx={styles.loadingSpinner}></Box>
          </Box>
        </Box>
      </Box>
    );
  }

  // Main logout state
  return (
    <Box sx={styles.rootContainer}>
      <Box sx={styles.logoutCard}>
        {/* Animated Icon */}
        <Box sx={styles.logoutIcon}>
          <Logout sx={{ fontSize: 40, color: "white" }} />
        </Box>

        {/* Title */}
        <Typography variant="h3" sx={styles.logoutTitle}>
          Ready to Leave?
        </Typography>

        {/* Message */}
        <Typography variant="body1" sx={styles.logoutMessage}>
          Are you sure you want to sign out? You'll need to log in again to
          access your account.
        </Typography>

        {/* Buttons Container */}
        <Box sx={styles.logoutButtons}>
          {/* Cancel Button */}
          <Button
            onClick={handleCancel}
            disabled={isLoggingOut}
            variant="outlined"
            size="large"
            sx={{
              ...styles.customButton,
              ...styles.buttonSecondary,
              ...styles.focusRing,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              borderWidth: 2,
              "&:hover": {
                borderWidth: 2,
              },
              ...(isLoggingOut && styles.disabledButton),
            }}
          >
            Stay Signed In
          </Button>

          {/* Sign Out Button */}
          <Button
            onClick={handleSignOut}
            disabled={isLoggingOut}
            variant="contained"
            size="large"
            startIcon={
              isLoggingOut ? <Box sx={styles.loadingSpinner}></Box> : <Logout />
            }
            sx={{
              ...styles.customButton,
              ...styles.buttonPrimary,
              ...styles.focusRing,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              "&:hover": {
                background: "linear-gradient(135deg, #7a0dd6 0%, #9540e6 100%)",
              },
              ...(isLoggingOut && styles.disabledButton),
            }}
          >
            {isLoggingOut ? "Signing Out..." : "Sign Out"}
          </Button>
        </Box>

        {/* Footer */}
        <Box sx={styles.footerText}>
          <Typography variant="caption">
            Secure • Encrypted • Protected
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
