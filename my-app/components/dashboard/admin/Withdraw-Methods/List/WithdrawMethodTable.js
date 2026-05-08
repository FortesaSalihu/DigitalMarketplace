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
import WithdrawMethodMobileCards from "./WithdrawMethodMobileCards";
import { withdrawMethodTableStyles as styles } from "./withdrawMethodTableStyles";

import {
  fetchWithdrawMethods,
  deleteWithdrawMethod,
} from "@/slice/withdrawMethodSlice";

/* =========================================
   Boolean Chip (Active / Inactive)
========================================= */
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

export default function WithdrawMethodTable() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { list, loading } = useSelector((state) => state.withdrawMethods);

  /* =========================================
     Fetch withdraw methods on mount
  ========================================= */
  useEffect(() => {
    dispatch(fetchWithdrawMethods());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this withdraw method?")) {
      dispatch(deleteWithdrawMethod(id));
    }
  };

  const handleCreate = () => {
    router.push("/dashboard/admin/withdraw-methods/create");
  };

  return (
    <Box sx={styles.wrapper}>
      {/* ===== Header ===== */}
      <Box sx={styles.headerRow}>
        <Typography sx={styles.headerTitle}>All Withdraw Methods</Typography>

        <Button size="small" onClick={handleCreate}>
          Create Withdraw Method
        </Button>
      </Box>

      {/* ===== Desktop Table ===== */}
      <Paper sx={styles.tablePaper}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.th}>Name</TableCell>
              <TableCell sx={styles.th}>Minimum</TableCell>
              <TableCell sx={styles.th}>Maximum</TableCell>
              <TableCell sx={styles.th}>Status</TableCell>
              <TableCell sx={styles.th}>Created</TableCell>
              <TableCell sx={{ ...styles.th, ...styles.tdRight }}>
                Action
              </TableCell>
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
            {!loading && list.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No withdraw methods found
                </TableCell>
              </TableRow>
            )}

            {/* Data */}
            {list.map((row) => (
              <TableRow key={row._id} sx={styles.tr}>
                <TableCell sx={styles.td}>{row.name}</TableCell>

                <TableCell sx={styles.td}>₹{row.minimum}</TableCell>

                <TableCell sx={styles.td}>₹{row.maximum}</TableCell>

                <TableCell sx={styles.td}>
                  <StatusChip value={row.status} />
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
                    sx={styles.actionBtn}
                    onClick={() =>
                      router.push(
                        `/dashboard/admin/withdraw-methods/edit?id=${row._id}`
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
      <WithdrawMethodMobileCards
        data={list}
        styles={styles}
        onDelete={handleDelete}
      />
    </Box>
  );
}
