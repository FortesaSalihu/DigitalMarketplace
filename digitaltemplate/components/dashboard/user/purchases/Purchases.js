"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Stack,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { cartStyles } from "./purchasesStyles";
import { useRouter } from "next/navigation";

export default function PurchasesPage() {
  return (
    <Box sx={cartStyles.root}>
      <Box sx={cartStyles.container}>
        <Box sx={cartStyles.card}>
          {/* TITLE */}
          <Typography
            variant="h6"
            fontWeight={700}
            mb={2}
            sx={{ color: "#890eeeff" }}
          >
            My Purchases
          </Typography>

          {/* LOADING */}
          {loading ? (
            <Box textAlign="center" py={4}>
              <CircularProgress />
            </Box>
          ) : items.length === 0 ? (
            <Typography textAlign="center" py={4}>
              No purchases found
            </Typography>
          ) : (
            <TableContainer component={Paper} elevation={0}>
              <Table>
                {!isMobile && (
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Details</TableCell>
                      <TableCell align="center">Price</TableCell>
                      <TableCell align="center">View</TableCell>
                    </TableRow>
                  </TableHead>
                )}

                <TableBody>
                  {items.map((purchase) => {
                    const product = purchase?.item_id;

                    // SAFELY GET DATE
                    const publishDate =
                      purchase?.createdAt || product?.createdAt;

                    return (
                      <TableRow key={purchase?._id}>
                        <TableCell>
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            {/* IMAGE */}
                            {product?.preview_type === "image" &&
                              product?.preview_image && (
                                <Box
                                  component="img"
                                  src={product.preview_image}
                                  alt={product?.name}
                                  sx={{
                                    width: 100,
                                    height: 70,
                                    borderRadius: 2,
                                    objectFit: "cover",
                                  }}
                                />
                              )}

                            {/* VIDEO */}
                            {product?.preview_type === "video" &&
                              product?.preview_video && (
                                <Box
                                  component="video"
                                  src={product.preview_video}
                                  muted
                                  loop
                                  playsInline
                                  preload="metadata"
                                  sx={{
                                    width: 100,
                                    height: 70,
                                    borderRadius: 2,
                                    objectFit: "cover",
                                    cursor: "pointer",
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.play()}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.pause();
                                    e.currentTarget.currentTime = 0;
                                  }}
                                />
                              )}

                            {/* AUDIO */}
                            {product?.preview_type === "audio" &&
                              product?.preview_audio && (
                                <audio
                                  src={product.preview_audio}
                                  controls
                                  style={{ width: 150 }}
                                />
                              )}

                            {/* INFO */}
                            <Box>
                              <Typography fontWeight={600}>
                                {product?.name}
                              </Typography>

                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Category: {product?.category_id?.name}
                              </Typography>

                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Author: {purchase?.author_id?.name}
                              </Typography>

                              {/* SAFE PUBLISH DATE */}
                              {publishDate && (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Published:{" "}
                                  {new Date(publishDate).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )}
                                </Typography>
                              )}
                            </Box>
                          </Stack>
                        </TableCell>

                        {/* PRICE */}
                        {!isMobile && (
                          <TableCell align="center">
                            <Typography fontWeight={700} color="#890eeeff">
                              ${purchase?.price}
                            </Typography>
                          </TableCell>
                        )}

                        {/* VIEW ICON */}
                        <TableCell align="center">
                          <IconButton
                            sx={{
                              color: "#890eeeff",
                              "&:hover": {
                                backgroundColor: "rgba(137,14,238,0.08)",
                              },
                            }}
                            onClick={() =>
                              router.push(
                                `/dashboard/user/order-deatils?id=${purchase._id}`
                              )
                            }
                          >
                            <Visibility />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </Box>
  );
}
