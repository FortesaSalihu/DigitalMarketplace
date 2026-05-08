"use client";

import { Box, Typography, Paper, Chip, CircularProgress } from "@mui/material";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/inputs/Button";
import SelectInput from "@/components/inputs/SelectInput";

import styles from "./withdrawViewStyles";

export default function WithdrawViewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.API}/admin/withdrawals/${id}`);
        const result = await res.json();

        if (res.ok) {
          setData(result.data);
          setStatus(result.data.status);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  /* ===============================
     Update Status (PUT Request)
  =============================== */
  const handleUpdate = async () => {
    if (!status) return;

    try {
      setUpdating(true);

      const res = await fetch(`${process.env.API}/admin/withdrawals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Update failed");
        return;
      }

      // Update local state after success
      setData((prev) => ({
        ...prev,
        status,
      }));

      alert("Status updated successfully");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return <Typography sx={{ p: 4 }}>Not found</Typography>;
  }

  return (
    <Box sx={styles.wrapper}>
      {/* Header */}
      <Box sx={styles.headerRow}>
        <Typography sx={styles.title}>Withdraw Details</Typography>

        <Button size="small" onClick={() => router.back()}>
          ← Go Back
        </Button>
      </Box>

      <Paper sx={styles.card}>
        {/* Author */}
        <Box sx={styles.row}>
          <Typography sx={styles.label}>Author</Typography>
          <Box sx={styles.value}>
            <Typography>{data.author_id?.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {data.author_id?.email}
            </Typography>
          </Box>
        </Box>

        {/* Current Balance */}
        <Box sx={styles.row}>
          <Typography sx={styles.label}>Current Balance</Typography>
          <Typography sx={styles.value}>
            ${data.author_id?.balance || 0}
          </Typography>
        </Box>

        {/* Withdraw Amount */}
        <Box sx={styles.row}>
          <Typography sx={styles.label}>Withdraw Amount</Typography>
          <Typography sx={styles.value}>${data.amount}</Typography>
        </Box>

        {/* Payment Method */}
        <Box sx={styles.row}>
          <Typography sx={styles.label}>Payment Method</Typography>
          <Typography sx={styles.value}>{data.method?.name}</Typography>
        </Box>

        {/* Account Info */}
        <Box sx={styles.row}>
          <Typography sx={styles.label}>Account Information</Typography>
          <Typography sx={styles.value}>{data.account}</Typography>
        </Box>

        {/* Status */}
        <Box sx={styles.row}>
          <Typography sx={styles.label}>Status</Typography>
          <Chip
            label={data.status}
            size="small"
            sx={{
              bgcolor:
                data.status === "paid"
                  ? "#DCFCE7"
                  : data.status === "rejected"
                  ? "#FEE2E2"
                  : "#FEF9C3",
              color:
                data.status === "paid"
                  ? "#166534"
                  : data.status === "rejected"
                  ? "#991B1B"
                  : "#854D0E",
              fontWeight: 600,
              textTransform: "capitalize",
            }}
          />
        </Box>

        {/* Created */}
        <Box sx={styles.row}>
          <Typography sx={styles.label}>Created At</Typography>
          <Typography sx={styles.value}>
            {new Date(data.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Typography>
        </Box>

        {/* Action */}
        {/* <Box sx={styles.actionRow}>
          <SelectInput
            label="Status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              { label: "Pending", value: "pending" },
              { label: "Paid", value: "paid" },
              { label: "Rejected", value: "rejected" },
            ]}
          />

          <Button
            onClick={handleUpdate}
            loading={updating}
            disabled={status === data.status}
          >
            Update
          </Button>
        </Box>
 */}

        {/* Action */}
        {data.status === "pending" && (
          <Box sx={styles.actionRow}>
            <SelectInput
              label="Status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={[
                { label: "Paid", value: "paid" },
                { label: "Rejected", value: "rejected" },
              ]}
            />

            <Button
              onClick={handleUpdate}
              loading={updating}
              disabled={!status || status === "pending"}
            >
              Update
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
