// File: styles/salesOverviewStyles.js
// All styles and constants for SalesOverview component

// Color constants
export const COLORS = {
  primary: "#890eee",
  secondary: "#2ca58d",
  tertiary: "#ffb74d",
  quaternary: "#ff6b6b",
  quinary: "#4d8af0",
  senary: "#ff9f43",
  septenary: "#9c27b0",
  primaryLight: "rgba(137, 14, 238, 0.1)",
  secondaryLight: "rgba(44, 165, 141, 0.1)",
  tertiaryLight: "rgba(255, 183, 77, 0.1)",
};

// Chart colors for 3 datasets
export const PIE_CHART_COLORS = [
  "#890eee", // Total Sales - Purple
  "#2ca58d", // (Unused - keeping for compatibility)
  "#ffb74d", // (Unused - keeping for compatibility)
  "#ff6b6b", // Expenses - Red
  "#4d8af0", // (Unused - keeping for compatibility)
  "#ff9f43", // (Unused - keeping for compatibility)
  "#10b981", // Net Profit - Green (added at position 6)
];

export const PIE_CHART_HOVER_COLORS = [
  "#7a0cd6", // Total Sales hover
  "#27947e", // (Unused)
  "#e6a545", // (Unused)
  "#e56060", // Expenses hover
  "#4379d9", // (Unused)
  "#e68f3c", // (Unused)
  "#0da271", // Net Profit hover
];

