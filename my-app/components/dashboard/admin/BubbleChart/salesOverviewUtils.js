// File: utils/salesOverviewUtils.js
// Utility functions for SalesOverview component

import {
  BUBBLE_CHART_COLORS,
  BUBBLE_CHART_HOVER_COLORS,
} from "./salesOverviewStyles";
import { faker } from "@faker-js/faker";

// Generate bubble chart data using Faker
export const generateChartData = (hiddenItems = [], dataVersion = 0) => {
  // Use dataVersion to seed faker for consistent random data
  const seed = dataVersion * 1000;

  // 3 Datasets for bubble chart
  const datasets = [
    {
      label: "Product Sales",
      data: Array.from({ length: 30 }, (_, i) => {
        faker.seed(seed + i);
        return {
          x: faker.number.int({ min: 0, max: 100 }), // Sales volume
          y: faker.number.int({ min: 0, max: 100 }), // Profit margin
          r: faker.number.int({ min: 8, max: 25 }), // Bubble size (revenue)
        };
      }),
      backgroundColor: BUBBLE_CHART_COLORS[0],
      hoverBackgroundColor: BUBBLE_CHART_HOVER_COLORS[0],
      borderColor: "#ffffff",
      borderWidth: 1,
    },
    {
      label: "Marketing Impact",
      data: Array.from({ length: 25 }, (_, i) => {
        faker.seed(seed + 1000 + i);
        return {
          x: faker.number.int({ min: 0, max: 100 }), // Marketing spend
          y: faker.number.int({ min: 0, max: 100 }), // Conversion rate
          r: faker.number.int({ min: 6, max: 20 }), // Bubble size (ROI)
        };
      }),
      backgroundColor: BUBBLE_CHART_COLORS[1],
      hoverBackgroundColor: BUBBLE_CHART_HOVER_COLORS[1],
      borderColor: "#ffffff",
      borderWidth: 1,
    },
    {
      label: "Customer Engagement",
      data: Array.from({ length: 35 }, (_, i) => {
        faker.seed(seed + 2000 + i);
        return {
          x: faker.number.int({ min: 0, max: 100 }), // Engagement score
          y: faker.number.int({ min: 0, max: 100 }), // Satisfaction rate
          r: faker.number.int({ min: 5, max: 18 }), // Bubble size (retention)
        };
      }),
      backgroundColor: BUBBLE_CHART_COLORS[2],
      hoverBackgroundColor: BUBBLE_CHART_HOVER_COLORS[2],
      borderColor: "#ffffff",
      borderWidth: 1,
    },
  ];

  // Filter out hidden datasets
  const filteredDatasets = datasets.filter(
    (dataset, index) => !hiddenItems.includes(index)
  );

  return {
    datasets: filteredDatasets,
  };
};

// Function to refresh data with completely new random values
export const refreshChartData = () => {
  // Generate fresh random data without seed for complete randomness
  const datasets = [
    {
      label: "Product Sales",
      data: Array.from({ length: 30 }, () => ({
        x: faker.number.int({ min: 0, max: 100 }),
        y: faker.number.int({ min: 0, max: 100 }),
        r: faker.number.int({ min: 8, max: 25 }),
      })),
      backgroundColor: BUBBLE_CHART_COLORS[0],
      hoverBackgroundColor: BUBBLE_CHART_HOVER_COLORS[0],
      borderColor: "#ffffff",
      borderWidth: 1,
    },
    {
      label: "Marketing Impact",
      data: Array.from({ length: 25 }, () => ({
        x: faker.number.int({ min: 0, max: 100 }),
        y: faker.number.int({ min: 0, max: 100 }),
        r: faker.number.int({ min: 6, max: 20 }),
      })),
      backgroundColor: BUBBLE_CHART_COLORS[1],
      hoverBackgroundColor: BUBBLE_CHART_HOVER_COLORS[1],
      borderColor: "#ffffff",
      borderWidth: 1,
    },
    {
      label: "Customer Engagement",
      data: Array.from({ length: 35 }, () => ({
        x: faker.number.int({ min: 0, max: 100 }),
        y: faker.number.int({ min: 0, max: 100 }),
        r: faker.number.int({ min: 5, max: 18 }),
      })),
      backgroundColor: BUBBLE_CHART_COLORS[2],
      hoverBackgroundColor: BUBBLE_CHART_HOVER_COLORS[2],
      borderColor: "#ffffff",
      borderWidth: 1,
    },
  ];

  return {
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

// Get chart options for Bubble Chart - Mobile optimized
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
        mode: "point",
        intersect: true,
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
            const x = context.raw?.x || 0;
            const y = context.raw?.y || 0;
            const r = context.raw?.r || 0;
            return [
              `${label}`,
              `X: ${x} (Volume/Spend/Engagement)`,
              `Y: ${y} (Margin/Rate/Satisfaction)`,
              `Size: ${r} (Revenue/ROI/Retention)`,
            ];
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
        },
        title: {
          display: true,
          text: "Volume / Spend / Engagement",
          color: "#6b7280",
          font: {
            size: isSmallScreen ? 11 : 13,
            weight: "600",
            family: "'Inter', sans-serif",
          },
          padding: { top: 10, bottom: 5 },
        },
      },
      y: {
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
        },
        title: {
          display: true,
          text: "Margin / Rate / Satisfaction",
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
      duration: 800,
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
        mode: "point",
        intersect: true,
      },
    }),
    // Bubble specific options
    elements: {
      point: {
        hoverRadius: function (context) {
          const size = context.raw?.r || 10;
          return Math.min(size * 1.3, 40); // Limit max hover size
        },
      },
    },
  };
};

// Calculate total stats from bubble chart data
export const calculateStatsFromChartData = (chartData) => {
  if (!chartData || !chartData.datasets) {
    return {
      totalSales: 0,
      marketingImpact: 0,
      customerEngagement: 0,
    };
  }

  let totalSales = 0;
  let marketingImpact = 0;
  let customerEngagement = 0;

  chartData.datasets.forEach((dataset) => {
    const datasetTotal = dataset.data.reduce((sum, bubble) => {
      return sum + (bubble.r || 0); // Sum of bubble radii as value indicator
    }, 0);

    if (dataset.label === "Product Sales") {
      totalSales = datasetTotal;
    } else if (dataset.label === "Marketing Impact") {
      marketingImpact = datasetTotal;
    } else if (dataset.label === "Customer Engagement") {
      customerEngagement = datasetTotal;
    }
  });

  return {
    totalSales: totalSales * 1000, // Scale up for realistic numbers
    marketingImpact: marketingImpact * 500,
    customerEngagement: customerEngagement * 300,
  };
};

// Calculate total value for all bubbles
export const calculateTotalValue = (chartData) => {
  if (!chartData || !chartData.datasets) return 0;

  // Sum all bubble radii across all datasets
  return chartData.datasets.reduce((total, dataset) => {
    return (
      total +
      dataset.data.reduce((sum, bubble) => {
        return sum + (bubble.r || 0);
      }, 0)
    );
  }, 0);
};
