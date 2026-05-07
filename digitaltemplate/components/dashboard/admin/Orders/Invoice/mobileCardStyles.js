export const mobileCardStyles = {
  card: {
    bgcolor: "rgba(137, 14, 238, 0.02)",
    borderRadius: 2,
    p: 2,
    border: "1px solid rgba(137, 14, 238, 0.1)",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      borderColor: "#890eee",
      boxShadow: "0 4px 12px rgba(137, 14, 238, 0.1)",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    mb: 1,
  },

  productName: {
    fontWeight: 700,
    fontSize: 15,
    color: "#1F2937",
    flex: 1,
    pr: 1,
    lineHeight: 1.4,
  },

  amount: {
    fontWeight: 700,
    fontSize: 16,
    color: "#890eee",
    whiteSpace: "nowrap",
  },

  description: {
    fontSize: 13,
    color: "#6B7280",
    mb: 1.5,
    pb: 1.5,
    borderBottom: "1px dashed rgba(137, 14, 238, 0.2)",
    lineHeight: 1.5,
  },

  details: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 1,
  },

  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
  },

  detailLabel: {
    fontSize: 12,
    color: "#6B7280",
  },

  detailValue: {
    fontSize: 13,
    fontWeight: 600,
    color: "#1F2937",
  },
};
