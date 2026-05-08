"use client";

import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { subscriberTableStyles as styles } from "./subscriberTableStyles";

const SubscriberTableMobileCards = ({ data = [], onDelete }) => {
  return (
    <Box sx={styles.cardList}>
      {data.map((row) => (
        <Box key={row._id} sx={styles.card}>
          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Email</Typography>
            <Typography sx={styles.mobileValue}>{row.email}</Typography>
          </Box>

          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Subscribed</Typography>
            <Typography sx={styles.mobileValue}>
              {new Date(row.subscribedAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </Typography>
          </Box>

          <Box sx={styles.mobileActions}>
            <IconButton
              sx={{
                ...styles.mobileActionBtn,
                ...styles.mobileDeleteBtn,
              }}
              onClick={() => onDelete(row._id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      ))}

      {data.length === 0 && (
        <Typography align="center">No subscribers found</Typography>
      )}
    </Box>
  );
};

export default SubscriberTableMobileCards;
