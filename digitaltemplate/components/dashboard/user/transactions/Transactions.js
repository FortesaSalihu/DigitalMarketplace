"use client";

import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { transactionTableStyles as styles } from "./transactionTableStyles";
import TransactionTableMobileCards from "./TransactionTableMobileCards";

export default function TransactionTable() {
  return (
    <Box sx={styles.wrapper}>
      {/* Header */}
      <Box sx={styles.headerRow}>
        <Typography sx={styles.headerTitle}>My Transactions</Typography>
      </Box>

      {/* Desktop Table */}
      <Paper sx={styles.tablePaper}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.th}>Order Code</TableCell>
              <TableCell sx={styles.th}>Gateway</TableCell>
              <TableCell sx={styles.th}>Payment ID</TableCell>
              <TableCell sx={styles.th}>Amount</TableCell>
              <TableCell sx={styles.th}>Status</TableCell>
              <TableCell sx={styles.th}>Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Loading */}
            {loading && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            )}

            {/* Empty */}
            {!loading && transactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No transactions found
                </TableCell>
              </TableRow>
            )}

            {/* Data */}
            {transactions.map((txn) => (
              <TableRow key={txn._id} sx={styles.tr}>
                <TableCell sx={styles.td}>{txn.purchase_id?.code}</TableCell>

                <TableCell sx={styles.td}>{txn.payment_gateway}</TableCell>

                <TableCell sx={styles.td}>{txn.payment_id}</TableCell>

                <TableCell sx={styles.td}>
                  {/* {txn.paid_in_currency_icon} */}${txn.paid_amount}
                </TableCell>

                <TableCell sx={styles.td}>
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
                </TableCell>

                <TableCell sx={styles.td}>
                  {new Date(txn.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Mobile Cards */}
      <TransactionTableMobileCards data={transactions} styles={styles} />
    </Box>
  );
}
