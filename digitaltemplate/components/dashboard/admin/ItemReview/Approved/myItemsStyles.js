// File: styles/myItemsStyles.js
export const mainColor = "#890eee";

// Base styles
export const styles = {
  container: {
    width: "100%",
    padding: { xs: 1, sm: 2, md: 3 },
    boxSizing: "border-box",
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: { xs: "stretch", sm: "center" },
    gap: 2,
    mb: { xs: 2, sm: 3 },
    flexDirection: { xs: "column", sm: "row" },
  },

  addButton: {
    textTransform: "none",
    borderRadius: 2,
    boxShadow: "none",
    backgroundColor: mainColor,
    color: "#fff",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: mainColor,
      opacity: 0.92,
      boxShadow: `0 4px 12px ${mainColor}40`,
      transform: "translateY(-1px)",
    },
    transition: "all 0.2s ease",
    px: { xs: 2, sm: 3 },
    py: { xs: 0.75, sm: 1 },
    fontSize: { xs: 13, sm: 14 },
    minWidth: { xs: "auto", sm: 120 },
    minHeight: { xs: 36, sm: 40 },
  },

  // Table Styles
  tableContainer: {
    boxShadow: "none",
    border: `1px solid #e0e0e0`,
    borderRadius: 2,
    overflow: "hidden",
    "&:hover": {
      boxShadow: `0 2px 8px ${mainColor}15`,
    },
  },

  tableWrapper: {
    overflowX: "auto",
  },

  table: {
    minWidth: 900,
  },

  tableRow: {
    "&:last-child td, &:last-child th": { border: 0 },
    "&:hover": {
      backgroundColor: `${mainColor}08`,
    },
  },

  colTitle: {
    width: "50%",
    minWidth: 300,
  },

  colCenter: {
    textAlign: "center",
    verticalAlign: "middle",
    width: 120,
    fontWeight: 500,
  },

  colAction: {
    width: 80,
    textAlign: "center",
  },

  detailsCell: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    py: 1,
  },

  detailsText: {
    minWidth: 0,
    flex: 1,
  },

  thumb: {
    width: 80,
    height: 60,
    borderRadius: 1.5,
    flexShrink: 0,
  },

  titleLink: {
    textDecoration: "none",
  },

  itemTitle: {
    color: "text.primary",
    fontWeight: 600,
    textDecoration: "none",
    "&:hover": {
      color: mainColor,
    },
    transition: "color 0.2s ease",
  },

  categoryText: {
    color: "text.secondary",
    fontSize: "0.75rem",
    mt: 0.25,
  },

  priceText: {
    fontWeight: 700,
    fontSize: "1rem",
  },

  dateText: {
    fontSize: "0.875rem",
  },

  statusChip: {
    backgroundColor: mainColor,
    color: "#fff",
    fontWeight: 600,
    borderRadius: 1.5,
    "& .MuiChip-label": {
      px: 1.5,
    },
  },

  editButton: {
    color: mainColor,
    backgroundColor: `${mainColor}08`,
    "&:hover": {
      backgroundColor: `${mainColor}15`,
      transform: "scale(1.05)",
    },
    transition: "all 0.2s ease",
    borderRadius: 1.5,
  },

  // Load More Button
  loadMoreContainer: {
    textAlign: "center",
    mt: 3,
  },

  loadMoreButton: {
    borderColor: mainColor,
    color: mainColor,
    textTransform: "none",
    borderRadius: 2,
    px: 3,
    py: 1,
    fontSize: { xs: 13, sm: 14 },
    "&:hover": {
      borderColor: mainColor,
      backgroundColor: `${mainColor}08`,
    },
  },
};

// Responsive styles generator
export const responsiveStyles = (isSmallScreen, isExtraSmall) => ({
  // Header responsive styles
  headerTitleBox: {
    mb: { xs: 1, sm: 0 },
  },

  headerTitle: {
    fontWeight: 700,
    fontSize: { xs: "1.125rem", sm: "1.25rem" },
    lineHeight: 1.2,
  },

  headerSubtitle: {
    color: "text.secondary",
    mt: 0.25,
    fontSize: { xs: 12, sm: 14 },
    display: { xs: "none", sm: "block" },
  },

  // Card responsive styles
  cardSpacing: isSmallScreen ? 1.5 : 2,

  card: {
    ...styles.cardMobile,
    p: isSmallScreen ? 0.5 : 0,
  },

  cardContent: {
    p: isSmallScreen ? 1.5 : 2,
    "&:last-child": { pb: isSmallScreen ? 1.5 : 2 },
  },

  cardTopSection: {
    display: "flex",
    gap: isSmallScreen ? 1.5 : 2,
    alignItems: "flex-start",
    mb: 1.5,
  },

  avatar: {
    width: isExtraSmall ? 60 : { xs: 70, sm: 80 },
    height: isExtraSmall ? 45 : { xs: 52, sm: 60 },
    borderRadius: 1,
    flexShrink: 0,
  },

  cardText: {
    flex: 1,
    minWidth: 0,
    mt: isSmallScreen ? 0 : 0.5,
  },

  cardTitle: {
    ...styles.itemTitle,
    fontSize: isExtraSmall ? 13 : { xs: 14, sm: 15 },
    lineHeight: 1.3,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    mb: 0.5,
  },

  cardCategory: {
    color: "text.secondary",
    fontSize: isExtraSmall ? 10 : { xs: 11, sm: 12 },
    display: "block",
  },

  // Stack responsive styles
  stackDirection: isSmallScreen ? "column" : "row",
  stackSpacing: isSmallScreen ? 1 : 2,
  stackAlign: isSmallScreen ? "stretch" : "center",

  // Metadata responsive styles
  metadataBox: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    flexWrap: "wrap",
  },

  priceBox: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
  },

  moneyIcon: {
    fontSize: isExtraSmall ? 14 : 16,
    color: mainColor,
  },

  priceTextMobile: {
    fontWeight: 700,
    fontSize: isExtraSmall ? 13 : 14,
    color: mainColor,
  },

  statusChipMobile: {
    backgroundColor: mainColor,
    color: "#fff",
    fontWeight: 600,
    borderRadius: 1.5,
    height: isExtraSmall ? 22 : 24,
    fontSize: isExtraSmall ? 10 : 11,
    minWidth: isExtraSmall ? 60 : 70,
  },

  // Date responsive styles
  dateBox: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    color: "text.secondary",
    fontSize: isExtraSmall ? 10 : { xs: 11, sm: 12 },
  },

  calendarIcon: {
    fontSize: isExtraSmall ? 12 : 14,
  },

  dateTextMobile: {
    fontSize: isExtraSmall ? 10 : { xs: 11, sm: 12 },
    whiteSpace: "nowrap",
    color: "text.secondary",
    marginLeft: "auto",
    textAlign: isSmallScreen ? "left" : "right",
    display: "block",
    width: isSmallScreen ? "100%" : "auto",
  },

  // Edit button responsive styles
  editButton: {
    ...styles.editButton,
    mt: isSmallScreen ? 0 : 0.5,
    alignSelf: "flex-start",
  },
});

// Card mobile base style
styles.cardMobile = {
  borderRadius: 2,
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  border: `1px solid #f0f0f0`,
  transition: "all 0.2s ease",
  "&:hover": {
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    borderColor: mainColor,
    transform: "translateY(-2px)",
  },
  overflow: "visible",
};
