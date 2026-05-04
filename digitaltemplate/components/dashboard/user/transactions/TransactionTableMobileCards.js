"use client";

import React from "react";
import { Box, Typography, Chip } from "@mui/material";

const TransactionTableMobileCards = ({ data = [], styles }) => {
  return (
    <Box sx={styles.cardList}>
      {data.map((txn) => (
        <Box key={txn._id} sx={styles.card}>
          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Order Code</Typography>
            <Typography sx={styles.mobileValue}>
              {txn.purchase_id?.code}
            </Typography>
          </Box>

          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Gateway</Typography>
            <Typography sx={styles.mobileValue}>
              {txn.payment_gateway}
            </Typography>
          </Box>

          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Payment ID</Typography>
            <Typography sx={styles.mobileValue}>{txn.payment_id}</Typography>
          </Box>

          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Amount</Typography>
            <Typography sx={styles.mobileValue}>
              {txn.paid_in_currency_icon}
              {txn.paid_amount}
            </Typography>
          </Box>

          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Status</Typography>
            <Chip
              size="small"
              label={txn.status}
              sx={{
                bgcolor:
                  txn.status === "completed"
                    ? "#DCFCE7"
                    : txn.status === "pending"
                    ? "#FEF3C7"
                    : txn.status === "cancelled"
                    ? "#FEE2E2"
                    : "#E5E7EB",
                color:
                  txn.status === "completed"
                    ? "#166534"
                    : txn.status === "pending"
                    ? "#92400E"
                    : txn.status === "cancelled"
                    ? "#991B1B"
                    : "#374151",
                fontWeight: 600,
                borderRadius: "6px",
              }}
            />
          </Box>

          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Date</Typography>
            <Typography sx={styles.mobileValue}>
              {new Date(txn.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </Typography>
          </Box>
        </Box>
      ))}

      {data.length === 0 && (
        <Typography align="center">No transactions found</Typography>
      )}
    </Box>
  );
};

export default TransactionTableMobileCards;
