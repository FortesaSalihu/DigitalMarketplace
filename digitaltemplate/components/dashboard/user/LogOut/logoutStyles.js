// logoutStyles.js
const logoutStyles = {
  /* Root container with gradient background */
  rootContainer: {
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // background: "linear-gradient(135deg, #890eee 0%, #6a0dad 100%)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
  },

  /* Main logout card with entrance animation */
  logoutCard: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: { xs: "40px 25px", md: "50px 40px" },
    boxShadow: "0 25px 50px rgba(137, 14, 238, 0.25)",
    textAlign: "center",
    maxWidth: "450px",
    width: "90%",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    animation: "fadeInUp 0.6s ease-out",
    "@keyframes fadeInUp": {
      "0%": {
        opacity: 0,
        transform: "translateY(30px)",
      },
      "100%": {
        opacity: 1,
        transform: "translateY(0)",
      },
    },
  },

  /* Logout icon container with pulse animation */
  logoutIcon: {
    width: "100px",
    height: "100px",
    background: "linear-gradient(135deg, #890eee 0%, #a64dff 100%)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 25px",
    color: "#ffffff",
    fontSize: "2.5rem",
    boxShadow: "0 10px 25px rgba(137, 14, 238, 0.3)",
    animation: "pulse 2s infinite",
    "@keyframes pulse": {
      "0%": {
        transform: "scale(1)",
        boxShadow: "0 10px 25px rgba(137, 14, 238, 0.3)",
      },
      "50%": {
        transform: "scale(1.05)",
        boxShadow: "0 15px 30px rgba(137, 14, 238, 0.4)",
      },
      "100%": {
        transform: "scale(1)",
        boxShadow: "0 10px 25px rgba(137, 14, 238, 0.3)",
      },
    },
  },

  /* Title with gradient text */
  logoutTitle: {
    color: "transparent",
    background: "linear-gradient(135deg, #890eee 0%, #6a0dad 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 700,
    fontSize: { xs: "1.875rem", md: "2.25rem" },
    marginBottom: "15px",
  },

  /* Message text */
  logoutMessage: {
    color: "#718096",
    fontSize: { xs: "1rem", md: "1.125rem" },
    marginBottom: "35px",
    lineHeight: 1.7,
  },

  /* Buttons container */
  logoutButtons: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "10px",
  },

  /* Base button styles with transitions */
  customButton: {
    padding: "14px 32px",
    border: "2px solid",
    borderRadius: "50px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    textTransform: "none",
    letterSpacing: "0.5px",
    minWidth: "140px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    "&:hover": {
      transform: "translateY(-2px)",
    },
  },

  /* Primary button (Sign Out) */
  buttonPrimary: {
    background: "linear-gradient(135deg, #890eee 0%, #a64dff 100%)",
    color: "#ffffff",
    borderColor: "#890eee",
    boxShadow: "0 4px 15px rgba(137, 14, 238, 0.2)",
    "&:hover": {
      background: "linear-gradient(135deg, #7a0dd6 0%, #9540e6 100%)",
      borderColor: "#7a0dd6",
      boxShadow: "0 12px 25px rgba(137, 14, 238, 0.35)",
    },
  },

  /* Secondary button (Cancel) */
  buttonSecondary: {
    background: "transparent",
    color: "#890eee",
    borderColor: "#890eee",
    "&:hover": {
      background: "#890eee",
      color: "#ffffff",
      boxShadow: "0 12px 25px rgba(137, 14, 238, 0.25)",
    },
  },

  /* Loading spinner animation */
  loadingSpinner: {
    width: "20px",
    height: "20px",
    border: "2px solid transparent",
    borderTop: "2px solid currentColor",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    "@keyframes spin": {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
  },

  /* Success state styles */
  successCard: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: { xs: "40px 25px", md: "50px 40px" },
    boxShadow: "0 25px 50px rgba(137, 14, 238, 0.25)",
    textAlign: "center",
    maxWidth: "450px",
    width: "90%",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    animation: "slideInLeft 0.6s ease-out",
    "@keyframes slideInLeft": {
      "0%": {
        opacity: 0,
        transform: "translateX(-30px)",
      },
      "100%": {
        opacity: 1,
        transform: "translateX(0)",
      },
    },
  },

  /* Success icon animation */
  successIcon: {
    width: "100px",
    height: "100px",
    background: "linear-gradient(135deg, #00c853 0%, #00a848 100%)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 25px",
    color: "#ffffff",
    fontSize: "2.5rem",
    boxShadow: "0 10px 25px rgba(0, 200, 83, 0.3)",
    animation: "bounceIn 0.6s ease-out",
    "@keyframes bounceIn": {
      "0%": {
        opacity: 0,
        transform: "scale(0.3)",
      },
      "50%": {
        opacity: 1,
        transform: "scale(1.05)",
      },
      "70%": {
        transform: "scale(0.9)",
      },
      "100%": {
        opacity: 1,
        transform: "scale(1)",
      },
    },
  },

  /* Footer text */
  footerText: {
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #e2e8f0",
    color: "#a0aec0",
    fontSize: "0.75rem",
  },

  /* Mobile responsive adjustments */
  mobileStyles: {
    "@media (max-width: 480px)": {
      logoutButtons: {
        flexDirection: "column",
        width: "100%",
      },
      customButton: {
        width: "100%",
        minWidth: "auto",
      },
    },
  },

  /* Hover effects for interactive elements */
  hoverLift: {
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 20px rgba(137, 14, 238, 0.15)",
    },
  },

  /* Focus states for accessibility */
  focusRing: {
    "&:focus": {
      outline: "2px solid #890eee",
      outlineOffset: "2px",
    },
  },

  /* Disabled state styles */
  disabledButton: {
    opacity: 0.6,
    cursor: "not-allowed",
    "&:hover": {
      transform: "none",
      boxShadow: "none",
    },
  },
};

export default logoutStyles;
