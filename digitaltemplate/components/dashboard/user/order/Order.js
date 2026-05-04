"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  CircularProgress,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { licenseStyles } from "./licenseStyles";
import Button from "@/components/inputs/Button";

export default function LicenseCertificatePage() {
  if (loading) {
    return (
      <Box sx={licenseStyles.root}>
        <CircularProgress />
      </Box>
    );
  }

  if (!purchase) {
    return (
      <Box sx={licenseStyles.root}>
        <Typography>Order not found.</Typography>
      </Box>
    );
  }

  const product = purchase.item_id;

  return (
    <Box sx={licenseStyles.root}>
      <Box sx={licenseStyles.card}>
        {/* HEADER */}
        <Box sx={licenseStyles.headerRow}>
          <Box>
            <Typography variant="h6" sx={licenseStyles.title}>
              Order Details
            </Typography>
            <Typography sx={licenseStyles.subtitle}>
              Complete purchase information
            </Typography>
          </Box>

          <Button onClick={() => router.back()}>Go Back</Button>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* STATUS */}
        <Stack direction="row" spacing={2} mb={3}>
          <Chip
            label={purchase.purchase_id?.status}
            color={
              purchase.purchase_id?.status === "completed"
                ? "success"
                : "warning"
            }
          />
          <Typography>
            Order Code: <strong>{purchase.purchase_id?.code}</strong>
          </Typography>
        </Stack>

        {/* TABLE */}
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={licenseStyles.labelCell}>Product Name</TableCell>
                <TableCell>{product?.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={licenseStyles.labelCell}>Category</TableCell>
                <TableCell>{product?.category_id?.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={licenseStyles.labelCell}>Sub Category</TableCell>
                <TableCell>{product?.sub_category_id?.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={licenseStyles.labelCell}>Author</TableCell>
                <TableCell>{purchase?.author_id?.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={licenseStyles.labelCell}>
                  Purchase Date
                </TableCell>
                <TableCell>
                  {new Date(purchase?.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={licenseStyles.labelCell}>Quantity</TableCell>
                <TableCell>{purchase?.quantity}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={licenseStyles.labelCell}>Price</TableCell>
                <TableCell>${purchase?.price}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={licenseStyles.labelCell}>Total Paid</TableCell>
                <TableCell>${purchase?.total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* DOWNLOAD SECTION */}
        <Box mt={4}>
          <Typography variant="h6" mb={2}>
            Download Files
          </Typography>

          {/* External File */}
          {product?.is_main_file_external && product?.main_file && (
            <Button onClick={() => window.open(product.main_file, "_blank")}>
              Open External File
            </Button>
          )}

          {/* Single File */}
          {!product?.is_main_file_external && product?.main_file && (
            <Button component="a" href={product.main_file} download>
              Download Main File
            </Button>
          )}

          {/* Multiple Files */}
          {!product?.is_main_file_external &&
            product?.main_files?.length > 0 && (
              <Stack spacing={2} mt={2}>
                {product.main_files.map((file, index) => (
                  <Button key={index} component="a" href={file} download>
                    Download File {index + 1}
                  </Button>
                ))}
              </Stack>
            )}
        </Box>
      </Box>
    </Box>
  );
}
