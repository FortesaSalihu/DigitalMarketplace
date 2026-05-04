// File: components/cartStyles.js

export const cartStyles = {
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
    mb: 6,
  },

  card: {
    width: { xs: "95%", sm: "90%", md: "1200px" },
    bgcolor: "#fff",
    borderRadius: 2,
    boxShadow: 3,
    p: { xs: 2, sm: 4 },
  },

  actionRow: {
    mt: 4,
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 2,
  },

  primaryBtn: {
    background: "#890eeeff",
    color: "#fff",
    textTransform: "none",
    px: 5,
    "&:hover": { opacity: 0.95 },
  },

  outlineBtn: {
    textTransform: "none",
    px: 4,
  },
};
