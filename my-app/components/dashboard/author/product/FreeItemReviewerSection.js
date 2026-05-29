"use client";

import React from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";

import SelectInput from "@/components/inputs/SelectInput";
import TextInput from "@/components/inputs/TextInput";

import styles from "./freeItemReviewerStyles";

const FreeItemReviewerSection = ({
  isFree,
  reviewerMessage,

  onIsFreeChange,
  onReviewerMessageChange,
}) => {
  return (
    <>
      {/* ================= FREE ITEM ================= */}
      <Paper elevation={0} sx={styles.card}>
        <Typography sx={styles.sectionTitle}>Free Item</Typography>

        <Typography sx={styles.description}>
          You can allow downloading the item for free. Please note that everyone
          can download the item directly from the item page without purchasing.
        </Typography>

        <Divider sx={styles.divider} />

        <Box sx={styles.field}>
          <SelectInput
            label="isItem will be Free"
            value={isFree}
            onChange={onIsFreeChange}
            options={[
              {
                label: "Select",
                value: "",
              },

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

      <Paper elevation={0} sx={styles.card}>
        <Typography sx={styles.sectionTitle}>
          Message to the Reviewer
        </Typography>

        <Divider sx={styles.divider} />

        <Box sx={styles.fieldFull}>
          <TextInput
            label="Message"
            placeholder="write a message for  the  reviewer"
            multiline
            minRows={4}
            value={reviewerMessage}
            onChange={onReviewerMessageChange}
          />
        </Box>
      </Paper>
    </>
  );
};

export default FreeItemReviewerSection;
