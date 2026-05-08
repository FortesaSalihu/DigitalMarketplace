"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import TextInput from "@/components/inputs/TextInput";
import SelectInput from "@/components/inputs/SelectInput";
import Button from "@/components/inputs/Button";

import { fetchCategories } from "@/slice/categorySlice";
import { createSubcategory } from "@/slice/subcategorySlice";

import styles from "./createSubcategoryStyles";
// 👆 reuse same styles to keep UI identical

const SubcategoryCreateForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { list: categories } = useSelector((state) => state.categories);
  const { loading } = useSelector((state) => state.subcategories);

  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
  });

  // ===============================
  // Fetch categories for dropdown
  // ===============================
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // ===============================
  // Handle input change
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===============================
  // Submit form
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(createSubcategory(formData));

    if (createSubcategory.fulfilled.match(result)) {
      router.push("/dashboard/admin/subcategories/list");
    }
  };

  // ===============================
  // Category dropdown options
  // ===============================
  const categoryOptions = categories.map((cat) => ({
    label: cat.category_name || cat.name,
    value: cat._id,
  }));

  return (
    <Box sx={styles.page}>
      {/* Header */}
      <Box sx={styles.header}>
        <Typography sx={styles.title}>Create Subcategory</Typography>

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
        {/* Parent Category */}
        <SelectInput
          label="Select Category"
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          options={categoryOptions}
          fullWidth
          required
        />

        <Divider sx={styles.divider} />

        {/* Subcategory Name */}
        <TextInput
          label="Subcategory Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
        />

        <Divider sx={styles.divider} />

        {/* Actions */}
        <Box sx={styles.actions}>
          <Button type="submit" loading={loading} color="success">
            Create Subcategory
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SubcategoryCreateForm;
