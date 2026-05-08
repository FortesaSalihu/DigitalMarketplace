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
  IconButton,
  CircularProgress,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/inputs/Button";
import OrderTableMobileCards from "./OrderTableMobileCards";
import { categoryTableStyles as styles } from "./orderTableStyles";

export default function OrderTable() {
  return (
    <Box sx={styles.wrapper}>
      {/* ===== Header ===== */}
      <Box sx={styles.headerRow}>
        <Typography sx={styles.headerTitle}>All Orders</Typography>
      </Box>

      {/* ===== Desktop Table ===== */}
      <Paper sx={styles.tablePaper}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.th}>User</TableCell>
              <TableCell sx={styles.th}>Code</TableCell>
              <TableCell sx={styles.th}>Paid</TableCell> {/* NEW */}
              <TableCell sx={styles.th}>Status</TableCell>
              <TableCell sx={styles.th}>Created</TableCell>
              <TableCell sx={{ ...styles.th, ...styles.tdRight }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* ===== Loading State ===== */}
            {loading.fetch && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            )}

            {/* ===== Empty State ===== */}
            {!loading.fetch && list.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No orders found
                </TableCell>
              </TableRow>
            )}

            {/* ===== Data Rows ===== */}
            {list.map((row) => (
              <TableRow key={row._id} sx={styles.tr}>
                {/* User */}
                <TableCell sx={styles.td}>
                  {row.user_id?.email || "N/A"}
                </TableCell>

                {/* Code */}
                <TableCell sx={styles.td}>{row.code}</TableCell>

                {/* Paid Amount */}
                <TableCell sx={styles.td}>${row.paid_amount || 0}</TableCell>

                {/* Status */}
                <TableCell sx={styles.td}>
                  <Chip
                    size="small"
                    label={row.status}
                    sx={{
                      bgcolor:
                        row.status === "completed"
                          ? "#DCFCE7"
                          : row.status === "cancelled"
                          ? "#FEE2E2"
                          : "#FEF9C3",
                      color:
                        row.status === "completed"
                          ? "#166534"
                          : row.status === "cancelled"
                          ? "#991B1B"
                          : "#92400E",
                      fontWeight: 600,
                      borderRadius: "6px",
                    }}
                  />
                </TableCell>

                {/* Created Date */}
                <TableCell sx={styles.td}>
                  {new Date(row.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>

                {/* Actions */}
                <TableCell sx={{ ...styles.td, ...styles.tdRight }}>
                  <IconButton
                    sx={styles.actionBtn}
                    onClick={() =>
                      router.push(
                        `/dashboard/admin/orders/invoice?id=${row._id}`
                      )
                    }
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    sx={{ color: "#B91C1C" }}
                    onClick={() => handleDelete(row._id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* ===== Mobile Cards ===== */}
      <OrderTableMobileCards
        data={list}
        styles={styles}
        onDelete={handleDelete}
      />
    </Box>
  );
}
