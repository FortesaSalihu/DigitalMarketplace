// File: utils/salesOverviewUtils.js
// Utility functions for SalesOverview component

import {
  PIE_CHART_COLORS,
  PIE_CHART_HOVER_COLORS,
} from "./salesOverviewStyles";
import { faker } from "@faker-js/faker";

// Sample data for Stacked Bar Chart with 3 datasets using Faker
export const generateChartData = (hiddenItems = [], dataVersion = 0) => {
  // Monthly data for 4 months (Quarter) - using Faker for random data
  const labels = ["Jan", "Feb", "Mar", "Apr"];

  // Generate different random seeds for each dataVersion
  const seed = dataVersion * 1000;

  // Helper function to generate random data with seed
  const generateRandomData = (base, variation, index) => {
    faker.seed(seed + index * 100);
    return labels.map(() =>
      faker.number.int({
        min: base - variation,
        max: base + variation,
      })
    );
  };

  // 3 Datasets: Total Sales, Expenses, Net Profit
  const datasets = [
    {
      label: "Total Sales",
      data: generateRandomData(25000, 5000, 1), // Monthly sales data
      backgroundColor: PIE_CHART_COLORS[0], // '#890eee'
      borderColor: "#ffffff",
      borderWidth: 1,
      borderRadius: 4,
      hoverBackgroundColor: PIE_CHART_HOVER_COLORS[0],
      hoverBorderColor: "#ffffff",
      hoverBorderWidth: 2,
    },
    {
      label: "Expenses",
      data: generateRandomData(8000, 2000, 2), // Monthly expenses
      backgroundColor: PIE_CHART_COLORS[3], // '#ff6b6b'
      borderColor: "#ffffff",
      borderWidth: 1,
      borderRadius: 4,
      hoverBackgroundColor: PIE_CHART_HOVER_COLORS[3],
      hoverBorderColor: "#ffffff",
      hoverBorderWidth: 2,
    },
    {
      label: "Net Profit",
      data: generateRandomData(17000, 3000, 3), // Monthly net profit
      backgroundColor: "#10b981", // Green for profit
      borderColor: "#ffffff",
      borderWidth: 1,
      borderRadius: 4,
      hoverBackgroundColor: "#0da271",
      hoverBorderColor: "#ffffff",
      hoverBorderWidth: 2,
    },
  ];

  // Filter out hidden datasets
  const filteredDatasets = datasets.filter(
    (dataset, index) => !hiddenItems.includes(index)
  );

  return {
    labels,
    datasets: filteredDatasets,
  };
};

// Function to refresh data with completely new random values
export const refreshChartData = () => {
  const labels = ["Jan", "Feb", "Mar", "Apr"];

  // Generate fresh random data without seed for complete randomness
  const datasets = [
    {
      label: "Total Sales",
      data: labels.map(() => faker.number.int({ min: 15000, max: 35000 })),
      backgroundColor: PIE_CHART_COLORS[0],
      borderColor: "#ffffff",
      borderWidth: 1,
      borderRadius: 4,
      hoverBackgroundColor: PIE_CHART_HOVER_COLORS[0],
      hoverBorderColor: "#ffffff",
      hoverBorderWidth: 2,
    },
    {
      label: "Expenses",
      data: labels.map(() => faker.number.int({ min: 5000, max: 12000 })),
      backgroundColor: PIE_CHART_COLORS[3],
      borderColor: "#ffffff",
      borderWidth: 1,
      borderRadius: 4,
      hoverBackgroundColor: PIE_CHART_HOVER_COLORS[3],
      hoverBorderColor: "#ffffff",
      hoverBorderWidth: 2,
    },
    {
      label: "Net Profit",
      data: labels.map(() => faker.number.int({ min: 10000, max: 25000 })),
      backgroundColor: "#10b981",
      borderColor: "#ffffff",
      borderWidth: 1,
      borderRadius: 4,
      hoverBackgroundColor: "#0da271",
      hoverBorderColor: "#ffffff",
      hoverBorderWidth: 2,
    },
  ];

  return {
    labels,
    datasets,
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

// Get chart options for Stacked Bar Chart - Mobile optimized
export const getChartOptions = (isMobile, isTablet, totalValue) => {
  const isSmallScreen = isMobile || isTablet;

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We'll use custom legend
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
        titleFont: {
          size: isSmallScreen ? 10 : 12,
          weight: "600",
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: isSmallScreen ? 11 : 13,
          family: "'Inter', sans-serif",
        },
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.raw || 0;
            const totalBarValue = context.chart.data.datasets.reduce(
              (sum, dataset) => {
                return sum + (dataset.data[context.dataIndex] || 0);
              },
              0
            );
            const percentage = calculatePercentage(value, totalBarValue);
            return `${label}: ${formatValue(value)} (${percentage}%)`;
          },
        },
        ...(isMobile && {
          boxPadding: 4,
          caretSize: 5,
          caretPadding: 6,
          xPadding: 8,
          yPadding: 6,
          titleMarginBottom: 3,
        }),
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: isSmallScreen ? 11 : 13,
            weight: "600",
            family: "'Inter', sans-serif",
          },
        },
        title: {
          display: true,
          text: "Months",
          color: "#6b7280",
          font: {
            size: isSmallScreen ? 12 : 14,
            weight: "600",
            family: "'Inter', sans-serif",
          },
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: isSmallScreen ? 10 : 12,
            family: "'Inter', sans-serif",
          },
          callback: function (value) {
            return formatValue(value);
          },
          maxRotation: 0,
        },
        title: {
          display: true,
          text: "Amount ($)",
          color: "#6b7280",
          font: {
            size: isSmallScreen ? 11 : 13,
            weight: "600",
            family: "'Inter', sans-serif",
          },
          padding: { top: 0, bottom: 10 },
        },
      },
    },
    // Animation
    animation: {
      duration: 600,
      easing: "easeInOutQuart",
    },
    // Mobile touch optimization
    events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
    onHover: (event, chartElements) => {
      if (event.native.target) {
        event.native.target.style.cursor = chartElements[0]
          ? "pointer"
          : "default";
      }
    },
    // Better mobile interaction
    ...(isMobile && {
      interaction: {
        mode: "index",
        intersect: false,
      },
    }),
  };
};

// Calculate total stats from chart data
export const calculateStatsFromChartData = (chartData) => {
  if (!chartData || !chartData.datasets) {
    return {
      totalSales: 0,
      expenses: 0,
      netProfit: 0,
    };
  }

  let totalSales = 0;
  let expenses = 0;
  let netProfit = 0;

  chartData.datasets.forEach((dataset) => {
    const sum = dataset.data.reduce((a, b) => a + b, 0);
    if (dataset.label === "Total Sales") {
      totalSales = sum;
    } else if (dataset.label === "Expenses") {
      expenses = sum;
    } else if (dataset.label === "Net Profit") {
      netProfit = sum;
    }
  });

  return {
    totalSales,
    expenses,
    netProfit,
  };
};

// Calculate total value for all months
export const calculateTotalValue = (chartData) => {
  if (!chartData || !chartData.datasets) return 0;

  // Sum all values across all datasets
  return chartData.datasets.reduce((total, dataset) => {
    return total + dataset.data.reduce((sum, value) => sum + value, 0);
  }, 0);
};
