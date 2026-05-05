"use client";

import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { CloudUpload, Delete, AddPhotoAlternate } from "@mui/icons-material";
import inputStyles from "./inputStyles";

const ImageUploadInput = ({
  label = "Upload Image",
  name,
  value,
  onChange,
  disabled = false,
  error = false,
  helperText = "",
  accept = "image/*",
  maxSize = 5 * 1024 * 1024,
  sx = {},
  ...props
}) => {
  const [dragOver, setDragOver] = useState(false);

  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);

  const uploadToServer = async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch(`${process.env.API}/upload/image`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("upload failed");
    }

    //  console.log(await res.json());
    return res.json();
  };

  const deleteFromServer = async (public_id) => {
    if (!public_id) return;

    await fetch(`${process.env.API}/upload/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ public_id }),
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();

    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0];

    if (file) handleFile(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) handleFile(file);
  };

  const handleFile = async (file) => {
    if (file.size > maxSize) {
      alert(`file is too large maximum size is ${maxSize / 1024 / 2024}MB`);
    }

    try {
      setUploading(true);

      if (value?.public_id) {
        await deleteFromServer(value.public_id);
      }

      const uploaded = await uploadToServer(file);

      onChange(uploaded);
    } catch (error) {
      console.log("errorrrr=>", error);
      alert("image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (value?.public_id) {
      await deleteFromServer(value.public_id);
    }

    onChange(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const getStyles = () => {
    let styles = { ...inputStyles.container, ...inputStyles.imageUpload };
    if (dragOver)
      styles = { ...styles, ...inputStyles.imageUpload["&.dragOver"] };
    if (error) styles = { ...styles, ...inputStyles.error };
    if (disabled) styles = { ...styles, ...inputStyles.disabled };
    return { ...styles, ...sx };
  };

  return (
    <Box sx={getStyles()}>
      <input
        type="file"
        ref={fileInputRef}
        hidden
        accept={accept}
        disabled={disabled || uploading}
        onChange={handleFileChange}
        {...props}
      />

      <Box
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{ textAlign: "center" }}
      >
        <AddPhotoAlternate sx={{ fontSize: 68, color: "#890eeeff", mb: 1 }} />

        <Typography variant="h6">{label}</Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Drag & drop your image here or
        </Typography>

        <Button
          variant="contained"
          startIcon={
            uploading ? <CircularProgress size={18} /> : <CloudUpload />
          }
          onClick={triggerFileInput}
          disabled={disabled || uploading}
          sx={{
            backgroundColor: "#890eeeff",
            "&:hover": { backgroundColor: "#890eeeff" },
          }}
        >
          {uploading ? "Uploading..." : "Browse Files"}
        </Button>
      </Box>

      {/* ===== PREVIEW ===== */}
      {value && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Avatar
            src={value.url}
            sx={inputStyles.imagePreview}
            variant="rounded"
          />
          <IconButton onClick={handleRemove} color="error" size="small">
            <Delete />
          </IconButton>
        </Box>
      )}

      {helperText && (
        <Typography
          variant="caption"
          color={error ? "error" : "text.secondary"}
          sx={{ mt: 1, display: "block" }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default ImageUploadInput;