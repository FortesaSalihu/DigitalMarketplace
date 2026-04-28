"use client";

import React from "react";
import {
  Box,
  Typography,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import { heroStyles } from "./heroSectionStyles";

export default function HeroSection() {
  return (
    <Box component="section" sx={heroStyles.root}>
      {/* Flex layout: column on small, row on md+ */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: { xs: 4, md: 6 },
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left column */}
        <Box
          sx={{
            flex: "1 1 55%",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: { xs: "center", md: "left" },
            px: { xs: 1, md: 0 },
          }}
        >
          <Typography component="h1" sx={heroStyles.title}>
            Professional Next.js Themes & Website Templates for Any Project
          </Typography>

          <Typography sx={heroStyles.subtitle}>
            Discover thousands of easy-to-customize themes, templates & CMS
            products, made by world-class developers.
          </Typography>

          {/* Search bar with icon inside input */}
          <Box sx={heroStyles.searchContainer}>
            <OutlinedInput
              placeholder="e.g. responsive Theme"
              fullWidth
              sx={heroStyles.inputField}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    sx={heroStyles.searchIconButton}
                    aria-label="search"
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
        </Box>

        {/* Right column: image */}
        <Box
          sx={{
            flex: "0 0 45%",
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" },
            alignItems: "center",
            px: { xs: 1, md: 0 },
            width: "100%",
          }}
        >
          <Box sx={heroStyles.imageContainer}>
            <Image
              src="/image/img1.jpg"
              alt="Themes preview"
              width={900}
              height={540}
              style={{
                width: "100%",
                height: "auto",
                maxWidth: 560,
                borderRadius: 12,
                objectFit: "contain",
                display: "block",
              }}
              priority
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
