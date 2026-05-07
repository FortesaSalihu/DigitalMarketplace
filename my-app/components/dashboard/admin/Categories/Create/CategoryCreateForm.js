"use client";

import React, { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import TextInput from "@/components/inputs/TextInput";
import MultiSelectInput from "@/components/inputs/MultiSelectInput";
import SelectInput from "@/components/inputs/SelectInput";
import Button from "@/components/inputs/Button";
import { createCategory } from "@/slice/categorySlice";
import styles from "./createCategoryStyles";

const FILE_TYPE_OPTIONS = [
  { label: "JPG", value: "jpg" },
  { label: "JPEG", value: "jpeg" },
  { label: "PNG", value: "png" },
  { label: "BMP", value: "bmp" },
  { label: "ZIP", value: "zip" },
  { label: "RAR", value: "rar" },
  { label: "PDF", value: "pdf" },
  { label: "DOC", value: "doc" },
  { label: "DOCX", value: "docx" },
  { label: "XLS", value: "xls" },
  { label: "XLSX", value: "xlsx" },
  { label: "PPT", value: "ppt" },
  { label: "PPTX", value: "pptx" },
  { label: "TXT", value: "txt" },
];

const BOOLEAN_OPTIONS = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];
