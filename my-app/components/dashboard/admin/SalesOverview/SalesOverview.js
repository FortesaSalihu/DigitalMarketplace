// File: components/SalesOverview.jsx - FIXED TOOLTIPS
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Import styles and utilities
import { styles, COLORS } from "./salesOverviewStyles";
import {
  generateChartData,
  getChartOptions,
  formatValue,
} from "./salesOverviewUtils";

// Register ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Stat Card Component
const StatCard = ({ label, value, metaText, color }) => {
  return (
    <Box sx={styles.statCard}>
      <Typography sx={styles.statLabel}>{label}</Typography>
      <Typography sx={styles.statValue}>{formatValue(value)}</Typography>
      <Box sx={styles.statMeta}>
        <Box sx={{ ...styles.indicatorDot, backgroundColor: color }} />
        <Typography sx={styles.metaText}>{metaText}</Typography>
      </Box>
    </Box>
  );
};

// Main Component
const SalesOverview = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSales: 0,
    authorCommission: 0,
    platformRevenue: 0,
  });

  // Initialize data
  useEffect(() => {
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const data = generateChartData();
      setChartData(data);

      // Calculate totals
      const totalSales = data.datasets[0].data.reduce((a, b) => a + b, 0);
      const authorCommission = data.datasets[1].data.reduce((a, b) => a + b, 0);
      const platformRevenue = data.datasets[2].data.reduce((a, b) => a + b, 0);

      setStats({ totalSales, authorCommission, platformRevenue });
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <Card sx={styles.mainCard}>
      {/* Header */}
      <Box sx={styles.header}>
        <Typography sx={styles.title}>Sales Overview</Typography>
        <Typography sx={styles.subtitle}>
          Monthly performance for the last 7 months
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box sx={styles.statsContainer}>
        <StatCard
          label="Total Sales"
          value={stats.totalSales}
          metaText="+12.5% from last month"
          color={COLORS.primary}
        />
        <StatCard
          label="Author Commission"
          value={stats.authorCommission}
          metaText="15% commission rate"
          color={COLORS.secondary}
        />
        <StatCard
          label="Platform Revenue"
          value={stats.platformRevenue}
          metaText="Platform earnings"
          color={COLORS.tertiary}
        />
        <StatCard
          label="Net Profit"
          value={Math.round(stats.totalSales * 0.85 - stats.authorCommission)}
          metaText="After all expenses"
          color="#10b981"
        />
      </Box>

      {/* Chart Area */}
      <Box sx={styles.chartWrapper}>
        <Box sx={styles.chartContainer}>
          {isLoading ? (
            <Box sx={styles.loadingContainer}>
              <CircularProgress
                size={isMobile ? 24 : 32}
                sx={{ color: COLORS.primary }}
              />
              <Typography sx={styles.loadingText}>Loading chart...</Typography>
            </Box>
          ) : chartData ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                minHeight: isMobile ? "250px" : "350px",
              }}
            >
              <Line
                data={chartData}
                options={getChartOptions(isMobile, isTablet)}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              />
            </div>
          ) : null}
        </Box>
      </Box>
    </Card>
  );
};

export default SalesOverview;
