const createWithdrawalMethodStyles = {
  /* ===============================
     Page Wrapper
  ================================ */
  pageWrapper: {
    backgroundColor: "#f5f7fb",
    minHeight: "100vh",
    padding: {
      xs: "16px",
      sm: "24px",
      md: "32px",
    },
  },

  /* ===============================
     Paper Card Container
  ================================ */
  paper: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: {
      xs: "16px",
      sm: "24px",
    },
    borderRadius: "8px",
    border: "1px solid #E5E7EB",
  },

  /* ===============================
     Header Section
  ================================ */
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: {
      xs: "flex-start",
      sm: "center",
    },
    flexDirection: {
      xs: "column",
      sm: "row",
    },
    gap: 2,
    marginBottom: "24px",
  },

  /* ===============================
     Normal Field Wrapper
  ================================ */
  fieldWrapper: {
    marginBottom: "16px",
  },

  /* ===============================
     Row Wrapper (Min & Max)
  ================================ */
  rowWrapper: {
    display: "flex",
    gap: "16px",
    marginBottom: "16px",
    flexDirection: {
      xs: "column",
      sm: "row",
    },
  },

  /* ===============================
     Flex Field (50% width)
  ================================ */
  flexField: {
    flex: 1,
  },

  /* ===============================
     Status Field Wrapper
  ================================ */
  statusWrapper: {
    marginBottom: "24px",
  },

  /* ===============================
     Button Wrapper
  ================================ */
  buttonWrapper: {
    display: "flex",
    justifyContent: {
      xs: "stretch",
      sm: "flex-end",
    },

    "& button": {
      width: {
        xs: "100%",
        sm: "auto",
      },
    },
  },
};

export default createWithdrawalMethodStyles;
