const createWithdrawalMethodStyles = {
  pageWrapper: {
    backgroundColor: "#f5f7fb",
    minHeight: "100vh",
    p: { xs: 2, sm: 3 },
  },

  paper: {
    maxWidth: 1200,
    mx: "auto",
    p: { xs: 2, sm: 3 },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
    flexDirection: { xs: "column", sm: "row" },
    gap: 2,
  },

  fieldWrapper: {
    mb: 2,
  },

  rowWrapper: {
    display: "flex",
    gap: 2,
    mb: 2,
    flexDirection: { xs: "column", sm: "row" },
  },

  flexField: {
    flex: 1,
  },

  statusWrapper: {
    mb: 3,
  },

  buttonWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
};

export default createWithdrawalMethodStyles;
