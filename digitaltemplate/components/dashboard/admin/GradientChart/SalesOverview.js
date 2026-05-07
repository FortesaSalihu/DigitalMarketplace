// File: components/SalesOverview.jsx
import React, { useState, useEffect, useRef } from "react";
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
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Chart } from "react-chartjs-2";

import { styles, COLORS, PIE_CHART_COLORS } from "./salesOverviewStyles";
import {
  generateChartData,
  getChartOptions,
  formatValue,
  calculateStatsFromChartData,
  calculatePercentage,
  calculateTotalValue,
  applyGradientsToChart,
} from "./salesOverviewUtils";

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

const StatCard = ({ label, value, metaText, color }) => (
  <Box sx={styles.statCard}>
    <Typography sx={styles.statLabel}>{label}</Typography>
    <Typography sx={styles.statValue}>{formatValue(value)}</Typography>
    <Box sx={styles.statMeta}>
      <Box sx={{ ...styles.indicatorDot, backgroundColor: color }} />
      <Typography sx={styles.metaText}>{metaText}</Typography>
    </Box>
  </Box>
);

const ChartLegend = ({ chartData, hiddenItems, toggleItem, totalValue }) => {
  if (!chartData?.datasets) return null;

  return (
    <Box sx={styles.chartLegendContainer}>
      {chartData.datasets.map((dataset, index) => {
        const originalIndex = ["Total Sales", "Expenses", "Net Profit"].indexOf(
          dataset.label
        );
        const totalCategoryValue = dataset.data.reduce((a, b) => a + b, 0);
        const averageValue = chartData.labels
          ? totalCategoryValue / chartData.labels.length
          : 0;
        const percentage = calculatePercentage(
          averageValue,
          totalValue / (chartData.labels?.length || 1)
        );
        const isHidden = hiddenItems.includes(originalIndex);

        return (
          <Box
            key={index}
            sx={styles.legendItem}
            className={isHidden ? "disabled" : ""}
            onClick={() => toggleItem(originalIndex)}
          >
            <Box sx={styles.legendLeft}>
              <Box
                sx={{
                  ...styles.legendColorBox,
                  backgroundColor:
                    dataset.borderColor || PIE_CHART_COLORS[originalIndex],
                }}
              />
              <Typography sx={styles.legendLabel}>{dataset.label}</Typography>
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
              <Box
                sx={{
                  ...styles.checkbox,
                  ...(isHidden
                    ? {}
                    : { backgroundColor: "#890eee", borderColor: "#890eee" }),
                }}
              >
                {!isHidden && <CheckIcon sx={styles.checkIcon} />}
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

const SalesOverview = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    expenses: 0,
    netProfit: 0,
  });
  const [dataVersion, setDataVersion] = useState(0);

  // Load data
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const data = generateChartData(hiddenItems, dataVersion);
      setChartData(data);
      setStats(calculateStatsFromChartData(data));
      setIsLoading(false);
    }, 300);
  }, [hiddenItems, dataVersion]);

  // Apply gradients after chart renders
  useEffect(() => {
    if (!isLoading && chartData && chartRef.current) {
      const timer = setTimeout(() => {
        if (chartRef.current?.ctx) {
          const dataWithGradients = applyGradientsToChart(chartRef, chartData);
          setChartData(dataWithGradients);
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isLoading, chartData]);

  const toggleItem = (index) => {
    setHiddenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleRefreshData = () => setDataVersion((prev) => prev + 1);
  const totalValue = chartData ? calculateTotalValue(chartData) : 0;

  return (
    <Card sx={styles.mainCard}>
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
                <Box sx={styles.barChartContainer}>
                  <Box sx={styles.barChartWrapper}>
                    <Chart
                      ref={chartRef}
                      type="line"
                      data={chartData}
                      options={getChartOptions(isMobile, isTablet)}
                    />
                  </Box>
                </Box>

                {!isMobile && (
                  <Box sx={{ flex: 1, maxWidth: { md: "320px", lg: "350px" } }}>
                    <ChartLegend
                      chartData={chartData}
                      hiddenItems={hiddenItems}
                      toggleItem={toggleItem}
                      totalValue={totalValue}
                    />
                  </Box>
                )}
              </Box>

              {isMobile && (
                <Box sx={{ mt: 2 }}>
                  <ChartLegend
                    chartData={chartData}
                    hiddenItems={hiddenItems}
                    toggleItem={toggleItem}
                    totalValue={totalValue}
                  />
                </Box>
              )}

              <Box sx={styles.totalValueContainer}>
                <Typography sx={styles.totalLabel}>
                  Total Value (Quarter):
                </Typography>
                <Typography sx={styles.totalValue}>
                  {formatValue(totalValue)}
                </Typography>
              </Box>
            </>
          ) : (
            <Box sx={styles.loadingContainer}>
              <Typography sx={styles.loadingText}>No data available</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default SalesOverview;
