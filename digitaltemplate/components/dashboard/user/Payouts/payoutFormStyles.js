export const payoutFormStyles = {
  root: {
    width: "100%",
    minHeight: "100vh",
    bgcolor: "#eef6fb",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    width: "100%",
    background: "#890eeeff",
    color: "#fff",
    py: 10,
    px: 2,
    textAlign: "center",
    mb: 4,

    boxShadow: 1,
    "& h5": { fontWeight: 700 },
  },
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    px: 2,
    mb: 4,
  },
  card: {
    width: { xs: "95%", sm: "640px", md: "720px" }, // Increased width for two columns
    bgcolor: "#fff",
    borderRadius: 2,
    boxShadow: 3,
    p: { xs: 2, sm: 4 },
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  // New styles for two-column layout
  row: {
    display: "flex",
    gap: 2,
    width: "100%",
    "@media (max-width: 600px)": {
      flexDirection: "column",
      gap: 1,
    },
  },
  field: {
    flex: 1,
    minWidth: 0, // Prevents flex items from overflowing
  },
  payButton: {
    mt: 2,
    background: "#890eeeff",
    color: "#fff",
    "&:hover": {
      opacity: 0.95,
      background: "#890eeeff",
    },
    textTransform: "none",
    py: 1.5,
    fontSize: "1.1rem",
    fontWeight: 600,
  },
};
