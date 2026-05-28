"use client";
import React from "react";
import { Typography, Grid, Card, CardContent, Box } from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Star as StarIcon,
  AttachMoney as AttachMoneyIcon,
} from "@mui/icons-material";
import dashboardStyles from "./dashboardStyles";

export default function DashboardPage() {
  const dummyData = { purchases: 6, reviews: 8, totalSpent: 34711 };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h5" sx={dashboardStyles.headerTitle}>
        Welcome back!
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={dashboardStyles.cardContent}>
              <Box sx={dashboardStyles.cardIconWrapGreen}>
                <ShoppingCartIcon sx={{ color: "#fff", fontSize: 26 }} />
              </Box>
              <Box>
                <Typography sx={dashboardStyles.cardNumber}>
                  {dummyData.purchases}
                </Typography>
                <Typography sx={dashboardStyles.cardLabel}>
                  Total Purchases
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={dashboardStyles.cardContent}>
              <Box sx={dashboardStyles.cardIconWrapYellow}>
                <StarIcon sx={{ color: "#fff", fontSize: 26 }} />
              </Box>
              <Box>
                <Typography sx={dashboardStyles.cardNumber}>
                  {dummyData.reviews}
                </Typography>
                <Typography sx={dashboardStyles.cardLabel}>
                  Total Reviews
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={dashboardStyles.cardContent}>
              <Box sx={dashboardStyles.cardIconWrapBlue}>
                <AttachMoneyIcon sx={{ color: "#fff", fontSize: 26 }} />
              </Box>
              <Box>
                <Typography sx={dashboardStyles.cardNumber}>
                  ${dummyData.totalSpent.toLocaleString()}
                </Typography>
                <Typography sx={dashboardStyles.cardLabel}>
                  Total Spent
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Add more cards as needed */}
      </Grid>
    </Box>
  );
}
