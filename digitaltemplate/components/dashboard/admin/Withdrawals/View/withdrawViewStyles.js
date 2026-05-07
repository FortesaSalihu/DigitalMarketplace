const withdrawViewStyles = {
  wrapper: {
    p: { xs: 2, md: 4 },
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  },

  title: {
    fontSize: { xs: "18px", md: "22px" },
    fontWeight: 600,
  },

  card: {
    p: { xs: 2, md: 3 },
    borderRadius: "8px",
  },

  row: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    py: 1.5,
    borderBottom: "1px solid #eee",
  },

  label: {
    width: { xs: "100%", sm: "220px" },
    fontWeight: 500,
    color: "#555",
    mb: { xs: 0.5, sm: 0 },
  },

  value: {
    flex: 1,
  },

  actionRow: {
    mt: 3,
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    gap: 2,
    alignItems: { sm: "center" },
  },
};

export default withdrawViewStyles;
