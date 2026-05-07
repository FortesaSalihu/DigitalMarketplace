"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Divider,
  Paper,
  CircularProgress,
} from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useSearchParams } from "next/navigation";
import { invoiceStyles } from "./invoiceStyles";
import MobileItemCard from "./MobileItemCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import Button from "@/components/inputs/Button";
const Invoice = () => {
  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!purchase) {
    return <Typography>Invoice not found</Typography>;
  }

  const subtotal = items.reduce((acc, item) => acc + item.total, 0);

  return (
    <Paper elevation={0} sx={invoiceStyles.wrapper}>
      <Box sx={{ mb: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          size="small"
          onClick={() => router.back()}
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          Go Back
        </Button>
      </Box>
      {/* Header */}
      <Box sx={invoiceStyles.headerRow}>
        <Box>
          <Typography sx={invoiceStyles.companyTitle}>Company</Typography>
          <Typography sx={invoiceStyles.companyText}>
            ltd@example.com
          </Typography>
        </Box>

        <Box>
          <Typography sx={invoiceStyles.companyTitle}>Client</Typography>
          <Typography sx={invoiceStyles.companyText}>
            {purchase.user_id?.name}
            <br />
            {purchase.user_id?.email}
          </Typography>
        </Box>
      </Box>

      {/* Invoice Title */}
      <Box sx={invoiceStyles.invoiceTitleRow}>
        <ReceiptLongIcon sx={invoiceStyles.invoiceIcon} />
        <Typography sx={invoiceStyles.invoiceTitle}>
          Invoice #{purchase.code}
        </Typography>
      </Box>

      {/* ✅ Transaction Full Info Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Transaction ID:</strong> {transaction?._id}
        </Typography>

        <Typography variant="body2">
          <strong> Payment ID:</strong> {transaction?.payment_id}
        </Typography>

        <Typography variant="body2">
          <strong>Payment Method:</strong> {transaction?.payment_gateway}
        </Typography>

        <Typography variant="body2">
          <strong>Status:</strong> {transaction?.status}
        </Typography>

        <Typography variant="body2">
          <strong>Date:</strong>{" "}
          {new Date(transaction?.createdAt).toLocaleString()}
        </Typography>
      </Box>

      {/* Desktop Table */}
      <Box sx={invoiceStyles.desktopTable}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={invoiceStyles.th}>Product</TableCell>
              <TableCell align="center" sx={invoiceStyles.th}>
                QTY
              </TableCell>
              <TableCell align="right" sx={invoiceStyles.th}>
                Unit
              </TableCell>
              <TableCell align="right" sx={invoiceStyles.th}>
                Author (30%)
              </TableCell>
              <TableCell align="right" sx={invoiceStyles.th}>
                Amount
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {items.map((item) => {
              const commission = (item.total * 30) / 100;

              return (
                <TableRow key={item._id}>
                  <TableCell sx={invoiceStyles.td}>
                    <Typography sx={invoiceStyles.productName}>
                      {item.item_id?.name}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">{item.quantity}</TableCell>

                  <TableCell align="right">
                    ₹{item.price.toLocaleString()}
                  </TableCell>

                  <TableCell align="right">
                    ₹{commission.toLocaleString()}
                  </TableCell>

                  <TableCell align="right">
                    ₹{item.total.toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>

      {/* Mobile Cards */}
      <Box sx={invoiceStyles.mobileCards}>
        {items.map((item) => (
          <MobileItemCard key={item._id} item={item} />
        ))}
      </Box>

      <Divider sx={invoiceStyles.divider} />

      {/* Summary */}
      <Box sx={invoiceStyles.summarySection}>
        <Box sx={invoiceStyles.summaryBox}>
          <Box sx={invoiceStyles.summaryRow}>
            <Typography>Subtotal</Typography>
            <Typography>₹{subtotal.toLocaleString()}</Typography>
          </Box>

          <Box sx={invoiceStyles.summaryRow}>
            <Typography>Author Commission (30%)</Typography>
            <Typography>₹{((subtotal * 30) / 100).toLocaleString()}</Typography>
          </Box>

          <Box sx={invoiceStyles.summaryRow}>
            <Typography>Platform Earnings</Typography>
            <Typography>₹{((subtotal * 70) / 100).toLocaleString()}</Typography>
          </Box>

          <Box sx={invoiceStyles.summaryRow}>
            <Typography>Paid</Typography>
            <Typography>
              ₹{transaction?.paid_amount?.toLocaleString() || 0}
            </Typography>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Box sx={invoiceStyles.totalRow}>
            <Typography>TOTAL</Typography>
            <Typography>
              ₹{transaction?.paid_amount?.toLocaleString() || 0}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default Invoice;
