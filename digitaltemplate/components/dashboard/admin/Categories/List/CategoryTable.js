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
