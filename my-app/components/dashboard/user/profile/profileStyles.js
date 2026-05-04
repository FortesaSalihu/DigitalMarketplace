// styles/profileStyles.js
const styles = {
  pageWrapper: {
    padding: { xs: 2, sm: 3, md: 2 },
    maxWidth: 1200,
    margin: "0 auto",
  },

  // main container uses flexbox
  container: {
    display: "flex",
    gap: 10, // <<< REDUCED GAP (tight like screenshot)
    alignItems: "flex-start",
    flexDirection: { xs: "column", md: "row" },
  },

  // Sidebar
  sidebar: {
    width: { xs: "100%", md: 300 }, // 300px to match screenshot
    flex: { xs: "unset", md: "0 0 300px" },
    padding: 2,
    borderRadius: 2,
    boxSizing: "border-box",
  },

  sidebarHeader: {
    display: "flex",
    gap: 2,
    alignItems: "center",
    borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
    paddingBottom: 2,
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: "12px",
    objectFit: "cover",
    mr: 1,
  },

  nameText: {
    fontWeight: 700,
  },

  icon: {
    color: "#6a08c9ff",
    marginRight: 1.25,
  },

  listItem: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    px: 0,
    py: 1,
  },

  // Form area
  form: {
    flex: 1,
    width: { xs: "100%", md: "auto" },
    padding: 2,
    borderRadius: 2,
    boxSizing: "border-box",
  },

  tabRow: {
    display: "flex",
    gap: 2,
    alignItems: "center",
    borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
    paddingBottom: 1,
  },

  tab: {
    fontSize: 14,
    padding: "6px 10px",
    borderRadius: 1,
    color: "text.secondary",
    cursor: "pointer",
  },

  tabActive: {
    fontSize: 14,
    padding: "6px 12px",
    borderRadius: 1,
    color: "#890eeeff",
    fontWeight: 700,
    cursor: "pointer",
  },

  formInner: {
    mt: 1.5,
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },

  // Two-column rows inside form (stack on mobile)
  row: {
    display: "flex",
    gap: 2,
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "center",
  },

  field: {
    flex: 1,
    minWidth: 0,
  },

  updateButton: {
    textTransform: "none",
    boxShadow: "none",
    px: 3,
    py: 1,
  },
};

export default styles;
