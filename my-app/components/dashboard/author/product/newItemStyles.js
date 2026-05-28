const styles = {
  page: {
    backgroundColor: "#ffffff",
    padding: {
      xs: "16px",
      sm: "24px",
      md: "56px",
    },
    margin: {
      xs: "0px",
      sm: "16px",
      md: "40px",
    },
  },

  header: {
    display: "flex",
    flexDirection: {
      xs: "column",
      sm: "row",
    },
    alignItems: {
      xs: "flex-start",
      sm: "center",
    },
    justifyContent: "space-between",
    gap: {
      xs: "12px",
      sm: "0px",
    },
    marginBottom: "16px",
  },

  title: {
    fontSize: {
      xs: "16px",
      sm: "18px",
    },
    fontWeight: 600,
    color: "#111827",
  },

  subtitle: {
    fontSize: "13px",
    color: "#6b7280",
  },

  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    padding: {
      xs: "12px",
      sm: "16px",
    },
  },

  sectionTitle: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#111827",
  },

  divider: {
    my: {
      xs: 1.5,
      sm: 2,
    },
  },

  field: {
    mb: 2,
  },

  label: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#111827",
    mb: "6px",
    display: "block",
  },

  // editorWrapper: {
  //   border: "1px solid #e5e7eb",
  //   borderRadius: "4px",
  //   overflow: "hidden",

  //   "& .ql-toolbar": {
  //     borderBottom: "1px solid #e5e7eb",
  //   },

  //   "& .ql-container": {
  //     minHeight: "180px",
  //     fontSize: "14px",
  //   },
  // },

  editorWrapper: {
    border: "1px solid #e5e7eb",
    borderRadius: "4px",
    overflow: "hidden",

    "& .ql-toolbar": {
      borderBottom: "1px solid #e5e7eb",
    },

    "& .ql-container": {
      minHeight: "180px",
      fontSize: "14px",
    },

    /* ===== AI GENERATED CONTENT FIX ===== */
    "& .ql-editor": {
      lineHeight: 1.7,
    },

    "& .ql-editor p": {
      marginBottom: "10px",
    },

    "& .ql-editor h1": {
      fontSize: "1.8rem",
      fontWeight: 700,
      marginTop: "18px",
      marginBottom: "12px",
    },

    "& .ql-editor h2": {
      fontSize: "1.5rem",
      fontWeight: 600,
      marginTop: "16px",
      marginBottom: "10px",
    },

    "& .ql-editor h3": {
      fontSize: "1.25rem",
      fontWeight: 600,
      marginTop: "14px",
      marginBottom: "8px",
    },

    "& .ql-editor ul": {
      paddingLeft: "22px",
      marginBottom: "10px",
    },

    "& .ql-editor li": {
      marginBottom: "6px",
    },
  },

  actions: {
    display: "flex",
    justifyContent: {
      xs: "stretch",
      sm: "flex-end",
    },
    mt: 3,

    "& button": {
      width: {
        xs: "100%",
        sm: "auto",
      },
    },
  },
};

export default styles;
