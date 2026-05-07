// File: components/SalesOverview.jsx - MOBILE OPTIMIZED
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";

// Import styles and utilities
import { styles, COLORS, BUBBLE_CHART_COLORS } from "./salesOverviewStyles";
import {
  generateChartData,
  getChartOptions,
  formatValue,
  calculateStatsFromChartData,
  calculatePercentage,
  calculateTotalValue,
} from "./salesOverviewUtils";

// Register ChartJS components
ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

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
  if (!chartData || !chartData.datasets) return null;

  const categories = [
    "Product Sales",
    "Marketing Impact",
    "Customer Engagement",
  ];

  return (
    <Box sx={styles.chartLegendContainer}>
      {categories.map((label, index) => {
        // Calculate total bubbles value for each category
        let totalBubbleValue = 0;
        if (chartData.datasets[index]) {
          totalBubbleValue = chartData.datasets[index].data.reduce(
            (sum, bubble) => {
              return sum + (bubble.r || 0); // Use radius as value indicator
            },
            0
          );
        }
        const averageValue =
          totalBubbleValue / (chartData.datasets[index]?.data.length || 1);
        const percentage = calculatePercentage(
          totalBubbleValue,
          totalValue || 1
        );
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
                  backgroundColor: BUBBLE_CHART_COLORS[index],
                }}
              />
              <Typography sx={styles.legendLabel}>{label}</Typography>
            </Box>
            <Box sx={styles.legendValueContainer}>
              <Typography sx={styles.legendValue}>
                {chartData.datasets[index]?.data.length || 0} bubbles
              </Typography>
              <Typography sx={styles.legendPercentage}>
                (Avg: {Math.round(averageValue)}px)
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
    totalSales: 0,
    marketingImpact: 0,
    customerEngagement: 0,
  });
  const [dataVersion, setDataVersion] = useState(0);

  // Initialize data
  useEffect(() => {
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const data = generateChartData(hiddenItems, dataVersion);
      setChartData(data);
      setStats(calculateStatsFromChartData(data));
      setIsLoading(false);
    }, 500);
  }, [hiddenItems, dataVersion]);

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

  // Refresh data with new random values
  const handleRefreshData = () => {
    setDataVersion((prev) => prev + 1);
  };

  const totalValue = chartData ? calculateTotalValue(chartData) : 0;

  return (
    <Card sx={styles.mainCard}>
      {/* Header with Refresh Button */}
      <Box sx={styles.headerContainer}>
        <Box sx={styles.header}>
          <Typography sx={styles.title}>Sales Performance Analysis</Typography>
          <Typography sx={styles.subtitle}>
            {isMobile
              ? "Tap items to show/hide"
              : "Click on legend items to show/hide bubbles"}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={handleRefreshData}
          sx={styles.refreshButton}
          size={isMobile ? "small" : "medium"}
        >
          {isMobile ? "Refresh" : "New Bubbles"}
        </Button>
      </Box>

      {/* Stats Cards */}
      <Box sx={styles.statsContainer}>
        <StatCard
          label="Total Sales"
          value={stats.totalSales}
          metaText="Revenue generated"
          color={COLORS.primary}
        />
        <StatCard
          label="Marketing Impact"
          value={stats.marketingImpact}
          metaText="Campaign effectiveness"
          color={COLORS.quaternary}
        />
        <StatCard
          label="Customer Engagement"
          value={stats.customerEngagement}
          metaText="User interaction level"
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
              <Typography sx={styles.loadingText}>
                Loading bubble chart...
              </Typography>
            </Box>
          ) : chartData ? (
            <>
              <Box sx={styles.chartAndLegendContainer}>
                {/* Bubble Chart Container */}
                <Box sx={styles.bubbleChartContainer}>
                  <Box sx={styles.bubbleChartWrapper}>
                    <Bubble
                      data={chartData}
                      options={getChartOptions(isMobile, isTablet, totalValue)}
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
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

              {/* Chart Info Display */}
              <Box sx={styles.totalValueContainer}>
                <Typography sx={styles.totalLabel}>
                  Total Data Points:
                </Typography>
                <Typography sx={styles.totalValue}>
                  {chartData.datasets.reduce(
                    (total, dataset) => total + dataset.data.length,
                    0
                  )}{" "}
                  bubbles
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
