"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import TextInput from "@/components/inputs/TextInput";
import SelectInput from "@/components/inputs/SelectInput";
import Button from "@/components/inputs/Button";

import {
  fetchSubcategoryById,
  updateSubcategory,
} from "@/slice/subcategorySlice";
import { fetchCategories } from "@/slice/categorySlice";

// 👇 reuse SAME styles to keep UI identical
import styles from "./createSubcategoryStyles";

const EditSubcategoryForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const subcategoryId = searchParams.get("id");

  const { current, loading } = useSelector((state) => state.subcategories);

  const { list: categories } = useSelector((state) => state.categories);

  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
  });

  /* ===============================
     Fetch data
  ================================ */
  useEffect(() => {
    if (subcategoryId) {
      dispatch(fetchSubcategoryById(subcategoryId));
    }
    dispatch(fetchCategories());
  }, [subcategoryId, dispatch]);

  /* ===============================
     Populate form
  ================================ */
  useEffect(() => {
    if (current) {
      setFormData({
        category_id: current.category_id?._id || current.category_id || "",
        name: current.name || "",
      });
    }
  }, [current]);

  /* ===============================
     Handle change
  ================================ */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ===============================
     Submit
  ================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      updateSubcategory({
        id: subcategoryId,
        subcategoryData: formData,
      })
    );

    if (updateSubcategory.fulfilled.match(result)) {
      router.push("/dashboard/admin/subcategories/list");
    }
  };

  /* ===============================
     Category dropdown options
  ================================ */
  const categoryOptions = categories.map((cat) => ({
    label: cat.category_name || cat.name,
    value: cat._id,
  }));

  return (
    <Box sx={styles.page}>
      {/* Header */}
      <Box sx={styles.header}>
        <Typography sx={styles.title}>Edit Subcategory</Typography>

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
            Update Subcategory
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditSubcategoryForm;
