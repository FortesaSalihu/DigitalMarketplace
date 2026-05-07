"use client";

import React from "react";
import { Box, Typography, IconButton, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

const StatusChip = ({ value }) => (
  <Chip
    size="small"
    label={value ? "Active" : "Inactive"}
    sx={{
      bgcolor: value ? "#DCFCE7" : "#FEE2E2",
      color: value ? "#166534" : "#991B1B",
      fontWeight: 600,
      borderRadius: "6px",
    }}
  />
);

const WithdrawMethodMobileCards = ({ data = [], styles, onDelete }) => {
  const router = useRouter();

  const handleEdit = (id) => {
    router.push(`/dashboard/admin/withdraw-methods/edit?id=${id}`);
  };

  return (
    <Box sx={styles.cardList}>
      {data.map((row) => (
        <Box key={row._id} sx={styles.card}>
          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Name</Typography>
            <Typography sx={styles.mobileValue}>{row.name}</Typography>
          </Box>

          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Minimum</Typography>
            <Typography sx={styles.mobileValue}>₹{row.minimum}</Typography>
          </Box>

          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Maximum</Typography>
            <Typography sx={styles.mobileValue}>₹{row.maximum}</Typography>
          </Box>

          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Status</Typography>
            <StatusChip value={row.status} />
          </Box>

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

      {data.length === 0 && (
        <Typography align="center">No withdraw methods found</Typography>
      )}
    </Box>
  );
};

export default WithdrawMethodMobileCards;
