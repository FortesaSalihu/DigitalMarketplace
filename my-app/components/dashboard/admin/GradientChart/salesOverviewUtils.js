// File: utils/salesOverviewUtils.js
import { PIE_CHART_COLORS } from "./salesOverviewStyles";
import { faker } from "@faker-js/faker";

// Gradient colors for area fill
const GRADIENT_COLORS = [
  {
    line: "#890eee", // Total Sales - Purple
    fillStart: "rgba(137, 14, 238, 0.3)",
    fillEnd: "rgba(137, 14, 238, 0.05)",
  },
  {
    line: "#ff6b6b", // Expenses - Red
    fillStart: "rgba(255, 107, 107, 0.3)",
    fillEnd: "rgba(255, 107, 107, 0.05)",
  },
  {
    line: "#10b981", // Net Profit - Green
    fillStart: "rgba(16, 185, 129, 0.3)",
    fillEnd: "rgba(16, 185, 129, 0.05)",
  },
];

// Create canvas gradient for area fill
export const createGradient = (ctx, chartArea, datasetIndex) => {
  if (!ctx || !chartArea) {
    return (
      GRADIENT_COLORS[datasetIndex]?.fillStart || "rgba(137, 14, 238, 0.2)"
    );
  }

  const colors = GRADIENT_COLORS[datasetIndex] || GRADIENT_COLORS[0];

  // Create vertical gradient for area fill
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.top,
    0,
    chartArea.bottom
  );
  gradient.addColorStop(0, colors.fillStart);
  gradient.addColorStop(1, colors.fillEnd);

  return gradient;
};

// Generate chart data
export const generateChartData = (hiddenItems = [], dataVersion = 0) => {
  const labels = ["Jan", "Feb", "Mar", "Apr"];

  const seed = dataVersion * 1000;

  const generateRandomData = (base, variation, index) => {
    faker.seed(seed + index * 100);
    return labels.map(() =>
      faker.number.int({
        min: Math.max(0, base - variation),
        max: base + variation,
      })
    );
  };

  // Create datasets with area fill
  const datasets = [
    {
      label: "Total Sales",
      data: generateRandomData(25000, 5000, 1),
      borderColor: GRADIENT_COLORS[0].line,
      borderWidth: 2,
      pointBackgroundColor: GRADIENT_COLORS[0].line,
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
      fill: true, // This creates the area fill
      tension: 0, // Straight lines, no curves
      // backgroundColor will be set as gradient
    },
    {
      label: "Expenses",
      data: generateRandomData(8000, 2000, 2),
      borderColor: GRADIENT_COLORS[1].line,
      borderWidth: 2,
      pointBackgroundColor: GRADIENT_COLORS[1].line,
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
      fill: true,
      tension: 0, // Straight lines
    },
    {
      label: "Net Profit",
      data: generateRandomData(17000, 3000, 3),
      borderColor: GRADIENT_COLORS[2].line,
      borderWidth: 2,
      pointBackgroundColor: GRADIENT_COLORS[2].line,
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
      fill: true,
      tension: 0, // Straight lines
    },
  ];

  const filteredDatasets = datasets.filter(
    (_, index) => !hiddenItems.includes(index)
  );

  return {
    labels,
    datasets: filteredDatasets,
  };
};

// Format currency values
export const formatValue = (val) => {
  if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
  return `$${val.toLocaleString("en-IN")}`;
};

// Calculate percentages
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

// Get chart options
export const getChartOptions = (isMobile, isTablet) => {
  const isSmallScreen = isMobile || isTablet;

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        titleColor: "#111827",
        bodyColor: "#111827",
        borderColor: "#890eee",
        borderWidth: 1,
        padding: isSmallScreen ? 8 : 12,
        cornerRadius: 6,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          labelColor: function (context) {
            return {
              borderColor: context.dataset.borderColor,
              backgroundColor: context.dataset.borderColor,
              borderWidth: 2,
              borderRadius: 2,
            };
          },
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.raw || 0;
            return `${label}: ${formatValue(value)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: isSmallScreen ? 11 : 13,
            weight: "600",
          },
        },
        title: {
          display: true,
          text: "Months",
          color: "#6b7280",
          font: {
            size: isSmallScreen ? 12 : 14,
            weight: "600",
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: isSmallScreen ? 10 : 12,
          },
          callback: function (value) {
            return formatValue(value);
          },
        },
        title: {
          display: true,
          text: "Amount ($)",
          color: "#6b7280",
          font: {
            size: isSmallScreen ? 11 : 13,
            weight: "600",
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0, // Straight lines
      },
      point: {
        radius: isSmallScreen ? 4 : 5,
        hoverRadius: isSmallScreen ? 6 : 7,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };
};

// Calculate stats
export const calculateStatsFromChartData = (chartData) => {
  if (!chartData?.datasets) {
    return { totalSales: 0, expenses: 0, netProfit: 0 };
  }

  const stats = { totalSales: 0, expenses: 0, netProfit: 0 };

  chartData.datasets.forEach((dataset) => {
    const sum = dataset.data.reduce((a, b) => a + b, 0);
    if (dataset.label === "Total Sales") stats.totalSales = sum;
    else if (dataset.label === "Expenses") stats.expenses = sum;
    else if (dataset.label === "Net Profit") stats.netProfit = sum;
  });

  return stats;
};

// Calculate total value
export const calculateTotalValue = (chartData) => {
  if (!chartData?.datasets) return 0;
  return chartData.datasets.reduce((total, dataset) => {
    return total + dataset.data.reduce((sum, value) => sum + value, 0);
  }, 0);
};

// Apply gradients
export const applyGradientsToChart = (chartRef, chartData) => {
  if (!chartRef.current || !chartData.datasets.length) return chartData;

  const chart = chartRef.current;
  const ctx = chart.ctx;
  const chartArea = chart.chartArea;

  if (!chartArea) return chartData;

  const datasetsWithGradient = chartData.datasets.map((dataset, index) => ({
    ...dataset,
    backgroundColor: createGradient(ctx, chartArea, index),
  }));

  return {
    ...chartData,
    datasets: datasetsWithGradient,
  };
};
