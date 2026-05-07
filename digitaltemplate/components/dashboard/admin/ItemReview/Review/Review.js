"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Divider,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter, useSearchParams } from "next/navigation";

import ItemDetailsTab from "./ItemDetailsTab";
import ItemHistoryTab from "./ItemHistoryTab";
import ItemStatusTab from "./ItemStatusTab";

import { styles, responsiveStyles } from "./myItemsStyles";

/* ---------- TAB PANEL ---------- */
const TabPanel = ({ value, index, children }) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    sx={{ display: value === index ? "block" : "none" }}
  >
    {children}
  </Box>
);

export default function MyItemsTabs() {
  /* ---------- UI ---------- */
  return (
    <Box sx={styles.container}>
      {/* Header */}
      <Box sx={styles.headerRow}>
        <Box sx={responsive.headerTitleBox}>
          <Typography variant="h6" sx={responsive.headerTitle}>
            My Items Details
          </Typography>
          <Typography variant="body2" sx={responsive.headerSubtitle}>
            Manage your items and products
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={!isExtraSmall && <ArrowBackIcon />}
          sx={styles.addButton}
          fullWidth={isSmallScreen}
          size={isSmallScreen ? "small" : "medium"}
          onClick={() => router.back()}
        >
          {isExtraSmall ? "GO BACK" : "BACK"}
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />
    </Box>
  );
}
