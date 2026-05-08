"use client";

import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

const SubcategoryTableMobileCards = ({ data = [], styles, onDelete }) => {
  const router = useRouter();

  const handleEdit = (id) => {
    router.push(`/dashboard/admin/subcategories/edit?id=${id}`);
  };

  return (
    <Box sx={styles.cardList}>
      {data.map((row) => (
        <Box key={row._id} sx={styles.card}>
          {/* Subcategory */}
          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Subcategory</Typography>
            <Typography sx={styles.mobileValue}>{row.name}</Typography>
          </Box>

          {/* Category */}
          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Category</Typography>
            <Typography sx={styles.mobileValue}>
              {row.category_id?.name || "-"}
            </Typography>
          </Box>

          {/* Created */}
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

      {/* Empty */}
      {data.length === 0 && (
        <Typography align="center">No subcategories found</Typography>
      )}
    </Box>
  );
};

export default SubcategoryTableMobileCards;
