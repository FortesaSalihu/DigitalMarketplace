"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Box, Paper, Typography, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import MultiSelectInput from "@/components/inputs/MultiSelectInput";
import Button from "@/components/inputs/Button";
import { fetchItems } from "@/slice/itemSlice"; // ✅ CHANGED

const HighlightedProductSection = () => {
  const dispatch = useDispatch();
  const { list: items, loading } = useSelector(
    (state) => state.items // ✅ CHANGED
  );

  const [selectedItems, setSelectedItems] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loadingHighlighted, setLoadingHighlighted] = useState(true);

  /* =========================================
     Fetch items
  ========================================= */
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  /* =========================================
     Fetch already saved highlighted items
  ========================================= */
  useEffect(() => {
    const fetchHighlighted = async () => {
      try {
        const res = await fetch(`${process.env.API}/admin/highlighted-product`);

        const data = await res.json();

        if (data?.data?.item_ids) {
          const ids = data.data.item_ids.map((item) => item._id);
          setSelectedItems(ids);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingHighlighted(false);
      }
    };

    fetchHighlighted();
  }, []);

  /* =========================================
     Convert items to dropdown options
  ========================================= */
  const itemOptions = useMemo(() => {
    return (
      items?.map((item) => ({
        label: item.name, // change to item.name if needed
        value: item._id,
      })) || []
    );
  }, [items]);

  const handleItemChange = (e) => {
    setSelectedItems(e.target.value);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const res = await fetch(`${process.env.API}/admin/highlighted-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_ids: selectedItems, // ✅ MATCH MODEL
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert("Highlighted products updated ✅");
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
        Highlighted Products
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box mb={3}>
        <MultiSelectInput
          label="Select Highlighted Products"
          name="highlighted_products"
          value={selectedItems}
          onChange={handleItemChange}
          options={itemOptions}
          helperText="You can select multiple products"
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        loading={saving}
        disabled={loading || loadingHighlighted}
        onClick={handleSave}
      >
        Save Highlighted
      </Button>
    </Paper>
  );
};

export default HighlightedProductSection;
