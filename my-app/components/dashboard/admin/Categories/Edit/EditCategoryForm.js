"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import TextInput from "@/components/inputs/TextInput";
import MultiSelectInput from "@/components/inputs/MultiSelectInput";
import SelectInput from "@/components/inputs/SelectInput";
import Button from "@/components/inputs/Button";

import { fetchCategoryById, updateCategory } from "@/slice/categorySlice";

import styles from "./createCategoryStyles";

/* ===============================
   Options
================================ */
const video = ["mp4", "mov", "avi", "webm"];
const audio = ["mp3", "wav", "ogg", "m4a"];

const FILE_TYPE_OPTIONS = [
  // 🖼️ Images
  { label: "JPG", value: "jpg" },
  { label: "JPEG", value: "jpeg" },
  { label: "PNG", value: "png" },
  { label: "BMP", value: "bmp" },

  // 📦 Archives
  { label: "ZIP", value: "zip" },
  { label: "RAR", value: "rar" },

  // 📄 Documents
  { label: "PDF", value: "pdf" },
  { label: "DOC", value: "doc" },
  { label: "DOCX", value: "docx" },
  { label: "XLS", value: "xls" },
  { label: "XLSX", value: "xlsx" },
  { label: "PPT", value: "ppt" },
  { label: "PPTX", value: "pptx" },
  { label: "TXT", value: "txt" },

  // 🎥 Video
  { label: "MP4", value: "mp4" },
  { label: "MOV", value: "mov" },
  { label: "AVI", value: "avi" },
  { label: "WEBM", value: "webm" },

  // 🎵 Audio
  { label: "MP3", value: "mp3" },
  { label: "WAV", value: "wav" },
  { label: "OGG", value: "ogg" },
  { label: "M4A", value: "m4a" },
];

const BOOLEAN_OPTIONS = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const EditCategoryForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    category_name: "",
    file_types: [],
    show_at_featured: false,
    show_at_nav: false,
  });

  const dispatch = useDispatch();

  const categoryId = searchParams.get("id");

  const { current, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchCategoryById(categoryId));
    }
  }, [categoryId, dispatch]);

  useEffect(() => {
    if (current) {
      setFormData({
        category_name: current.name || "",
        file_types: current.fileTypes || [],
        show_at_featured: current.show_at_featured ?? false,

        show_at_nav: current.show_at_nav ?? false,
      });
    }
  }, [current]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      updateCategory({
        id: categoryId,
        categoryData: formData,
      })
    );

    if (updateCategory.fulfilled.match(result)) {
      router.push("/dashboard/admin/categories/list");
    }
  };

  return (
    <Box sx={styles.page}>
      {/* Header */}
      <Box sx={styles.header}>
        <Typography sx={styles.title}>Edit Category</Typography>

        <Button
          size="small"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </Box>

      <Divider sx={styles.divider} />

      {/* Form */}
      <Box component="form" sx={styles.card} onSubmit={handleSubmit}>
        {/* Category Name */}
        <TextInput
          label="Category Name"
          name="category_name"
          value={formData.category_name}
          onChange={handleChange}
          fullWidth
        />

        <Divider sx={styles.divider} />

        {/* File Types */}
        <MultiSelectInput
          label="File Types"
          name="file_types"
          value={formData.file_types}
          options={FILE_TYPE_OPTIONS}
          onChange={handleChange}
          fullWidth
        />

        <Divider sx={styles.divider} />

        {/* Show at Featured */}
        <SelectInput
          label="Show at Featured"
          name="show_at_featured"
          value={formData.show_at_featured}
          onChange={handleChange}
          options={BOOLEAN_OPTIONS}
          fullWidth
        />

        <Divider sx={styles.divider} />

        {/* Show at Navigation */}
        <SelectInput
          label="Show at Navigation"
          name="show_at_nav"
          value={formData.show_at_nav}
          onChange={handleChange}
          options={BOOLEAN_OPTIONS}
          fullWidth
        />

        <Divider sx={styles.divider} />

        {/* Actions */}
        <Box sx={styles.actions}>
          <Button type="submit" loading={loading.update} color="success">
            Update Category
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditCategoryForm;
