"use client";

import React from "react";
import { Box, Typography, IconButton, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

/* ===============================
   Status Chip (for orders)
================================ */
const StatusChip = ({ status }) => (
  <Chip
    size="small"
    label={status}
    sx={{
      bgcolor:
        status === "completed"
          ? "#DCFCE7"
          : status === "cancelled"
          ? "#FEE2E2"
          : "#FEF9C3",
      color:
        status === "completed"
          ? "#166534"
          : status === "cancelled"
          ? "#991B1B"
          : "#92400E",
      fontWeight: 600,
      borderRadius: "6px",
    }}
  />
);

const OrderTableMobileCards = ({ data = [], styles, onDelete }) => {
  const router = useRouter();

  const handleEdit = (id) => {
    router.push(`/dashboard/admin/orders/edit?id=${id}`);
  };

  return (
    <Box sx={styles.cardList}>
      {data.map((row) => (
        <Box key={row._id} sx={styles.card}>
          {/* User */}
          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>User</Typography>
            <Typography sx={styles.mobileValue}>
              {row.user_id?.email || "N/A"}
            </Typography>
          </Box>

          {/* Code */}
          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Code</Typography>
            <Typography sx={styles.mobileValue}>{row.code}</Typography>
          </Box>

          {/* Paid Amount (NEW) */}
          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Paid</Typography>
            <Typography
              sx={{
                ...styles.mobileValue,
                fontWeight: 600,
              }}
            >
              ₹{row.paid_amount || 0}
            </Typography>
          </Box>

          {/* Status */}
          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Status</Typography>
            <StatusChip status={row.status} />
          </Box>

          {/* Created Date */}
          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Created</Typography>
            <Typography sx={styles.mobileValue}>
              {new Date(row.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </Typography>
          </Box>

          {/* Actions */}
          <Box sx={styles.mobileActions}>
            <IconButton
              sx={styles.mobileActionBtn}
              onClick={() => handleEdit(row._id)}
            >
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton
              sx={{
                ...styles.mobileActionBtn,
                ...styles.mobileDeleteBtn,
              }}
              onClick={() => onDelete(row._id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      ))}

      {/* Empty State */}
      {data.length === 0 && (
        <Typography align="center">No orders found</Typography>
      )}
    </Box>
  );
};

export default OrderTableMobileCards;
