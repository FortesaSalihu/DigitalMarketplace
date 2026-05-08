// File: styles/salesOverviewStyles.js
// All styles and constants for SalesOverview component

// Color constants
export const COLORS = {
  primary: "#890eee",
  secondary: "#2ca58d",
  tertiary: "#ffb74d",
  primaryLight: "rgba(137, 14, 238, 0.1)",
  secondaryLight: "rgba(44, 165, 141, 0.1)",
  tertiaryLight: "rgba(255, 183, 77, 0.1)",
};

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
      boxShadow: "0 6px 20px #890eee",
    },
  },

  header: {
    width: "100%",
    marginBottom: { xs: "20px", sm: "28px", md: "32px" },
    textAlign: "center",
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
    backgroundColor: "#fff",
    borderRadius: "10px",

    px: { xs: 2, sm: 2.25, md: 2.5 },
    py: { xs: 2, sm: 2.25, md: 2.5 },
    border: "1px solid rgba(137, 14, 238, 0.15)",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 6px 20px #890eee",
    transition: "transform 0.2s ease",
    "&:hover": {
      //transform: "translateY(-4px)",

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
    backgroundColor: "#eef6fb",
  },
  chartContainer: {
    width: "100%",
    minHeight: { xs: "250px", sm: "300px", md: "380px" },
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    px: { xs: 1, sm: 2, md: 2.5 },
    py: { xs: 1, sm: 2, md: 2.5 },
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
    minHeight: "250px",
  },
  loadingText: {
    color: "#6b7280",
    fontSize: "14px",
    textAlign: "center",
  },
};
