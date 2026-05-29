"use client";

import React from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";

import SelectInput from "@/components/inputs/SelectInput";
import TextInput from "@/components/inputs/TextInput";
import MultiSelectInput from "@/components/inputs/MultiSelectInput";

import styles from "./categoryAttributesStyles";
import TagInput from "@/components/inputs/TagInput";

const CategoryAttributes = ({
  categoryId,
  subCategoryId,
  categories,
  subcategories,
  version,
  demoLink,
  tags,
  onCategoryChange,
  onSubCategoryChange,
  onVersionChange,
  onDemoLinkChange,
  onTagsChange,
}) => {
  return (
    <Paper elevation={0} sx={styles.card}>
      <Typography sx={styles.sectionTitle}>Category And Attributes</Typography>

      <Divider sx={styles.divider} />

      <Box sx={styles.field}>
        <SelectInput
          label="Category"
          required
          value={categoryId}
          onChange={(e) => onCategoryChange(e.target.value)}
          options={categories.map((c) => ({
            label: c.name,
            value: c._id,
          }))}
        />
      </Box>

      <Box sx={styles.field}>
        <SelectInput
          label="Sub Category"
          required
          disabled={!categoryId}
          value={subCategoryId}
          onChange={(e) => onSubCategoryChange(e.target.value)}
          options={subcategories.map((s) => ({
            label: s.name,
            value: s._id,
          }))}
        />
      </Box>

      <Box sx={styles.field}>
        <TextInput
          label="Version"
          required
          value={version}
          onChange={onVersionChange}
          placeholder="e.g 1.0.0"
        />
      </Box>

      <Box sx={styles.field}>
        <TextInput
          label="Demo Link"
          value={demoLink}
          onChange={onDemoLinkChange}
          placeholder="https://example.com"
        />
      </Box>

      <Box sx={styles.field}>
        <TagInput
          label="Tags"
          value={tags}
          onChange={(newTags) => onTagsChange(newTags)}
        />
      </Box>
    </Paper>
  );
};

export default CategoryAttributes;
