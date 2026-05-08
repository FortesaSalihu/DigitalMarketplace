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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/inputs/Button";
import SubcategoryTableMobileCards from "./SubcategoryTableMobileCards";
import { categoryTableStyles as styles } from "./subcategoryTableStyles";

import {
  fetchSubcategories,
  deleteSubcategory,
} from "@/slice/subcategorySlice";

export default function SubcategoryTable() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { list, loading } = useSelector((state) => state.subcategories);

  /* =========================================
     Fetch subcategories on mount
  ========================================= */
  useEffect(() => {
    dispatch(fetchSubcategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this subcategory?")) {
      dispatch(deleteSubcategory(id));
    }
  };

  const handleCreateSubcategory = () => {
    router.push("/dashboard/admin/subcategories/create");
  };

  return (
    <Box sx={styles.wrapper}>
      {/* ===== Header ===== */}
      <Box sx={styles.headerRow}>
        <Typography sx={styles.headerTitle}>All Subcategories</Typography>

        <Button size="small" onClick={handleCreateSubcategory}>
          Create Subcategory
        </Button>
      </Box>

      {/* ===== Desktop Table ===== */}
      <Paper sx={styles.tablePaper}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.th}>Subcategory Name</TableCell>
              <TableCell sx={styles.th}>Category</TableCell>
              <TableCell sx={styles.th}>Created</TableCell>
              <TableCell sx={{ ...styles.th, ...styles.tdRight }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* ===== Loading ===== */}
            {loading && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            )}

            {/* ===== Empty ===== */}
            {!loading && list.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No subcategories found
                </TableCell>
              </TableRow>
            )}

            {/* ===== Rows ===== */}
            {list.map((row) => (
              <TableRow key={row._id} sx={styles.tr}>
                {/* Subcategory Name */}
                <TableCell sx={styles.td}>{row.name}</TableCell>

                {/* Parent Category */}
                <TableCell sx={styles.td}>
                  {row.category_id?.name || "-"}
                </TableCell>

                {/* Created */}
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
                        `/dashboard/admin/subcategories/edit?id=${row._id}`
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
      <SubcategoryTableMobileCards
        data={list}
        styles={styles}
        onDelete={handleDelete}
      />
    </Box>
  );
}
