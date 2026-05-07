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
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Import styles and utilities
import { styles, COLORS, PIE_CHART_COLORS } from "./salesOverviewStyles";
import {
  generateChartData,
  getChartOptions,
  formatValue,
  calculateStatsFromChartData,
  calculatePercentage,
  calculateTotalValue,
  refreshChartData,
} from "./salesOverviewUtils";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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

// Legend Component with Checkbox
const ChartLegend = ({
  chartData,
  stats,
  hiddenItems,
  toggleItem,
  totalValue,
}) => {
  if (!chartData || !chartData.datasets) return null;

  const categories = ["Total Sales", "Expenses", "Net Profit"];

  return (
    <Box sx={styles.chartLegendContainer}>
      {categories.map((label, index) => {
        // Calculate average value for each category across all months
        let totalCategoryValue = 0;
        if (chartData.datasets[index]) {
          totalCategoryValue = chartData.datasets[index].data.reduce(
            (a, b) => a + b,
            0
          );
        }
        const averageValue = chartData.labels
          ? totalCategoryValue / chartData.labels.length
          : totalCategoryValue;
        const percentage = calculatePercentage(
          averageValue,
          totalValue / chartData.labels?.length || 1
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
                  backgroundColor: PIE_CHART_COLORS[index],
                }}
              />
              <Typography sx={styles.legendLabel}>{label}</Typography>
            </Box>
            <Box sx={styles.legendValueContainer}>
              <Typography sx={styles.legendValue}>
                {formatValue(averageValue)}
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
    totalSales: 0,
    expenses: 0,
    netProfit: 0,
  });
  const [dataVersion, setDataVersion] = useState(0); // To trigger data refresh

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
          <Typography sx={styles.title}>Sales Distribution</Typography>
          <Typography sx={styles.subtitle}>
            {isMobile
              ? "Tap items to show/hide"
              : "Click on legend items to show/hide in chart"}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={handleRefreshData}
          sx={styles.refreshButton}
          size={isMobile ? "small" : "medium"}
        >
          {isMobile ? "Refresh" : "Refresh Data"}
        </Button>
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
          label="Total Expenses"
          value={stats.expenses}
          metaText="All costs combined"
          color={COLORS.quaternary}
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
                {/* Bar Chart Container */}
                <Box sx={styles.barChartContainer}>
                  <Box sx={styles.barChartWrapper}>
                    <Bar
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

              {/* Total Value Display */}
              <Box sx={styles.totalValueContainer}>
                <Typography sx={styles.totalLabel}>
                  Total Value (Quarter):
                </Typography>
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
