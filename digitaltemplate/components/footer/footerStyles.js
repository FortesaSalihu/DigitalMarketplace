// components/footerModernStyles.js

const footerModernStyles = {
  root: {
    backgroundColor: "#141414",
    color: "#e6e6e6",
    py: { xs: 5, md: 8 },
    px: { xs: 2, sm: 4, md: 10 },
    borderTop: "4px solid #890eeeff",
  },

  container: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    justifyContent: "space-between",
    alignItems: { xs: "flex-start", md: "flex-start" },
    gap: { xs: 4, md: 8 },
    mb: 6,
  },

  columnGroup: {
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr 1fr",
      sm: "repeat(3, 1fr)",
      md: "repeat(4, 1fr)",
    },
    gap: { xs: 3, md: 6 },
    flex: 1,
  },

  column: {
    "& .colTitle": {
      fontWeight: 700,
      fontSize: 14,
      color: "#ffffff",
      mb: 1.5,
      letterSpacing: 0.5,
    },
    "& a": {
      display: "block",
      color: "#ffffff", // 🤍 default link color
      fontSize: 13,
      textDecoration: "none",
      mb: 0.6,
      transition: "all 0.3s ease",
      "&:hover": {
        color: "#890eeeff", // 💜 hover color
        transform: "translateX(4px)",
      },
    },
  },

  statsBox: {
    textAlign: { xs: "left", md: "right" },
    minWidth: { md: 220 },
  },

  statsTitle: {
    fontWeight: 600,
    fontSize: 13,
    opacity: 0.85,
  },

  statsValue: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 1.2,
  },

  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.06)",
    mb: 4,
  },

  bottomRow: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    justifyContent: "space-between",
    alignItems: { xs: "flex-start", md: "center" },
    gap: 3,
    fontSize: 13,
    color: "rgba(230,230,230,0.65)",
  },

  bottomLinks: {
    display: "flex",
    gap: 2,
    flexWrap: "wrap",
    "& a": {
      color: "#ffffff", // 🤍 default color
      textDecoration: "none",
      transition: "color 0.3s",
      "&:hover": {
        color: "#890eeeff", // 💜 hover color
      },
    },
  },

  social: {
    display: "flex",
    gap: 1.2,
    "& .MuiSvgIcon-root": {
      fontSize: 20,
      color: "#ffffff", // 🤍 default
      transition: "color 0.3s ease",
      "&:hover": { color: "#890eeeff" }, // 💜 hover
    },
  },
};

export default footerModernStyles;
