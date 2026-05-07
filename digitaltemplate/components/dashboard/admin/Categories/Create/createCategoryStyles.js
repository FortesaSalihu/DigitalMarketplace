const styles = {
  page: {
    backgroundColor: "#ffffff",
    padding: {
      xs: "16px", // 📱 mobile
      sm: "24px",
      md: "56px", // 💻 desktop
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
      xs: "column", // 📱 stack title & button
      sm: "row",
    },
    alignItems: {
      xs: "flex-start",
      sm: "center",
    },
    justifyContent: "space-between",
    gap: {
      xs: "8px",
      sm: "0px",
    },
    marginBottom: "12px",
  },

  title: {
    fontSize: {
      xs: "14px",
      sm: "16px",
    },
    fontWeight: 600,
    color: "#111827",
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

  divider: {
    my: {
      xs: 1.5,
      sm: 2,
    },
  },

  actions: {
    display: "flex",
    justifyContent: {
      xs: "stretch", // 📱 full-width button
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
