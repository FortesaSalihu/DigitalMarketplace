"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { mobileCardStyles } from "./mobileCardStyles";
const MobileItemCard = ({ item }) => {
  return (
    <Box sx={mobileCardStyles.card}>
      {/* Header */}
      <Box sx={mobileCardStyles.header}>
        <Typography sx={mobileCardStyles.productName}>
          {item.item_id?.name || "Product"}
        </Typography>

        <Typography sx={mobileCardStyles.amount}>
          ₹{item.total?.toLocaleString() || 0}
        </Typography>
      </Box>

      {/* Description (if exists) */}
      {item.item_id?.description && (
        <Typography sx={mobileCardStyles.description}>
          {item.item_id.description}
        </Typography>
      )}

      {/* Details */}
      <Box sx={mobileCardStyles.details}>
        <Box sx={mobileCardStyles.detailItem}>
          <Typography sx={mobileCardStyles.detailLabel}>Quantity:</Typography>
          <Typography sx={mobileCardStyles.detailValue}>
            {item.quantity}
          </Typography>
        </Box>

        <Box sx={mobileCardStyles.detailItem}>
          <Typography sx={mobileCardStyles.detailLabel}>Unit Price:</Typography>
          <Typography sx={mobileCardStyles.detailValue}>
            ₹{item.price?.toLocaleString() || 0}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MobileItemCard;
