// components/Header/headerStyles.js
const headerStyles = {
  appBar: {
    backgroundColor: "#ffffff",
    boxShadow: "none",
    borderBottom: "1px solid rgba(15, 23, 42, 0.06)",
    position: "sticky",
    top: 0,
    zIndex: 1200,
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    px: { xs: 1, sm: 2, md: 3 },
    minHeight: { xs: 56, sm: 64 },
    position: "relative",
  },

  // LEFT: logo container
  left: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    zIndex: 1300, // above centered area if overlap
    flexShrink: 0,
  },

  logoBox: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
  },

  logoImage: {
    width: { xs: 90, sm: 110 },
    height: "auto",
    display: "block",
  },

  // CENTER: absolutely centered container so it stays in the exact center
  centerArea: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    gap: { xs: 0.6, sm: 1.5 },
    // allow wrap on very small screens
    flexWrap: "wrap",
    justifyContent: "center",
    pointerEvents: "none", // allow clicks to pass through unless child opts in
    width: { xs: "90%", sm: "auto" },
  },

  centerInteractive: {
    pointerEvents: "auto", // childrens clickable
    display: "flex",
    alignItems: "center",
    gap: { xs: 0.6, sm: 1.2 },
    justifyContent: "center",
  },

  navLinks: {
    display: { xs: "none", md: "flex" },
    gap: 3,
    alignItems: "center",
    justifyContent: "center",
  },

  navLink: {
    color: "#0f172a",
    textDecoration: "none",
    fontSize: { xs: 13, sm: 14 },
    fontWeight: 500,
    "&:hover": { color: "#0b63ff" },
  },

  // Start Selling button - visually emphasized and exactly centered
  startSellingBtn: {
    borderRadius: 1,
    textTransform: "none",
    borderColor: "#cfe4ff",
    color: "#ffffff",
    fontWeight: 900,
    px: { xs: 1.1, sm: 1.8 },
    py: { xs: 0.35, sm: 0.55 },
    fontSize: { xs: 12, sm: 13 },
    backgroundColor: "#890eeeff",
    boxShadow: "0 1px 0 rgba(11,99,255,0.04)",
    "&:hover": { backgroundColor: "#890eeeff" },
  },

  // RIGHT: icons area
  rightControls: {
    display: "flex",
    alignItems: "center",
    gap: { xs: 0.5, sm: 1 },
    flexShrink: 0,
    zIndex: 1300,
  },

  iconButton: {
    backgroundColor: "#890eeeff",
    color: "#ffffff",
    width: { xs: 34, sm: 38 },
    height: { xs: 34, sm: 38 },
    "&:hover": {
      backgroundColor: "#ffffff",
      color: "#890eeeff",
    },
  },

  mobileMenuButton: {
    display: { xs: "flex", md: "none" },
    ml: 1,
  },

  // Drawer styling
  drawerPaper: {
    width: 300,
  },

  // Mobile center fallback (when toolbar real-estate is tight)
  mobileCenterStack: {
    display: { xs: "flex", md: "none" },
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    py: 0.5,
    borderTop: "1px solid rgba(15,23,42,0.04)",
  },
};

export default headerStyles;
