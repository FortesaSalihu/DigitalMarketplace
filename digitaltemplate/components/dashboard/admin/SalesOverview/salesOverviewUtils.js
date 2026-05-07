// File: utils/salesOverviewUtils.js
// Utility functions for SalesOverview component

// Generate sample data
export const generateChartData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  const generateDataset = (min, max) => {
    return months.map(() => {
      const base = Math.floor(Math.random() * (max - min + 1)) + min;
      return base;
    });
  };

  return {
    labels: months,
    datasets: [
      {
        label: "Total Sales",
        data: generateDataset(12000, 35000),
        borderColor: "#890eee",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(137, 14, 238, 0.3)");
          gradient.addColorStop(1, "rgba(137, 14, 238, 0.05)");
          return gradient;
        },
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#890eee",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 8,
      },
      {
        label: "Author Commission",
        data: generateDataset(3000, 9000),
        borderColor: "#2ca58d",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(44, 165, 141, 0.3)");
          gradient.addColorStop(1, "rgba(44, 165, 141, 0.05)");
          return gradient;
        },
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#2ca58d",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 8,
      },
      {
        label: "Platform Revenue",
        data: generateDataset(1500, 5000),
        borderColor: "#ffb74d",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(255, 183, 77, 0.3)");
          gradient.addColorStop(1, "rgba(255, 183, 77, 0.05)");
          return gradient;
        },
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#ffb74d",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 8,
      },
    ],
  };
};

// Format currency values
export const formatValue = (val) => {
  if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
  return `$${val.toLocaleString("en-IN")}`;
};

// Get chart options
export const getChartOptions = (isMobile, isTablet) => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: "index",
  },
  plugins: {
    legend: {
      position: isMobile ? "bottom" : "top",
      align: "center",
      labels: {
        boxWidth: 8,
        padding: isMobile ? 10 : 15,
        font: {
          size: isMobile ? 10 : isTablet ? 11 : 12,
          family: "'Inter', sans-serif",
        },
        usePointStyle: true,
      },
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
      padding: isMobile ? 8 : 12,
      cornerRadius: 8,
      displayColors: true,
      usePointStyle: true,
      titleFont: {
        size: isMobile ? 11 : isTablet ? 12 : 14,
        weight: "600",
        family: "'Inter', sans-serif",
      },
      bodyFont: {
        size: isMobile ? 12 : isTablet ? 13 : 14,
        family: "'Inter', sans-serif",
      },
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || "";
          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            const value = context.parsed.y;
            label += `₹${value.toLocaleString("en-IN")}`;
          }
          return label;
        },
        title: function (tooltipItems) {
          return tooltipItems[0].label;
        },
      },
      ...(isMobile && {
        boxPadding: 5,
        caretSize: 6,
        caretPadding: 8,
        xPadding: 10,
        yPadding: 8,
        titleMarginBottom: 4,
      }),
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        font: {
          size: isMobile ? 9 : isTablet ? 10 : 12,
          family: "'Inter', sans-serif",
        },
        color: "#6b7280",
        padding: isMobile ? 2 : 8,
        maxRotation: isMobile ? 45 : 0,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0.05)",
        drawBorder: false,
      },
      ticks: {
        callback: function (value) {
          if (value >= 1000000) return `₹${(value / 1000000).toFixed(1)}M`;
          if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
          return `₹${value}`;
        },
        font: {
          size: isMobile ? 9 : isTablet ? 10 : 12,
          family: "'Inter', sans-serif",
        },
        color: "#6b7280",
        padding: isMobile ? 2 : 8,
        maxTicksLimit: isMobile ? 5 : 8,
      },
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      hoverRadius: isMobile ? 6 : 8,
      hoverBorderWidth: isMobile ? 1 : 2,
    },
  },
  events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
  ...(isMobile && {
    onHover: (event, chartElements) => {
      event.native.target.style.cursor = chartElements[0]
        ? "pointer"
        : "default";
    },
  }),
});
