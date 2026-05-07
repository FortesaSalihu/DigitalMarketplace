"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Box, Paper, Typography, Divider } from "@mui/material";
import SelectInput from "@/components/inputs/SelectInput";
import Button from "@/components/inputs/Button";

const FeaturedAuthorSection = () => {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ Fetch All Authors
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await fetch(`${process.env.API}/admin/authors`);
        const data = await res.json();

        if (data?.success) {
          setAuthors(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAuthors();
  }, []);

  // ✅ Fetch Current Featured Author
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${process.env.API}/admin/featured-author`);
        const data = await res.json();

        if (data?.success && data.data?.author_id) {
          setSelectedAuthor(data.data.author_id._id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const authorOptions = useMemo(() => {
    return authors.map((user) => ({
      label: user.name,
      value: user._id,
    }));
  }, [authors]);

  const handleChange = (e) => {
    setSelectedAuthor(e.target.value);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const res = await fetch(`${process.env.API}/admin/featured-author`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author_id: selectedAuthor,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Featured author updated ✅");
    } catch (error) {
      alert(error.message);
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
        Featured Author
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box mb={3}>
        <SelectInput
          label="Select Featured Author"
          name="featured_author"
          value={selectedAuthor}
          onChange={handleChange}
          options={authorOptions}
          helperText="Select one author"
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        loading={saving}
        disabled={loading || !selectedAuthor}
        onClick={handleSave}
      >
        Save Featured
      </Button>
    </Paper>
  );
};

export default FeaturedAuthorSection;
