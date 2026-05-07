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
  IconButton,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { withdrawMethodTableStyles as styles } from "./withdrawMethodTableStyles";

/* =========================================
   Status Chip (pending / paid / rejected)
========================================= */
const StatusChip = ({ value }) => {
  const colors = {
    pending: { bg: "#FEF9C3", color: "#854D0E" },
    paid: { bg: "#DCFCE7", color: "#166534" },
    rejected: { bg: "#FEE2E2", color: "#991B1B" },
  };

  const selected = colors[value] || colors.pending;

  return (
    <Chip
      size="small"
      label={value}
      sx={{
        bgcolor: selected.bg,
        color: selected.color,
        fontWeight: 600,
        borderRadius: "6px",
        textTransform: "capitalize",
      }}
    />
  );
};

export default function WithdrawalsTable() {
  return (
    <Box sx={styles.wrapper}>
      {/* ===== Header ===== */}
      <Box sx={styles.headerRow}>
        <Typography sx={styles.headerTitle}>All Withdraw Requests</Typography>
      </Box>

      <Paper sx={styles.tablePaper}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.th}>User</TableCell>
              <TableCell sx={styles.th}>Amount</TableCell>
              <TableCell sx={styles.th}>Method</TableCell>
              <TableCell sx={styles.th}>Account</TableCell>
              <TableCell sx={styles.th}>Status</TableCell>
              <TableCell sx={styles.th}>Created</TableCell>
              <TableCell sx={{ ...styles.th, textAlign: "right" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* ===== Loading ===== */}
            {loading && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            )}

            {/* ===== Empty ===== */}
            {!loading && list.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No withdrawals found
                </TableCell>
              </TableRow>
            )}

            {/* ===== Data ===== */}
            {!loading &&
              list.map((row) => (
                <TableRow key={row._id} sx={styles.tr}>
                  {/* User */}
                  <TableCell sx={styles.td}>
                    {row.author_id?.name || "Unknown"}
                  </TableCell>

                  {/* Amount */}
                  <TableCell sx={styles.td}>${row.amount}</TableCell>

                  {/* Method */}
                  <TableCell sx={styles.td}>
                    {row.method?.name || "-"}
                  </TableCell>

                  {/* Account */}
                  <TableCell sx={styles.td}>{row.account}</TableCell>

                  {/* Status */}
                  <TableCell sx={styles.td}>
                    <StatusChip value={row.status} />
                  </TableCell>

                  {/* Created Date */}
                  <TableCell sx={styles.td}>
                    {row.createdAt
                      ? new Date(row.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "-"}
                  </TableCell>

                  {/* Action */}
                  <TableCell sx={{ ...styles.td, textAlign: "right" }}>
                    <IconButton
                      sx={styles.actionBtn}
                      onClick={() =>
                        router.push(
                          `/dashboard/admin/withdrawals/view?id=${row._id}`
                        )
                      }
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
