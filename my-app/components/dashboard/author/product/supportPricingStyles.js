const styles = {
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    padding: {
      xs: "12px",
      sm: "16px",
    },
    mt: 3,
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

  uploadBox: {
    border: "2px dashed #d1d5db",
    borderRadius: "6px",
    padding: {
      xs: "16px",
      sm: "24px",
    },
    textAlign: "center",
    cursor: "pointer",
    mb: 3,
    transition: "all 0.2s ease",

    "&:hover": {
      borderColor: "#890eeeff",
      backgroundColor: "#faf5ff",
    },
  },

  uploadTitle: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#111827",
  },

  uploadSub: {
    fontSize: "12px",
    color: "#6b7280",
    mt: 0.5,
  },
};

export default styles;
