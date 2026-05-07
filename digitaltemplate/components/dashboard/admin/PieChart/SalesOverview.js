// File: components/SalesOverview.jsx - MOBILE OPTIMIZED
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Import styles and utilities
import { styles, COLORS, PIE_CHART_COLORS } from "./salesOverviewStyles";
import {
  generateChartData,
  getChartOptions,
  formatValue,
  calculateStatsFromChartData,
  calculatePercentage,
  calculateTotalValue,
} from "./salesOverviewUtils";

// Register ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

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

// Legend Component with Checkbox
const ChartLegend = ({
  chartData,
  stats,
  hiddenItems,
  toggleItem,
  totalValue,
}) => {
  if (!chartData || !chartData.datasets || !chartData.datasets[0]) return null;

  const originalData = chartData.originalData || chartData.datasets[0].data;
  const labels = [
    "Total Sales",
    "Author Commission",
    "Platform Revenue",
    "Marketing Costs",
    "Operational Expenses",
    "Taxes",
    "Net Profit",
  ];

  return (
    <Box sx={styles.chartLegendContainer}>
      {labels.map((label, index) => {
        const value = originalData[index] || 0;
        const percentage = calculatePercentage(value, totalValue);
        const isHidden = hiddenItems.includes(index);

        return (
          <Box
            key={index}
            sx={styles.legendItem}
            className={isHidden ? "disabled" : ""}
            onClick={() => toggleItem(index)}
          >
            <Box sx={styles.legendLeft}>
              <Box
                sx={{
                  ...styles.legendColorBox,
                  backgroundColor: PIE_CHART_COLORS[index],
                }}
              />
              <Typography sx={styles.legendLabel}>{label}</Typography>
            </Box>
            <Box sx={styles.legendValueContainer}>
              <Typography sx={styles.legendValue}>
                {formatValue(value)}
              </Typography>
              <Typography sx={styles.legendPercentage}>
                ({percentage}%)
              </Typography>
            </Box>
            <Box sx={styles.checkboxContainer}>
              <Box sx={styles.checkbox} className={!isHidden ? "checked" : ""}>
                {!isHidden && <CheckIcon sx={styles.checkIcon} />}
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

// Main Component - Mobile Optimized
const SalesOverview = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [stats, setStats] = useState({
    totalSales: 23000,
    authorCommission: 4000,
    platformRevenue: 4000,
    marketingCosts: 2000,
    operationalExpenses: 1000,
    taxes: 1000,
    netProfit: 6000,
  });

  // Initialize data
  useEffect(() => {
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const data = generateChartData(hiddenItems);
      setChartData(data);
      setIsLoading(false);
    }, 500);
  }, [hiddenItems]);

  // Toggle item visibility
  const toggleItem = (index) => {
    setHiddenItems((prev) => {
      if (prev.includes(index)) {
        return prev.filter((item) => item !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const totalValue = chartData ? calculateTotalValue(chartData) : 40300; // Sum of all values

  return (
    <Card sx={styles.mainCard}>
      {/* Header */}
      <Box sx={styles.header}>
        <Typography sx={styles.title}>Sales Distribution</Typography>
        <Typography sx={styles.subtitle}>
          {isMobile
            ? "Tap items to show/hide"
            : "Click on legend items to show/hide in chart"}
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box sx={styles.statsContainer}>
        <StatCard
          label="Total Sales"
          value={stats.totalSales}
          metaText="Overall revenue"
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
          value={stats.netProfit}
          metaText="After all expenses"
          color="#10b981"
        />
      </Box>

      {/* Chart Area - Mobile Optimized */}
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
            <>
              <Box sx={styles.chartAndLegendContainer}>
                {/* Pie Chart Container - Fixed for mobile */}
                <Box sx={styles.pieChartContainer}>
                  <Box sx={styles.pieChartWrapper}>
                    <Pie
                      data={chartData}
                      options={getChartOptions(isMobile, isTablet, totalValue)}
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
                  </Box>
                </Box>

                {/* Custom Legend with Checkboxes - Only on desktop */}
                {!isMobile && (
                  <Box sx={{ flex: 1, maxWidth: { md: "320px", lg: "350px" } }}>
                    <ChartLegend
                      chartData={chartData}
                      stats={stats}
                      hiddenItems={hiddenItems}
                      toggleItem={toggleItem}
                      totalValue={totalValue}
                    />
                  </Box>
                )}
              </Box>

              {/* Mobile Legend (shown below chart) */}
              {!isLoading && chartData && isMobile && (
                <Box sx={{ mt: 2 }}>
                  <ChartLegend
                    chartData={chartData}
                    stats={stats}
                    hiddenItems={hiddenItems}
                    toggleItem={toggleItem}
                    totalValue={totalValue}
                  />
                </Box>
              )}

              {/* Total Value Display */}
              <Box sx={styles.totalValueContainer}>
                <Typography sx={styles.totalLabel}>Total Value:</Typography>
                <Typography sx={styles.totalValue}>
                  {formatValue(totalValue)}
                </Typography>
              </Box>
            </>
          ) : null}
        </Box>
      </Box>
    </Card>
  );
};

export default SalesOverview;
