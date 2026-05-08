"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Box, Paper, Typography, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import MultiSelectInput from "@/components/inputs/MultiSelectInput";
import Button from "@/components/inputs/Button";
import { fetchCategories } from "@/slice/categorySlice";

const FeaturedProductSection = () => {
  const dispatch = useDispatch();
  const { list: categories, loading } = useSelector(
    (state) => state.categories
  );

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  /* =========================================
     Fetch categories
  ========================================= */
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  /* =========================================
     Fetch already saved featured categories
  ========================================= */
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${process.env.API}/admin/featured-product`);
        const data = await res.json();

        if (data?.data?.categories) {
          // Extract only IDs
          const ids = data.data.categories.map((cat) => cat._id);
          setSelectedCategories(ids);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingFeatured(false);
      }
    };

    fetchFeatured();
  }, []);

  /* =========================================
     Convert categories to options
  ========================================= */
  const categoryOptions = useMemo(() => {
    return (
      categories?.map((cat) => ({
        label: cat.name,
        value: cat._id,
      })) || []
    );
  }, [categories]);

  const handleCategoryChange = (e) => {
    setSelectedCategories(e.target.value);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const res = await fetch(`${process.env.API}/admin/featured-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categories: selectedCategories,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert("Featured categories updated ✅");
    } catch (error) {
      alert(error.message || "Error ❌");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        mt: 3,
      }}
    >
      <Typography fontSize="16px" fontWeight={600}>
        Featured Product
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box mb={3}>
        <MultiSelectInput
          label="Select Featured Categories"
          name="featured_categories"
          value={selectedCategories}
          onChange={handleCategoryChange}
          options={categoryOptions}
          helperText="You can select multiple categories"
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        loading={saving}
        disabled={loading || loadingFeatured}
        onClick={handleSave}
      >
        Save Featured
      </Button>
    </Paper>
  );
};

export default FeaturedProductSection;
