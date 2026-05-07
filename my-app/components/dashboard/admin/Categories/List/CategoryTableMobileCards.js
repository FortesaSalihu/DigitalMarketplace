"use client";

import React from "react";
import { Box, Typography, IconButton, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

/* ===============================
   Boolean Chip (simple)
================================ */
const BooleanChip = ({ value }) => (
  <Chip
    size="small"
    label={value ? "Yes" : "No"}
    sx={{
      bgcolor: value ? "#DCFCE7" : "#FEE2E2", // light green / light red
      color: value ? "#166534" : "#991B1B", // dark green / dark red
      fontWeight: 600,
      borderRadius: "6px",
    }}
  />
);

const CategoryTableMobileCards = ({ data = [], styles, onDelete }) => {
  const router = useRouter();

  const handleEdit = (id) => {
    router.push(`/dashboard/admin/categories/edit?id=${id}`);
  };

  return (
    <Box sx={styles.cardList}>
      {data.map((row) => (
        <Box key={row._id} sx={styles.card}>
          {/* Name */}
          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Name</Typography>
            <Typography sx={styles.mobileValue}>{row.name}</Typography>
          </Box>

          {/* File Types */}
          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>File Types</Typography>
            <Typography sx={styles.mobileValue}>
              {row.fileTypes?.join(", ")}
            </Typography>
          </Box>

          {/* Featured */}
          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Featured</Typography>
            <BooleanChip value={row.show_at_featured} />
          </Box>

          {/* Show in Nav */}
          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Show in Nav</Typography>
            <BooleanChip value={row.show_at_nav} />
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
        <Typography align="center">No categories found</Typography>
      )}
    </Box>
  );
};

export default CategoryTableMobileCards;
