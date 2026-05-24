"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Button from "@/components/inputs/Button";
import SelectInput from "@/components/inputs/SelectInput";
import { fetchCategories } from "@/slice/categorySlice";

const CreateItemModal = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const { list: categories, loading } = useSelector(
    (state) => state.categories
  );

  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (open) {
      dispatch(fetchCategories());
    }
  }, [open, dispatch]);

  const handleChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handleSubmit = () => {
    if (!categoryId) return;

    const selectedCategory = categories.find((cat) => cat._id === categoryId);

    if (!selectedCategory) return;

    router.push(
      `/dashboard/author/product/create?category=${selectedCategory.slug}`
    );

    onClose();
    setCategoryId("");
  };

  const categoryOptions = categories.map((cat) => ({
    label: cat.name,
    value: cat._id,
  }));

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Item</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <SelectInput
            label="Category"
            name="category_id"
            value={categoryId}
            onChange={handleChange}
            options={categoryOptions}
            disabled={loading}
          />
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2,
        }}
      >
        <Button variant="text" onClick={onClose}>
          Cancel
        </Button>

        <Button variant="text" onClick={handleSubmit}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateItemModal;
