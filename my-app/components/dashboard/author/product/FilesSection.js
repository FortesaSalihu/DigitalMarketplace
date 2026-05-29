"use client";

import React, { useMemo } from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";

import SelectInput from "@/components/inputs/SelectInput";
import TextInput from "@/components/inputs/TextInput";
import MultiSelectInput from "@/components/inputs/MultiSelectInput";
import MultiFileUpload from "@/components/inputs/multiFileUpload";

import styles from "./filesSectionStyles";

const IMAGE_EXT = ["png", "jpg", "jpeg", "bmp"];
const VIDEO_EXT = ["mp4", "webm", "mov", "avi"];
const AUDIO_EXT = ["mp3", "wav", "ogg"];

const FilesSection = ({
  categories,
  categoryId,
  uploadedFiles,
  onUploadedFilesChange,

  previewType,
  previewFiles,
  mainFileType,
  mainFileLink,
  mainFileUpload,
  screenshots,

  onPreviewTypeChange,
  onPreviewFilesChange,
  onMainFileTypeChange,
  onMainFileLinkChange,
  onMainFileUploadChange,
  onScreenshotsChange,
}) => {
  const previewFileOptions = useMemo(() => {
    if (!previewType) return [];

    return uploadedFiles
      .filter((file) => {
        if (previewType === "image") return IMAGE_EXT.includes(file.extension);
        if (previewType === "video") return VIDEO_EXT.includes(file.extension);
        if (previewType === "audio") return AUDIO_EXT.includes(file.extension);
        return false;
      })
      .map((file) => ({
        label: file.name,
        value: file.path?.url,
      }));
  }, [uploadedFiles, previewType]);

  /* ===== SCREENSHOTS (MULTIPLE IMAGES) ===== */
  const screenshotOptions = useMemo(() => {
    return uploadedFiles
      .filter((file) => IMAGE_EXT.includes(file.extension))
      .map((file) => ({
        label: file.name,
        value: file.path?.url,
      }));
  }, [uploadedFiles]);

  const mainFileOptions = useMemo(() => {
    return uploadedFiles.map((file) => ({
      label: `${file.name} (${file.extension.toUpperCase()})`,
      value: file.path?.url,
    }));
  }, [uploadedFiles]);

  return (
    <Paper elevation={0} sx={styles.card}>
      <Typography sx={styles.sectionTitle}>Files</Typography>
      <Divider sx={styles.divider} />

      <MultiFileUpload
        categoryId={categoryId}
        categories={categories}
        label="File Upload"
        value={uploadedFiles}
        onChange={onUploadedFilesChange}
        accept="*/*"
        helperText="Upload files based on selected category"
      />

      <Box sx={styles.field}>
        <SelectInput
          label="Preview Type"
          required
          value={previewType}
          onChange={onPreviewTypeChange}
          options={[
            { label: "Video", value: "video" },
            { label: "Image", value: "image" },
            { label: "Audio", value: "audio" },
          ]}
        />
      </Box>

      <Box sx={styles.field}>
        <SelectInput
          label="Preview File"
          value={previewFiles}
          onChange={onPreviewFilesChange}
          options={previewFileOptions}
        />
      </Box>

      <Box sx={styles.field}>
        <SelectInput
          label="Main File"
          required
          value={mainFileType}
          onChange={onMainFileTypeChange}
          options={[
            { label: "Link", value: "link" },
            { label: "Upload", value: "upload" },
          ]}
        />
      </Box>

      {mainFileType === "link" && (
        <Box sx={styles.field}>
          <TextInput
            label="Main File Link"
            placeholder="https://example.com/file.zip"
            value={mainFileLink}
            onChange={onMainFileLinkChange}
          />
        </Box>
      )}

      {mainFileType === "upload" && (
        <Box sx={styles.field}>
          <MultiSelectInput
            label="Main File Upload"
            name="main_files"
            value={mainFileUpload}
            onChange={onMainFileUploadChange}
            options={mainFileOptions}
          />
        </Box>
      )}

      <Box sx={styles.field}>
        <MultiSelectInput
          label="Screenshots"
          name="screenshots"
          value={screenshots}
          onChange={onScreenshotsChange}
          options={screenshotOptions}
        />
      </Box>
    </Paper>
  );
};

export default FilesSection;
