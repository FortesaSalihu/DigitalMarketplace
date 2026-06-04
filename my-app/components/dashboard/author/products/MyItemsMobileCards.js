"use client";

import React from "react";
import Link from "next/link";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { styles } from "./myItemsStyles";

export default function MyItemsMobileCards({
  items,
  responsive,
  isSmallScreen,
}) {
  return (
    <Grid container spacing={responsive.cardSpacing}>
      {items.map((row) => (
        <Grid size={12} key={row.id}>
          <Card sx={responsive.card}>
            <CardContent sx={responsive.cardContent}>
              {/* 🔝 Top Section */}
              <Box sx={responsive.cardTopSection}>
                <Avatar
                  variant="rounded"
                  src={row.thumbnail}
                  alt={row.title}
                  sx={responsive.avatar}
                />

                <Box sx={responsive.cardText}>
                  <Link href={`/items/${row.id}`} style={styles.titleLink}>
                    <Typography sx={responsive.cardTitle}>
                      {row.title}
                    </Typography>
                  </Link>

                  <Typography variant="caption" sx={responsive.cardCategory}>
                    {isSmallScreen
                      ? row.category.split(" / ").pop()
                      : row.category}
                  </Typography>
                </Box>

                {/* ✏️ Edit */}
                <IconButton
                  aria-label="edit"
                  size="small"
                  sx={responsive.editButton}
                >
                  <EditIcon fontSize={isSmallScreen ? "small" : "medium"} />
                </IconButton>
              </Box>

              {/* 🔽 Bottom Section */}
              <Stack
                direction={responsive.stackDirection}
                spacing={responsive.stackSpacing}
                sx={{
                  alignItems: responsive.stackAlign,
                  justifyContent: "space-between",
                }}
              >
                {/* 💰 Price & Status */}
                <Box sx={responsive.metadataBox}>
                  <Box sx={responsive.priceBox}>
                    <AttachMoneyIcon sx={responsive.moneyIcon} />
                    <Typography sx={responsive.priceTextMobile}>
                      {row.price.regular}
                    </Typography>
                  </Box>

                  <Chip
                    label={row.status}
                    size="small"
                    sx={responsive.statusChipMobile}
                  />
                </Box>

                {/* 📅 Date */}
                <Box sx={responsive.dateBox}>
                  <CalendarTodayIcon sx={responsive.calendarIcon} />
                  <Typography variant="caption" sx={responsive.dateTextMobile}>
                    {isSmallScreen
                      ? row.publishDate.replace(", 2025", "")
                      : row.publishDate}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
