// File: components/licenseStyles.js

export const licenseStyles = {
  root: {
    width: "100%",
    minHeight: "100vh",
    bgcolor: "#eef6fb",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    py: 6,
    px: 2,
  },

  card: {
    width: { xs: "95%", sm: "90%", md: "1200px" },
    bgcolor: "#fff",
    borderRadius: 2,
    boxShadow: 3,
    p: { xs: 2, sm: 4 },
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: { xs: "flex-start", sm: "center" },
    flexDirection: { xs: "column", sm: "row" },
    gap: 2,
    mb: 3,
  },

  title: {
    fontWeight: 700,
  },

  subtitle: {
    color: "text.secondary",
    fontSize: 14,
  },

  table: {
    border: "1px solid #e0e0e0",
  },

  tableRow: {
    "& td": {
      borderBottom: "1px solid #e0e0e0",
    },
  },

  labelCell: {
    fontWeight: 600,
    width: { xs: "40%", sm: "30%" },
    bgcolor: "#fafafa",
  },

  valueCell: {
    wordBreak: "break-word",
  },

  backBtn: {
    textTransform: "none",
    backgroundColor: "#890eeeff",
    "&:hover": {
      backgroundColor: "#890eeeff",
    },
  },
};
