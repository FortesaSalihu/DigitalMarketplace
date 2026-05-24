// dashboardStyles.js
const dashboardStyles = {
  // root container (ensures page background is consistent)
  rootBox: {
    display: "flex",
    minHeight: "100vh",
    background: "#eef6fb",
  },

  /* Appbar */
  appbar: {
    background: "#f8fbff",
    boxShadow: "none",
    borderBottom: "1px solid rgba(0,0,0,0.04)",
  },
  toolbar: {
    minHeight: "72px",
    px: { xs: 2, md: 3 },
  },
  topWelcome: {
    color: "#0b2a3a",
    fontWeight: 700,
    fontSize: "15px",
  },

  /* Sidebar */
  sidebarRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    px: 2,
    pt: 3,
    background: "#ffffff",
  },
  logoWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    mb: 2,
  },
  logoBox: {
    background: "#890eeeff",
    color: "#ffffff",
    fontWeight: 900,
    fontSize: "16px",
    textTransform: "lowercase",
    letterSpacing: "0.6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "220px",
    height: "44px",
    borderRadius: "8px",
    boxShadow: "0 1px 4px rgba(11,118,209,0.12)",
  },

  /* Sidebar item button: includes hover rules that change bg + text/icon color */
  sidebarButton: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    textTransform: "none",
    py: 1.1,
    px: 1.5,
    borderRadius: "8px",
    // base icon color
    "& .MuiListItemIcon-root": {
      color: "#6b7280",
      minWidth: 40,
    },
    "& .MuiListItemText-root .MuiTypography-root": {
      color: "#111827",
      fontSize: 14,
      fontWeight: 500,
    },
    // HOVER state
    "&:hover": {
      background: "#890eeeff", // hover background (your requested color)
      color: "#ffffff",
      transform: "translateY(-1px)",
      boxShadow: "0 6px 18px rgba(137,14,238,0.08)",
      "& .MuiListItemIcon-root": {
        color: "#ffffff",
      },
      "& .MuiListItemText-root .MuiTypography-root": {
        color: "#ffffff",
      },
    },
  },

  /* Active style (apply conditionally) */
  sidebarButtonActive: {
    background: "#890eeeff",
    color: "#ffffff",
    "& .MuiListItemIcon-root": { color: "#ffffff" },
    "& .MuiListItemText-root .MuiTypography-root": {
      color: "#ffffff",
      fontWeight: 700,
    },
  },

  /* Main content */
  mainContainer: {
    background: "#eef6fb",
    minHeight: "100vh",
    p: { xs: 2, md: 4 },
  },

  headerTitle: {
    color: "#0b2a3a",
    fontWeight: 800,
    mb: 2,
  },

  /* Cards */
  cardContent: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    p: 2,
  },
  cardIconWrapGreen: {
    width: 64,
    height: 64,
    borderRadius: 2,
    background: "linear-gradient(90deg,#2e8b57,#2aa173)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardIconWrapYellow: {
    width: 64,
    height: 64,
    borderRadius: 2,
    background: "linear-gradient(90deg,#e6b63a,#e0a800)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardIconWrapBlue: {
    width: 64,
    height: 64,
    borderRadius: 2,
    background: "linear-gradient(90deg,#2b7be9,#2a5bd6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardNumber: {
    color: "#0b2a3a",
    fontWeight: 800,
    fontSize: 22,
  },
  cardLabel: {
    color: "#6b7280",
    fontSize: 13,
  },
};

export default dashboardStyles;
