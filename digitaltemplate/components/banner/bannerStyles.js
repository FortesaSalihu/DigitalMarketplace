// components/Banner/bannerStyles.js
const bannerStyles = {
  root: {
    width: "100%",
    background: "#890eeeff",
    color: "#fff",
  },

  inner: {
    maxWidth: 1280,
    mx: "auto",
    px: { xs: 1, sm: 2 },
    py: { xs: 0.3, sm: 0.5 },
    minHeight: { xs: 32, sm: 40 },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap", // allows wrapping on very small screens
    textAlign: "center",
    gap: { xs: 0.6, sm: 1.2 },
    position: "relative",
  },

  text: {
    fontSize: { xs: 10, sm: 12.5, md: 13 },
    lineHeight: { xs: 1.6, sm: 1.8, md: 2 },
    whiteSpace: { xs: "normal", sm: "nowrap" },
    fontWeight: 400,
  },

  offText: {
    fontWeight: 900,
    fontSize: { xs: 10.5, sm: 12.5, md: 13 },
    color: "#fff",
    lineHeight: { xs: 1.6, sm: 1.8, md: 2 },
  },

  ctaButton: {
    px: { xs: 1.2, sm: 1.5 },
    py: { xs: 0.2, sm: 0.35 },
    //   borderRadius: { xs: 1, sm: 999 }, // slightly rounded on small, pill on large
    backgroundColor: "#fff",
    color: "#0f172a",
    textTransform: "none",
    fontWeight: 600,
    fontSize: { xs: 10, sm: 11.5, md: 12 },
    "&:hover": { backgroundColor: "#f8fafc" },
    lineHeight: { xs: 1.4, sm: 1.8 },
    minWidth: "auto",
  },

  closeBtn: {
    position: "absolute",
    right: { xs: 4, sm: 6 },
    top: "50%",
    transform: "translateY(-50%)",
    color: "#ffffffcc",
    "&:hover": { color: "#fff" },
    padding: { xs: 0.25, sm: 0.5 },
  },
};

export default bannerStyles;
