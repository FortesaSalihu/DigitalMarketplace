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
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";

import { useEffect, useState } from "react";

import { subscriberTableStyles as styles } from "./subscriberTableStyles";
import SubscriberTableMobileCards from "./SubscriberTableMobileCards";

export default function SubscriberTable() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingId, setSendingId] = useState(null);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.API}/admin/newsletter`);
      const data = await res.json();

      if (data.success) {
        setList(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;

    await fetch(`${process.env.API}/admin/newsletter/${id}`, {
      method: "DELETE",
    });

    setList((prev) => prev.filter((item) => item._id !== id));
  };

  /* ===============================
     Send Newsletter Email
  =============================== */
  const handleSendEmail = async (subscriber) => {
    try {
      setSendingId(subscriber._id);

      await fetch(`${process.env.API}/admin/newsletter/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: subscriber.email,
          name: subscriber.email.split("@")[0],
        }),
      });

      alert("Email sent successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to send email");
    } finally {
      setSendingId(null);
    }
  };

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.headerRow}>
        <Typography sx={styles.headerTitle}>All Subscribers</Typography>
      </Box>

      <Paper sx={styles.tablePaper}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.th}>Email</TableCell>
              <TableCell sx={styles.th}>Subscribed Date</TableCell>
              <TableCell sx={{ ...styles.th, ...styles.tdRight }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              list.map((row) => (
                <TableRow key={row._id} sx={styles.tr}>
                  <TableCell sx={styles.td}>{row.email}</TableCell>

                  <TableCell sx={styles.td}>
                    {new Date(row.subscribedAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>

                  <TableCell sx={{ ...styles.td, ...styles.tdRight }}>
                    {/* Send Email */}
                    <IconButton
                      sx={{ color: "#2563EB" }}
                      onClick={() => handleSendEmail(row)}
                    >
                      {sendingId === row._id ? (
                        <CircularProgress size={18} />
                      ) : (
                        <EmailIcon fontSize="small" />
                      )}
                    </IconButton>

                    {/* Delete */}
                    <IconButton
                      sx={{ color: "#B91C1C" }}
                      onClick={() => handleDelete(row._id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>

      <SubscriberTableMobileCards data={list} onDelete={handleDelete} />
    </Box>
  );
}
