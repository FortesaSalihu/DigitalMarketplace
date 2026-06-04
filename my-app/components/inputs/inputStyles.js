const inputStyles = {
  // Base container styles
  container: {
    width: "100%",
    mb: 2,
  },

  /* -----------------------------------------
     TEXT INPUT
  ------------------------------------------ */
  textInput: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 1,
      "& fieldset": {
        borderColor: "#890eeeff",
      },
      "&:hover fieldset": {
        borderColor: "#890eeeff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#890eeeff",
        borderWidth: 2,
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#890eeeff",
    },
  },

  /* -----------------------------------------
     PASSWORD INPUT
  ------------------------------------------ */
  passwordInput: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 1,
      "& fieldset": {
        borderColor: "#890eeeff",
      },
      "&:hover fieldset": {
        borderColor: "#890eeeff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#890eeeff",
        borderWidth: 2,
      },
    },
  },

  /* -----------------------------------------
     SELECT INPUT
  ------------------------------------------ */
  selectInput: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 1,
      "& fieldset": {
        borderColor: "#890eeeff",
      },
      "&:hover fieldset": {
        borderColor: "#890eeeff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#890eeeff",
        borderWidth: 2,
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#890eeeff",
    },
  },

  /* -----------------------------------------
     MULTI SELECT
  ------------------------------------------ */
  multiSelect: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 1,
      "& fieldset": {
        borderColor: "#890eeeff",
      },
      "&:hover fieldset": {
        borderColor: "#890eeeff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#890eeeff",
        borderWidth: 2,
      },
    },
    "& .MuiChip-root": {
      backgroundColor: "#890eeeff",
      color: "white",
      margin: "2px",
    },
  },

  /* -----------------------------------------
     IMAGE UPLOAD BOX
  ------------------------------------------ */
  imageUpload: {
    border: "2px dashed",
    borderColor: "#890eeeff",
    borderRadius: 1,
    padding: 3,
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      borderColor: "#890eeeff",
      backgroundColor: "primary.lightest",
    },
    "&.dragOver": {
      borderColor: "#890eeeff",
      backgroundColor: "primary.lightest",
    },
  },

  /* -----------------------------------------
     IMAGE PREVIEW
  ------------------------------------------ */
  imagePreview: {
    width: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: 1,
    marginBottom: 2,
  },

  /* -----------------------------------------
     BUTTON BASE STYLE
  ------------------------------------------ */
  button: {
    borderRadius: 1,
    textTransform: "none",
    fontWeight: 600,
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: 4,
    },
    "&:active": {
      transform: "translateY(0)",
    },
  },

  /* -----------------------------------------
     BUTTON VARIANTS
  ------------------------------------------ */
  buttonContained: {
    backgroundColor: "#890eeeff",
    color: "white",
    "&:hover": {
      backgroundColor: "#6a08c9ff",
    },
  },

  buttonOutlined: {
    borderColor: "#890eeeff",
    color: "#890eeeff",
    "&:hover": {
      backgroundColor: "primary.lightest",
      borderColor: "#6a08c9ff",
    },
  },

  buttonText: {
    color: "#890eeeff",
    "&:hover": {
      backgroundColor: "primary.lightest",
    },
  },

  /* -----------------------------------------
     BUTTON SIZES
  ------------------------------------------ */
  buttonSmall: {
    padding: "6px 16px",
    fontSize: "0.875rem",
  },

  buttonMedium: {
    padding: "8px 22px",
    fontSize: "1rem",
  },

  buttonLarge: {
    padding: "11px 28px",
    fontSize: "1.125rem",
  },

  /* -----------------------------------------
     BUTTON STATES
  ------------------------------------------ */
  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
    "&:hover": {
      transform: "none",
      boxShadow: "none",
    },
  },

  buttonLoading: {
    position: "relative",
    color: "transparent",
    "&:hover": {
      transform: "none",
    },
  },

  /* -----------------------------------------
     SWITCH BASE STYLE
  ------------------------------------------ */
  switch: {
    "& .MuiSwitch-switchBase": {
      "&.Mui-checked": {
        color: "#890eeeff",
        "& + .MuiSwitch-track": {
          backgroundColor: "#890eeeff",
        },
      },
    },
  },

  /* -----------------------------------------
     SWITCH SIZES
  ------------------------------------------ */
  switchSmall: {
    "& .MuiSwitch-switchBase": {
      padding: 2,
    },
    "& .MuiSwitch-thumb": {
      width: 16,
      height: 16,
    },
    "& .MuiSwitch-track": {
      width: 32,
      height: 16,
      borderRadius: 8,
    },
  },

  switchMedium: {
    "& .MuiSwitch-switchBase": {
      padding: 3,
    },
    "& .MuiSwitch-thumb": {
      width: 20,
      height: 20,
    },
    "& .MuiSwitch-track": {
      width: 40,
      height: 20,
      borderRadius: 10,
    },
  },

  switchLarge: {
    "& .MuiSwitch-switchBase": {
      padding: 4,
    },
    "& .MuiSwitch-thumb": {
      width: 24,
      height: 24,
    },
    "& .MuiSwitch-track": {
      width: 48,
      height: 24,
      borderRadius: 12,
    },
  },

  /* -----------------------------------------
     ERROR STATE
  ------------------------------------------ */
  error: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 1,
      "& fieldset": {
        borderColor: "error.main",
      },
      "&:hover fieldset": {
        borderColor: "error.main",
      },
      "&.Mui-focused fieldset": {
        borderColor: "error.main",
      },
    },
  },

  /* -----------------------------------------
     SUCCESS STATE
  ------------------------------------------ */
  success: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 1,
      "& fieldset": {
        borderColor: "success.main",
      },
      "&:hover fieldset": {
        borderColor: "success.main",
      },
      "&.Mui-focused fieldset": {
        borderColor: "success.main",
      },
    },
  },

  /* -----------------------------------------
     DISABLED INPUT STATE
  ------------------------------------------ */
  disabled: {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "grey.50",
      borderRadius: 1,
      "& fieldset": {
        borderColor: "grey.300",
      },
    },
  },

  /* -----------------------------------------
     SIZE VARIANTS
  ------------------------------------------ */
  small: {
    "& .MuiInputBase-root": {
      fontSize: "0.875rem",
    },
  },

  large: {
    "& .MuiInputBase-root": {
      fontSize: "1.125rem",
    },
  },
};

export default inputStyles;
