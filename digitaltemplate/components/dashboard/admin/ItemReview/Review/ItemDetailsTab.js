"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { styles } from "./myItemsStyles";

export default function ItemDetailsTab({ item }) {
  if (!item) return null;

  return (
    <Box sx={styles.container}>
      {/* Header */}

      {/* Item Overview */}
      <Accordion sx={styles.accordion}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          sx={styles.accordionSummary}
        >
          <Typography>Item Overview</Typography>
        </AccordionSummary>

        <AccordionDetails sx={styles.accordionDetails}>
          {item?.preview_type && (
            <Typography variant="caption" color="text.secondary" mb={1}>
              Preview type: {item.preview_type}
            </Typography>
          )}

          {item?.preview_type === "image" && item?.preview_image && (
            <Box
              component="img"
              src={item.preview_image}
              alt={item.name}
              sx={{
                width: "100%",
                maxHeight: 320,
                objectFit: "contain",
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                mb: 2,
              }}
            />
          )}

          {item?.preview_type === "video" && item?.preview_video && (
            <Box
              component="iframe"
              src={item.preview_video}
              sx={{
                width: "100%",
                height: 320,
                border: 0,
                borderRadius: 2,
                mb: 2,
              }}
              allow="autoplay; fullscreen"
            />
          )}

          {item?.preview_type === "audio" && item?.preview_audio && (
            <Box
              component="audio"
              src={item.preview_audio}
              controls
              sx={{ width: "100%", mb: 2 }}
            />
          )}
        </AccordionDetails>
      </Accordion>

      {/* Description */}
      <Accordion sx={styles.accordion}>
        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
          <Typography>Description</Typography>
        </AccordionSummary>

        <AccordionDetails sx={styles.accordionDetails}>
          {item?.description ? (
            <Box dangerouslySetInnerHTML={{ __html: item.description }} />
          ) : (
            <Typography color="text.secondary">
              No description available
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Support */}
      <Accordion sx={styles.accordion}>
        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography>Support</Typography>
            <Box
              sx={{
                px: 1,
                py: 0.25,
                borderRadius: 1,
                fontSize: 12,
                fontWeight: 600,
                backgroundColor: item?.is_supported
                  ? "success.main"
                  : "error.main",
                color: "#fff",
              }}
            >
              {item?.is_supported
                ? "Support Available"
                : "Support Not Available"}
            </Box>
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={styles.accordionDetails}>
          {item?.is_supported ? (
            item?.support_instructions ? (
              <Typography>{item.support_instructions}</Typography>
            ) : (
              <Typography color="text.secondary">
                Support is enabled, but no instructions provided.
              </Typography>
            )
          ) : (
            <Typography color="text.secondary">
              This item does not include support.
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Pricing */}
      <Accordion sx={styles.accordion}>
        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
          <Typography>Pricing</Typography>
        </AccordionSummary>

        <AccordionDetails sx={styles.accordionDetails}>
          {item?.price != null ? (
            <>
              <Typography fontWeight={600}>
                Regular Price: ${item.price}
              </Typography>

              {item?.discount_price > 0 && item.discount_price < item.price && (
                <Typography color="text.secondary">
                  Discount Price: ${item.discount_price}
                </Typography>
              )}
            </>
          ) : (
            <Typography color="text.secondary">Price not available</Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Free Item */}
      {item?.is_free && (
        <Accordion sx={styles.accordion}>
          <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
            <Typography>Free Item</Typography>
          </AccordionSummary>
          <AccordionDetails sx={styles.accordionDetails}>
            <Typography>This item is available for free download.</Typography>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Screenshots */}
      {item?.screenshots?.length > 0 && (
        <Accordion sx={styles.accordion}>
          <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
            <Typography>Screenshots ({item.screenshots.length})</Typography>
          </AccordionSummary>

          <AccordionDetails sx={styles.accordionDetails}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 2,
              }}
            >
              {item.screenshots.map((src, i) => (
                <Box
                  key={i}
                  component="img"
                  src={src}
                  alt={`Screenshot ${i + 1}`}
                  sx={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                  }}
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
}
