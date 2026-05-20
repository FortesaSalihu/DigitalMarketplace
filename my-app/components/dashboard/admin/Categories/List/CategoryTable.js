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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/inputs/Button";
import CategoryTableMobileCards from "./CategoryTableMobileCards";
import { categoryTableStyles as styles } from "./categoryTableStyles";

import { fetchCategories, deleteCategory } from "@/slice/categorySlice";

/* =========================================
   Small helper for boolean fields
========================================= */
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

export default function CategoryTable() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { list, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (confirm("Are you  sure  you  want  to delete this  category"))
      dispatch(deleteCategory(id));
  };

  const handleCreateCategory = () => {
    router.push("/dashboard/admin/categories/create");
  };

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.headerRow}>
        <Typography sx={styles.headerTitle}>All Categories</Typography>

        <Button size="small" onClick={handleCreateCategory}>
          Create Category
        </Button>
      </Box>

      <Paper sx={styles.tablePaper}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.th}>Name</TableCell>
              <TableCell sx={styles.th}>File Tyles</TableCell>
              <TableCell sx={styles.th}>Featured</TableCell>
              <TableCell sx={styles.th}>Show in Nav</TableCell>

              <TableCell sx={styles.th}>Craeted</TableCell>

              <TableCell sx={{ ...styles.th, ...styles.Right }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading.fetch && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            )}

            {!loading.fetch && list.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Categories found
                </TableCell>
              </TableRow>
            )}

            {list.map((row) => (
              <TableRow key={row._id} sx={styles.tr}>
                <TableCell sx={styles.td}>{row.name || "-"}</TableCell>
                <TableCell sx={styles.td}>
                  {row.fileTypes.map((type) => (
                    <Box key={type} component="span" sx={styles.fileBadge}>
                      {type}
                    </Box>
                  ))}
                </TableCell>
                <TableCell sx={styles.td}>
                  <BooleanChip value={row.show_at_featured} />
                </TableCell>
                <TableCell sx={styles.td}>
                  <BooleanChip value={row.show_at_nav} />
                </TableCell>

                <TableCell sx={styles.td}>
                  {new Date(row.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>

                <TableCell sx={{ ...styles.td, ...styles.tdRight }}>
                  <IconButton
                    size="small"
                    sx={styles.actionBtn}
                    onClick={() =>
                      router.push(
                        `/dashboard/admin/categories/edit?id=${row._id}`
                      )
                    }
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    size="small"
                    color="error"
                    sx={styles.actionBtn}
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

      <CategoryTableMobileCards
        data={list}
        styles={styles}
        onDelete={handleDelete}
      />
    </Box>
  );
}
