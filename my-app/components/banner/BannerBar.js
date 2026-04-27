// components/Banner/BannerBar.jsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Box, Typography, Button, IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import bannerStyles from "./bannerStyles";

export default function BannerBar() {
  const [open, setOpen] = React.useState(true);
  if (!open) return null;

  return (
    <Box
      component="section"
      sx={bannerStyles.root}
      role="region"
      aria-label="Promo banner"
    >
      <Box sx={bannerStyles.inner}>
        <Typography component="span" sx={bannerStyles.text}>
          Flash Sale Offer
        </Typography>

        <Typography component="span" sx={bannerStyles.offText}>
          95% OFF
        </Typography>

        <Button
          component={Link}
          href="/shop"
          sx={bannerStyles.ctaButton}
          aria-label="Shop Now"
        >
          Shop Now
        </Button>

        <IconButton
          size="small"
          onClick={() => setOpen(false)}
          aria-label="Close banner"
          sx={bannerStyles.closeBtn}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
