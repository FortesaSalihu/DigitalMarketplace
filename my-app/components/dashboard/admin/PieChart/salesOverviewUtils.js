// File: utils/salesOverviewUtils.js
// Utility functions for SalesOverview component

import {
  PIE_CHART_COLORS,
  PIE_CHART_HOVER_COLORS,
} from "./salesOverviewStyles";

// Sample data for Pie Chart
export const generateChartData = (hiddenItems = []) => {
  const categories = [
    "Total Sales",
    "Author Commission",
    "Platform Revenue",
    "Marketing Costs",
    "Operational Expenses",
    "Taxes",
    "Net Profit",
  ];

  // Predefined values matching your requirement
  const values = [
    23000, // Total Sales (57%)
    4000, // Author Commission (9%)
    4000, // Platform Revenue (9%)
    2000, // Marketing Costs (4%)
    1000, // Operational Expenses (4%)
    1000, // Taxes (3%)
    6000, // Net Profit (14%)
  ];

  // Filter out hidden items
  const filteredData = values.map((value, index) =>
    hiddenItems.includes(index) ? 0 : value
  );
  const filteredLabels = categories.filter(
    (label, index) => !hiddenItems.includes(index)
  );
  const filteredColors = PIE_CHART_COLORS.filter(
    (color, index) => !hiddenItems.includes(index)
  );
  const filteredHoverColors = PIE_CHART_HOVER_COLORS.filter(
    (color, index) => !hiddenItems.includes(index)
  );

  return {
    labels: filteredLabels,
    datasets: [
      {
        data: filteredData.filter(
          (value, index) => !hiddenItems.includes(index)
        ),
        backgroundColor: filteredColors,
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverBackgroundColor: filteredHoverColors,
        hoverBorderColor: "#ffffff",
        hoverBorderWidth: 3,
      },
    ],
    originalData: values, // Store original data for toggling
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

// Get chart options for Pie Chart - Mobile optimized
export const getChartOptions = (isMobile, isTablet, totalValue) => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false, // We'll use custom legend
    },
    tooltip: {
      enabled: true,
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      titleColor: "#111827",
      bodyColor: "#111827",
      borderColor: "#890eee",
      borderWidth: 1,
      padding: isMobile ? 6 : 12,
      cornerRadius: 6,
      displayColors: true,
      usePointStyle: true,
      titleFont: {
        size: isMobile ? 10 : isTablet ? 11 : 12,
        weight: "600",
        family: "'Inter', sans-serif",
      },
      bodyFont: {
        size: isMobile ? 11 : isTablet ? 12 : 14,
        family: "'Inter', sans-serif",
      },
      callbacks: {
        label: function (context) {
          const label = context.label || "";
          const value = context.raw || 0;
          const percentage = calculatePercentage(value, totalValue);
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
  // Pie chart specific options - optimized for mobile
  cutout: isMobile ? "45%" : "55%",
  radius: isMobile ? "95%" : "90%",
  animation: {
    animateScale: true,
    animateRotate: true,
    duration: 600, // Faster on mobile
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
      mode: "nearest",
      intersect: true,
    },
  }),
});

// Calculate total from pie chart data
export const calculateStatsFromChartData = (chartData) => {
  if (!chartData || !chartData.datasets || !chartData.datasets[0]) {
    return {
      totalSales: 0,
      authorCommission: 0,
      platformRevenue: 0,
      marketingCosts: 0,
      operationalExpenses: 0,
      taxes: 0,
      netProfit: 0,
    };
  }

  const data = chartData.originalData || chartData.datasets[0].data;
  return {
    totalSales: data[0] || 0,
    authorCommission: data[1] || 0,
    platformRevenue: data[2] || 0,
    marketingCosts: data[3] || 0,
    operationalExpenses: data[4] || 0,
    taxes: data[5] || 0,
    netProfit: data[6] || 0,
  };
};

// Calculate total value
export const calculateTotalValue = (chartData) => {
  if (!chartData || !chartData.datasets || !chartData.datasets[0]) return 40300;
  return chartData.datasets[0].data.reduce((a, b) => a + b, 0);
};
