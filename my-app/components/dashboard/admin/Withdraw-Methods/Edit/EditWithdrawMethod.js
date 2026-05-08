"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import TextInput from "@/components/inputs/TextInput";
import SelectInput from "@/components/inputs/SelectInput";
import Button from "@/components/inputs/Button";

import {
  fetchWithdrawMethodById,
  updateWithdrawMethod,
} from "@/slice/withdrawMethodSlice";

import styles from "./createWithdrawalMethodStyles";

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const EditWithdrawMethod = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const withdrawId = searchParams.get("id");

  const { current, loading } = useSelector((state) => state.withdrawMethods);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    minAmount: "",
    maxAmount: "",
    status: "",
  });

  /* ===============================
     Fetch Withdraw Method
  ================================ */
  useEffect(() => {
    if (withdrawId) {
      dispatch(fetchWithdrawMethodById(withdrawId));
    }
  }, [withdrawId, dispatch]);

  /* ===============================
     Populate Form
  ================================ */
  useEffect(() => {
    if (current) {
      setFormData({
        name: current.name || "",
        description: current.description || "",
        minAmount: current.minimum || "",
        maxAmount: current.maximum || "",
        status: current.status ? "active" : "inactive",
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
      updateWithdrawMethod({
        id: withdrawId,
        withdrawData: formData,
      })
    );

    if (updateWithdrawMethod.fulfilled.match(result)) {
      router.push("/dashboard/admin/withdraw-methods/list");
    }
  };

  return (
    <Box sx={styles.pageWrapper}>
      <Paper elevation={1} sx={styles.paper}>
        {/* Header */}
        <Box sx={styles.header}>
          <Typography variant="h6" fontWeight={600}>
            Edit Withdrawal Method
          </Typography>

          <Button
            size="small"
            onClick={() =>
              router.push("/dashboard/admin/withdraw-methods/list")
            }
          >
            + Go Back
          </Button>
        </Box>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <Box sx={styles.fieldWrapper}>
            <TextInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Box>

          {/* Description */}
          <Box sx={styles.fieldWrapper}>
            <TextInput
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
            />
          </Box>

          {/* Min & Max */}
          <Box sx={styles.rowWrapper}>
            <Box sx={styles.flexField}>
              <TextInput
                label="Minimum Amount"
                name="minAmount"
                type="number"
                value={formData.minAmount}
                onChange={handleChange}
              />
            </Box>

            <Box sx={styles.flexField}>
              <TextInput
                label="Maximum Amount"
                name="maxAmount"
                type="number"
                value={formData.maxAmount}
                onChange={handleChange}
              />
            </Box>
          </Box>

          {/* Status */}
          <Box sx={styles.statusWrapper}>
            <SelectInput
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={statusOptions}
            />
          </Box>

          {/* Update Button */}
          <Box sx={styles.buttonWrapper}>
            <Button type="submit" loading={loading}>
              Update
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EditWithdrawMethod;
