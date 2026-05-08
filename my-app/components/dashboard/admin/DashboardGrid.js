// File: components/DashboardGrid.jsx
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import PersonIcon from "@mui/icons-material/Person";
import PaymentsIcon from "@mui/icons-material/Payments";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styles from "./dashboardStyles";
import Footer from "@/components/footer/Footer";

const cards = [
  {
    title: "Today's Sales",
    value: "$4,463",
    icon: <MonetizationOnIcon />,
    colorKey: "blue",
  },
  {
    title: "This Week Sales",
    value: "$5,726",
    icon: <MonetizationOnIcon />,
    colorKey: "blue",
  },
  {
    title: "This Month Sales",
    value: "$5,716",
    icon: <MonetizationOnIcon />,
    colorKey: "blue",
  },
  {
    title: "This Year Sales",
    value: "$5,236",
    icon: <MonetizationOnIcon />,
    colorKey: "blue",
  },
  {
    title: "Pending Items",
    value: "6",
    icon: <PendingActionsIcon />,
    colorKey: "navy",
  },
  {
    title: "Soft Rejected Items",
    value: "0",
    icon: <ReportProblemIcon />,
    colorKey: "muted",
  },
  {
    title: "Hard Rejected Items",
    value: "0",
    icon: <ReportProblemIcon />,
    colorKey: "muted",
  },
  {
    title: "Approved Items",
    value: "280",
    icon: <CheckCircleOutlineIcon />,
    colorKey: "green",
  },
  { title: "KYC Pending", value: "0", icon: <PersonIcon />, colorKey: "navy" },
  {
    title: "Total Orders",
    value: "7",
    icon: <MonetizationOnIcon />,
    colorKey: "blue",
  },
  {
    title: "Pending Withdrawals",
    value: "5",
    icon: <PaymentsIcon />,
    colorKey: "muted",
  },
  {
    title: "Total Subscribers",
    value: "0",
    icon: <PersonIcon />,
    colorKey: "navy",
  },
];

export default function DashboardGrid() {
  const theme = useTheme();
  const isVerySmall = useMediaQuery("(max-width:420px)");

  return (
    <>
      <Box
        sx={{
          px: { xs: 1.5, sm: 2.5, md: 4 },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1rem", sm: "1.25rem" },
                color: "#0b2340",
              }}
            >
              Overview
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#6b7d91", fontSize: "0.75rem", mt: 0.25 }}
            >
              Dashboard
            </Typography>
          </Box>
        </Box>

        {/* Cards Grid */}
        <Box sx={styles.container}>
          <Grid container spacing={isVerySmall ? 1 : 2}>
            {cards.map((c, idx) => (
              // FIX 1: Removed `item` boolean prop (removed in MUI v6)
              // FIX 2: xs/sm/md/lg → size prop (new MUI v6 Grid API)
              <Grid
                key={idx}
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                sx={{ display: "flex" }}
              >
                <Card sx={styles.card}>
                  <CardContent sx={{ width: "100%" }}>
                    {/* FIX 3: alignItems + justifyContent moved into sx (MUI v6 Stack) */}
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography sx={styles.value}>{c.value}</Typography>
                        <Typography sx={styles.title}>{c.title}</Typography>
                      </Box>

                      <Avatar
                        sx={{
                          ...styles.iconBox,
                          bgcolor: styles.palette[c.colorKey],
                        }}
                        variant="rounded"
                      >
                        {React.cloneElement(c.icon, {
                          fontSize: "medium",
                          htmlColor: "#fff",
                        })}
                      </Avatar>
                    </Stack>

                    {/* Meta Row */}
                    <Box sx={styles.metaRow}>
                      <Box sx={styles.metaDot(styles.palette[c.colorKey])} />
                      <Typography
                        sx={{ fontSize: "0.72rem", color: "#9aa6bb" }}
                      >
                        {c.title.split(" ")[0]} • updated
                      </Typography>
                      <Box sx={{ flex: 1 }} />
                      <Box sx={styles.metaLabel}>
                        {c.value.includes("$") ? "Revenue" : "Count"}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Footer />
    </>
  );
}
