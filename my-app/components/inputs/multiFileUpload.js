"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  LinearProgress,
  Snackbar,
  Alert,
} from "@mui/material";

import { CloudUpload, Delete, AddPhotoAlternate } from "@mui/icons-material";

/* ===== FILE TYPE ICONS ===== */
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import ArchiveIcon from "@mui/icons-material/Archive";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";

import axios from "axios";
import inputStyles from "./inputStyles";

/* ===============================
   ClientOnly
================================ */
function ClientOnly({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return children;
}

/* ================= FILE ICON MAP ================= */
const FILE_ICON_MAP = {
  jpg: { icon: ImageIcon, color: "#10b981" },
  jpeg: { icon: ImageIcon, color: "#10b981" },
  png: { icon: ImageIcon, color: "#10b981" },
  bmp: { icon: ImageIcon, color: "#10b981" },

  mp4: { icon: VideoFileIcon, color: "#2563eb" },
  webm: { icon: VideoFileIcon, color: "#2563eb" },
  mov: { icon: VideoFileIcon, color: "#2563eb" },
  avi: { icon: VideoFileIcon, color: "#2563eb" },

  mp3: { icon: AudiotrackIcon, color: "#f59e0b" },
  wav: { icon: AudiotrackIcon, color: "#f59e0b" },
  ogg: { icon: AudiotrackIcon, color: "#f59e0b" },

  pdf: { icon: PictureAsPdfIcon, color: "#ef4444" },
  doc: { icon: DescriptionIcon, color: "#2563eb" },
  docx: { icon: DescriptionIcon, color: "#2563eb" },
  xls: { icon: DescriptionIcon, color: "#16a34a" },
  xlsx: { icon: DescriptionIcon, color: "#16a34a" },

  zip: { icon: ArchiveIcon, color: "#7c3aed" },
  rar: { icon: ArchiveIcon, color: "#7c3aed" },

  txt: { icon: InsertDriveFileIcon, color: "#6b7280" },
};

/* ================= HELPER ================= */
const getFileIcon = (file) => {
  const ext = file.extension || file.name?.split(".").pop()?.toLowerCase();
  const config = FILE_ICON_MAP[ext];
  if (!config) return { Icon: InsertDriveFileIcon, color: "#6b7280" };
  return { Icon: config.icon, color: config.color };
};

/* ================= UPLOAD TEXT HELPER ================= */
const getUploadText = (extensions = []) => {
  if (!extensions.length) {
    return "Upload image, video, audio, zip, pdf, etc.";
  }

  const image = ["jpg", "jpeg", "png", "bmp"];
  const video = ["mp4", "mov", "avi", "webm"];
  const audio = ["mp3", "wav", "ogg", "m4a"];
  const archive = ["zip", "rar"];

  const parts = [];

  if (extensions.some((e) => image.includes(e))) parts.push("Image");
  if (extensions.some((e) => video.includes(e))) parts.push("Video");
  if (extensions.some((e) => audio.includes(e))) parts.push("Audio");
  if (extensions.some((e) => archive.includes(e))) parts.push("ZIP");
  if (extensions.includes("pdf")) parts.push("PDF");

  return ` Drag & Drop,   Upload|| ${parts.join(", ")} files`;
};

/* ================= COMPONENT ================= */
const MultiImageUploadInput = ({
  label = "Upload Files",
  value = [],
  onChange,
  disabled = false,
  error = false,
  helperText = "",
  accept = "*/*",
  maxSize = 50 * 1024 * 1024,
  sx = {},
  categoryId,
  categories,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const showError = (message) => {
    setSnackbar({ open: true, message });
  };

  const selectedCategory = categories?.find((cat) => cat._id === categoryId);
  const allowedExtensions = selectedCategory?.fileTypes || [];

  const uploadToServer = async (file, tempId) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("categoryId", categoryId);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/author/files/file`,
      formData,
      {
        withCredentials: true,
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          onChange((prev) =>
            prev.map((f) =>
              f.tempId === tempId ? { ...f, progress: percent } : f
            )
          );
        },
      }
    );

    return res.data;
  };

  const handleFiles = async (files) => {
    if (!categoryId || !allowedExtensions.length) {
      showError("Please select a category first");
      return;
    }

    const fileArray = Array.from(files);
    const validFiles = [];
    const invalidFiles = [];

    fileArray.forEach((file) => {
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (allowedExtensions.includes(ext)) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length) {
      showError(
        `Invalid file type. Allowed: ${allowedExtensions
          .join(", ")
          .toUpperCase()}`
      );
    }

    if (!validFiles.length) return;

    setUploading(true);

    const tempFiles = validFiles.map((file) => ({
      tempId: `${file.name}-${Date.now()}`,
      name: file.name,
      size: file.size,
      mime_type: file.type,
      extension: file.name.split(".").pop()?.toLowerCase(),
      progress: 0,
    }));

    onChange([...(value || []), ...tempFiles]);

    try {
      for (const file of validFiles) {
        if (file.size > maxSize) {
          showError(
            `${file.name} exceeds the ${maxSize / 1024 / 1024}MB limit`
          );
          continue;
        }

        const tempId = tempFiles.find((f) => f.name === file.name)?.tempId;
        const uploaded = await uploadToServer(file, tempId);

        onChange((prev) =>
          prev.map((f) =>
            f.tempId === tempId ? { ...uploaded, progress: 100 } : f
          )
        );
      }
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (file) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API}/author/files/delete`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          public_id: file.path?.public_id,
          categoryId,
        }),
      });

      onChange(value.filter((v) => v._id !== file._id));
    } catch (err) {
      showError("Failed to delete file. Please try again.");
    }
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
    <ClientOnly>
      <Box sx={getStyles()}>
        <input
          type="file"
          ref={fileInputRef}
          hidden
          multiple
          accept={
            allowedExtensions.length
              ? allowedExtensions.map((e) => `.${e}`).join(",")
              : accept
          }
          disabled={disabled || uploading}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />

        <Box
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          sx={{ textAlign: "center" }}
        >
          <AddPhotoAlternate sx={{ fontSize: 68, color: "#890eeeff", mb: 1 }} />

          <Typography variant="h6">{label}</Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {getUploadText(allowedExtensions)}
          </Typography>

          <Button
            variant="contained"
            startIcon={
              uploading ? <CircularProgress size={18} /> : <CloudUpload />
            }
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || uploading}
            sx={{
              backgroundColor: "#890eeeff",
              "&:hover": { backgroundColor: "#890eeeff" },
            }}
          >
            {uploading ? "Uploading..." : "Browse Files"}
          </Button>

          {value?.length > 0 && (
            <Box sx={{ mt: 2, textAlign: "left" }}>
              {value.map((file) => {
                const { Icon, color } = getFileIcon(file);

                return (
                  <Box key={file._id || file.tempId} sx={{ mb: 1.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Icon sx={{ color, fontSize: 22 }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {file.name} • {(file.size / 1024 / 1024).toFixed(2)} MB
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={file.progress || 0}
                        sx={{
                          flexGrow: 1,
                          height: 8,
                          borderRadius: 5,
                          backgroundColor: "#ede9fe",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#890eeeff",
                          },
                        }}
                      />

                      <Typography
                        variant="caption"
                        sx={{
                          minWidth: 35,
                          fontWeight: 600,
                          color: "#890eeeff",
                        }}
                      >
                        {file.progress || 0}%
                      </Typography>

                      {file.path?.public_id && (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRemove(file)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>

        {helperText && (
          <Typography
            variant="caption"
            color={error ? "error" : "text.secondary"}
            sx={{ mt: 1, display: "block" }}
          >
            {helperText}
          </Typography>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ open: false, message: "" })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity="error"
            variant="filled"
            onClose={() => setSnackbar({ open: false, message: "" })}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ClientOnly>
  );
};

export default MultiImageUploadInput;