// Main styles
export const styles = {
  mainCard: {
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    backgroundColor: "#eef6fb",
    borderRadius: "12px",
    boxShadow: "0 6px 20px #890eee",
    px: { xs: 1.5, sm: 2.5, md: 4 },
    py: { xs: 2, sm: 3, md: 3.5 },
    marginBottom: "40px",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 6px 20px #890eee",
    },
  },

  barChartContainer: {
    flex: 1,
    width: "100%",
    height: { xs: "350px", sm: "380px", md: "400px" },
    position: "relative",
    padding: { xs: "0 8px", sm: "0 12px", md: "0 16px" },
  },
  headerContainer: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: { xs: "stretch", sm: "center" },
    justifyContent: "space-between",
    gap: { xs: 2, sm: 0 },
    marginBottom: { xs: "20px", sm: "28px", md: "32px" },
  },
  header: {
    textAlign: { xs: "center", sm: "left" },
    flex: 1,
  },
  refreshButton: {
    backgroundColor: "#890eee",
    color: "#ffffff",
    borderRadius: "8px",
    textTransform: "none",
    fontWeight: 600,
    boxShadow: "0 4px 12px rgba(137, 14, 238, 0.3)",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#7a0cd6",
      transform: "translateY(-2px)",
      boxShadow: "0 6px 16px rgba(137, 14, 238, 0.4)",
    },
    alignSelf: { xs: "center", sm: "flex-start" },
    minWidth: { xs: "120px", sm: "140px" },
  },
  title: {
    fontSize: { xs: "20px", sm: "24px", md: "28px" },
    fontWeight: 700,
    color: "#111827",
    lineHeight: 1.2,
    marginBottom: "4px",
  },
  subtitle: {
    fontSize: { xs: "13px", sm: "14px", md: "15px" },
    color: "#6b7280",
    fontWeight: 400,
  },
  statsContainer: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    gap: { xs: 1.5, sm: 2, md: 2.5 },
    marginBottom: { xs: 3, sm: 4, md: 5 },
    flexWrap: "wrap",
    justifyContent: "center",
  },
  statCard: {
    flex: { xs: "1 0 100%", sm: "1 0 calc(50% - 16px)", md: 1 },
    maxWidth: { md: "280px" },
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    px: { xs: 2, sm: 2.25, md: 2.5 },
    py: { xs: 2, sm: 2.25, md: 2.5 },
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 6px 20px #890eee",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 16px 30px #890eee",
    },
  },
  statLabel: {
    fontSize: { xs: "13px", sm: "14px" },
    fontWeight: 600,
    color: "#6b7280",
    marginBottom: 1,
    textAlign: "center",
  },
  statValue: {
    fontSize: { xs: "26px", sm: "28px", md: "32px" },
    fontWeight: 800,
    color: "#890eee",
    lineHeight: 1,
    marginBottom: 1.5,
    textAlign: "center",
  },
  statMeta: {
    display: "flex",
    alignItems: "center",
    gap: 0.75,
    marginTop: "auto",
    justifyContent: "center",
  },
  indicatorDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },
  metaText: {
    fontSize: { xs: "12px", sm: "13px" },
    color: "#6b7280",
    fontWeight: 500,
  },
  chartWrapper: {
    width: "100%",
    position: "relative",
  },
  chartContainer: {
    width: "100%",
    minHeight: { xs: "500px", sm: "450px", md: "500px" },
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    px: { xs: 1, sm: 2, md: 2.5 },
    py: { xs: 1.5, sm: 2, md: 2.5 },
    border: "1px solid rgba(137, 14, 238, 0.15)",
    position: "relative",
  },
  loadingContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 1.5,
    minHeight: "300px",
  },
  loadingText: {
    color: "#6b7280",
    fontSize: "14px",
    textAlign: "center",
  },
  chartLegendContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    marginTop: { xs: 1, sm: 2 },
    padding: { xs: 1.5, sm: 1.5, md: 2 },
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    border: "1px solid rgba(137, 14, 238, 0.1)",
    maxHeight: { xs: "220px", sm: "250px" },
    overflowY: "auto",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: { xs: "10px 8px", sm: "12px 10px" },
    borderRadius: "6px",
    transition: "all 0.2s ease",
    cursor: "pointer",
    minHeight: "48px",
    "&:hover": {
      backgroundColor: "rgba(137, 14, 238, 0.05)",
      transform: { xs: "none", sm: "translateX(4px)" },
    },
    "&.disabled": {
      opacity: 0.4,
    },
  },
  legendLeft: {
    display: "flex",
    alignItems: "center",
    gap: { xs: 0.75, sm: 1 },
    flex: 1,
    minWidth: 0,
  },
  legendColorBox: {
    width: { xs: "14px", sm: "16px" },
    height: { xs: "14px", sm: "16px" },
    borderRadius: "4px",
    flexShrink: 0,
  },
  legendLabel: {
    fontSize: { xs: "12px", sm: "14px" },
    fontWeight: 600,
    color: "#374151",
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  legendValueContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 0.25,
    flexShrink: 0,
    ml: 1,
  },
  legendValue: {
    fontSize: { xs: "12px", sm: "14px" },
    fontWeight: 700,
    color: "#111827",
    whiteSpace: "nowrap",
  },
  legendPercentage: {
    fontSize: { xs: "11px", sm: "12px" },
    fontWeight: 500,
    color: "#6b7280",
    whiteSpace: "nowrap",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ml: { xs: 0.5, sm: 1 },
    flexShrink: 0,
  },
  checkbox: {
    width: { xs: "18px", sm: "20px" },
    height: { xs: "18px", sm: "20px" },
    borderRadius: "4px",
    border: "2px solid #d1d5db",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    flexShrink: 0,
    "&.checked": {
      backgroundColor: "#890eee",
      borderColor: "#890eee",
    },
  },
  checkIcon: {
    color: "#ffffff",
    fontSize: { xs: "14px", sm: "16px" },
  },
  chartAndLegendContainer: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "stretch",
    gap: { xs: 2, md: 3 },
    width: "100%",
  },
  barChartContainer: {
    flex: 1,
    width: "100%",
    height: { xs: "350px", sm: "380px", md: "400px" },
    position: "relative",
    padding: { xs: "0 8px", sm: "0 12px", md: "0 16px" }, // Added padding for better line chart display
  },
  barChartWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  totalValueContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    marginTop: { xs: 2, sm: 3 },
    padding: { xs: 1.5, sm: 2 },
    backgroundColor: "#f8f5ff",
    borderRadius: "10px",
    border: "1px solid rgba(137, 14, 238, 0.15)",
    flexWrap: "wrap",
  },
  totalLabel: {
    fontSize: { xs: "14px", sm: "15px" },
    fontWeight: 600,
    color: "#6b7280",
  },
  totalValue: {
    fontSize: { xs: "20px", sm: "24px", md: "28px" },
    fontWeight: 800,
    color: "#890eee",
  },
};
