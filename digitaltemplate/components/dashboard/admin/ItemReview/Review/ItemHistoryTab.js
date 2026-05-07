"use client";

import { Box, Typography, Card, CardContent, Chip } from "@mui/material";

export default function ItemHistoryTab({ history, status }) {
  if (!history?.length) {
    return (
      <Typography color="text.secondary">No item history available</Typography>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      {history.map((h) => (
        <Card key={h._id} sx={{ mb: 2 }}>
          <CardContent>
            {/* Header row */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography fontWeight={600}>{h.title}</Typography>

              {/* ITEM STATUS */}
              {status && (
                <Chip
                  label={status}
                  size="small"
                  color={
                    status === "approved"
                      ? "success"
                      : status === "pending"
                      ? "warning"
                      : "error"
                  }
                />
              )}
            </Box>

            {/* Body (HTML) */}
            {h.body && (
              <Typography
                sx={{ mt: 1 }}
                dangerouslySetInnerHTML={{ __html: h.body }}
              />
            )}

            {/* Date */}
            <Typography
              variant="caption"
              sx={{ mt: 1, display: "block" }}
              color="text.secondary"
            >
              {new Date(h.createdAt).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
