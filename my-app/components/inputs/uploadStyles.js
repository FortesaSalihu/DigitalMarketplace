// styles/inputStyles.js
const inputStyles = {
  container: {
    width: "100%",
    position: "relative",
  },

  // Modern upload area
  imageUpload: {
    border: "2px dashed  #890eeeff",
    borderColor: "grey.300",
    borderRadius: "20px",
    backgroundColor: "#fafafa",
    padding: { xs: 3, md: 5 },
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
    marginBottom: "30px",

    "&:hover": {
      borderColor: "#890eeeff",
      backgroundColor: "rgba(137, 14, 238, 0.02)",
      transform: "translateY(-2px)",
      boxShadow: "0 10px 40px rgba(137, 14, 238, 0.1)",
    },

    "&:active": {
      transform: "translateY(0)",
    },

    "&.dragOver": {
      borderColor: "primary.main",
      backgroundColor: "rgba(137, 14, 238, 0.05)",
      borderStyle: "solid",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(137, 14, 238, 0.03)",
        zIndex: 1,
      },
    },
  },

  // Main icon container
  mainIconContainer: {
    position: "relative",
    width: "100px",
    height: "100px",
    margin: "0 auto 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "&::before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      background:
        "linear-gradient(135deg, rgba(137, 14, 238, 0.1) 0%, rgba(186, 104, 200, 0.1) 100%)",
      zIndex: 0,
    },

    "&::after": {
      content: '""',
      position: "absolute",
      width: "120%",
      height: "120%",
      borderRadius: "50%",
      border: "2px dashed #890eeeff",
      animation: "rotate 20s linear infinite",
      zIndex: 0,
    },
  },

  // Main icon
  mainIcon: {
    fontSize: "56px !important",
    color: "#890eeeff",
    position: "relative",
    zIndex: 1,
    animation: "bounce 2s infinite",
  },

  // Upload button
  uploadButton: {
    padding: "14px 36px",
    borderRadius: "12px",
    fontSize: "1.1rem",
    fontWeight: 600,
    textTransform: "none",
    background: "linear-gradient(45deg, #890EEE 0%, #890eeeff 100%)",
    boxShadow: "0 6px 20px #890eeeff",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",

    "&:hover": {
      background: "linear-gradient(45deg, #7A0AD7 0%, #890eeeff 100%)",
      boxShadow: "0 10px 30px rgba(137, 14, 238, 0.5)",
      transform: "translateY(-2px)",
    },

    "&:active": {
      transform: "translateY(0)",
    },

    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: "-100%",
      width: "100%",
      height: "100%",
      background: "linear-gradient(90deg, transparent, #890eeeff, transparent)",
      transition: "left 0.5s ease",
    },

    "&:hover::after": {
      left: "100%",
    },
  },

  // File list container
  fileListContainer: {
    marginTop: "32px",
    backgroundColor: "white",
    borderRadius: "16px",
    border: "1px solid",
    borderColor: "grey.200",
    overflow: "hidden",
    boxShadow: "0 4px 20px #890eeeff)",
  },

  // File item
  fileItem: {
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid",
    borderColor: "grey.200",
    backgroundColor: "white",
    marginBottom: "12px",
    transition: "all 0.3s ease",

    "&:hover": {
      borderColor: "primary.light",
      backgroundColor: "rgba(137, 14, 238, 0.02)",
      boxShadow: "0 6px 20px #890eeeff",
      transform: "translateY(-2px)",
    },
  },

  // File icon wrapper
  fileIconWrapper: {
    width: "48px",
    height: "48px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "16px",
    flexShrink: 0,
  },

  // Progress bar
  progressBar: {
    height: "8px",
    borderRadius: "4px",
    backgroundColor: "grey.200",
    overflow: "hidden",

    "& .MuiLinearProgress-bar": {
      borderRadius: "4px",
      background: "linear-gradient(90deg, #890EEE 0%, #890eeeff 100%)",
    },
  },

  // Progress percentage
  progressPercentage: {
    fontSize: "0.85rem !important",
    fontWeight: 600,
    color: "primary.main",
    minWidth: "45px",
    textAlign: "right",
  },

  // Delete button
  deleteButton: {
    padding: "6px",
    borderRadius: "8px",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    color: "error.main",
    transition: "all 0.2s ease",

    "&:hover": {
      backgroundColor: "rgba(239, 68, 68, 0.2)",
      transform: "scale(1.1)",
    },
  },

  error: {
    borderColor: "error.main",
    backgroundColor: "rgba(239, 68, 68, 0.02)",
    "&:hover": {
      borderColor: "error.dark",
      backgroundColor: "rgba(239, 68, 68, 0.05)",
    },
  },

  disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
    "&:hover": {
      borderColor: "grey.300",
      backgroundColor: "#fafafa",
      transform: "none",
      boxShadow: "none",
    },
  },

  helperText: {
    marginTop: "12px",
    paddingLeft: "16px",
    fontSize: "0.9rem !important",

    "&.error": {
      color: "error.main",
    },
  },
};

export default inputStyles;
