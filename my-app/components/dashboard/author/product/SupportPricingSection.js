"use client";

import React, { lazy } from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";

import SelectInput from "@/components/inputs/SelectInput";
import TextInput from "@/components/inputs/TextInput";

import styles from "./supportPricingStyles";

const SupportPricingSection = ({
  supported,
  regularPrice,
  discountPrice,
  supportMessage,
  onSupportedChange,
  onRegularPriceChange,
  onDiscountPriceChange,
  onSupportMessageChange,
}) => {
  const isSupported = supported === "yes";

  return (
    <>
      <Paper elevation={0} sx={styles.card}>
        <Typography sx={styles.sectionTitle}>Suppport</Typography>

        <Divider sx={styles.divider} />

        <Box sx={styles.field}>
          <SelectInput
            label="item will be supported"
            required
            value={supported}
            onChange={onSupportedChange}
            options={[
              {
                label: "Yes",
                value: "yes",
              },
              {
                label: "No",
                value: "no",
              },
            ]}
          />
        </Box>
      </Paper>

      <Divider sx={styles.divider} />

      {isSupported && (
        <Paper elevation={0} sx={styles.card}>
          <Typography sx={styles.sectionTitle}>
            Message to the Suppport
          </Typography>

          <Divider sx={styles.divider} />

          <Box sx={styles.fieldFull}>
            <TextInput
              label="Message"
              placeholder="write a message for  the support"
              multiline
              minRows={4}
              value={supportMessage}
              onChange={onSupportMessageChange}
            />
          </Box>
        </Paper>
      )}

      <Paper elevation={0} sx={styles.card}>
        <Typography sx={styles.sectionTitle}>Pricing</Typography>

        <Divider sx={styles.divider} />

        <Box sx={styles.grid}>
          <TextInput
            label="Regular Price"
            type="number"
            required
            value={regularPrice}
            onChange={onRegularPriceChange}
          />

          <TextInput
            label="Discount Price"
            type="number"
            value={discountPrice}
            onChange={onDiscountPriceChange}
          />
        </Box>
      </Paper>
    </>
  );
};

export default SupportPricingSection;
