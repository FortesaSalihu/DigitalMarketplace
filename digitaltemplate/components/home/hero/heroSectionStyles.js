export const heroStyles = {
  root: {
    position: "relative",
    px: { xs: 2, md: 6 },
    py: { xs: 8, md: 14 },
    width: "100%",
    overflow: "hidden",

    // 🌄 Background image + overlay
    backgroundImage: "url('/image/img2.jpg')", // use your own image path
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",

    // overlay for better readability
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to right, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.75) 100%)",
      zIndex: 0,
    },
  },

  title: {
    fontWeight: 700,
    color: "#890eeeff",
    mb: 1.5,
    fontSize: { xs: "1.35rem", sm: "1.6rem", md: "2rem" },
    lineHeight: 1.2,
  },

  subtitle: {
    color: "black",
    mb: 3,
    maxWidth: { xs: "100%", md: "520px" },
  },

  // Search input container
  searchContainer: {
    display: "flex",
    justifyContent: { xs: "center", md: "flex-start" },
    width: "100%",
    maxWidth: { xs: "100%", md: "600px" },
  },

  inputField: {
    bgcolor: "#fff",
    borderRadius: 6,
    fontSize: "1rem",
    px: 1.5,
    py: 0.9,
    boxShadow: "0 4px 10px rgba(20,20,30,0.06)",
    "& fieldset": { border: "none" }, // remove default border
    "& input": {
      py: 1.4,
      px: 2,
    },
  },

  searchIconButton: {
    bgcolor: "#890eeeff",
    color: "#fff",
    borderRadius: 1,
    width: 86,
    height: 50,
    "&:hover": {
      bgcolor: "#890eeeff",
    },
  },

  imageContainer: {
    width: "100%",
    maxWidth: { xs: "100%", md: "560px" },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },
};
