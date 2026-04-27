// components/Categories/categoriesStyles.js
const categoriesStyles = {
  root: {
    borderBottom: "1px solid #e2e8f0",
    backgroundColor: "white",
    position: "relative",
    display: { xs: "none", sm: "block" },
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "8px 16px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 1,
    position: "relative",
    // REMOVED overflow hidden from here
  },
  categoriesContainer: {
    flex: 1,
    // REMOVED overflow hidden from here
    position: "relative",
  },
  categoriesRow: {
    display: "flex",
    gap: 3,
    alignItems: "flex-start",
    overflowX: "hidden", // Only horizontal hidden
    overflowY: "visible", // CHANGED: Allow vertical overflow for subcategories
    py: 1,
    scrollBehavior: "smooth",
    position: "relative",
    minHeight: "60px", // Ensure space for subcategories
  },
  categoryColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    flexShrink: 0,
  },
  categoryWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    marginBottom: 1,
    position: "relative",
    zIndex: 10,
  },
  categoryBtn: {
    textTransform: "none",
    color: "#0f172a",
    fontWeight: 700,
    minWidth: "auto",
    px: 2,
    whiteSpace: "nowrap",
    border: "1px solid transparent",
    borderRadius: "20px",
    "&:hover": {
      backgroundColor: "#f8fafc",
      borderColor: "#e2e8f0",
      color: "#0b63ff",
    },
    position: "relative",
    zIndex: 10,
  },
  arrowBtn: {
    color: "#64748b",
    padding: "2px",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#0b63ff",
    },
    position: "relative",
    zIndex: 10,
  },
  arrowNavButton: {
    color: "#64748b",
    border: "1px solid #e2e8f0",
    flexShrink: 0,
    marginTop: "8px",
    "&:hover": {
      backgroundColor: "#f8fafc",
      color: "#0b63ff",
    },
    "&:disabled": {
      color: "#cbd5e1",
      borderColor: "#f1f5f9",
    },
    zIndex: 1,
  },
  subcategoriesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 0.5,
    minWidth: "200px",
    padding: "12px",
    backgroundColor: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    position: "absolute",
    top: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 9999, // Very high z-index
    marginTop: "4px",
  },
  subcategoryItem: {
    textTransform: "none",
    justifyContent: "flex-start",
    padding: "8px 12px",
    color: "#0f172a",
    fontSize: "0.875rem",
    minHeight: "auto",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "#f1f5f9",
    },
    width: "100%",
  },
  subItem: {
    fontSize: "0.875rem",
    color: "#0f172a",
    fontWeight: 400,
    textAlign: "left",
    width: "100%",
  },
  // Mobile header styles (shown only on mobile)
  mobileHeader: {
    display: { xs: "flex", sm: "none" },
    justifyContent: "center",
    alignItems: "center",
    py: 1,
    borderBottom: "1px solid #e2e8f0",
    backgroundColor: "white",
  },
  mobileMenuIcon: {
    color: "#0b63ff",
    flexDirection: "column",
    fontSize: "0.75rem",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
    borderBottom: "1px solid #e2e8f0",
  },
  drawerItem: {
    textTransform: "none",
    justifyContent: "flex-start",
    width: "100%",
    py: 0.8,
    color: "#0f172a",
  },
};

export default categoriesStyles;
