export const invoiceStyles = {
  wrapper: {
    width: "100%",
    maxWidth: 900,
    mx: "auto",
    p: { xs: 1.5, sm: 2, md: 3 },
    bgcolor: "#FFFFFF",
    borderRadius: { xs: 2, sm: 3 },
    fontFamily: "Inter, Roboto, Arial, sans-serif",
    boxShadow: "0 4px 20px rgba(137, 14, 238, 0.08)",
    border: "1px solid rgba(137, 14, 238, 0.15)",
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: { xs: "column", sm: "row" },
    gap: { xs: 2.5, sm: 3 },
    mb: { xs: 2.5, sm: 4 },
  },

  companyBox: {
    width: { xs: "100%", sm: "auto" },
  },

  companyTitle: {
    fontSize: { xs: 15, sm: 16 },
    fontWeight: 700,
    mb: 1,
    color: "#890eee",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    borderBottom: { xs: "2px solid rgba(137, 14, 238, 0.2)", sm: "none" },
    pb: { xs: 0.5, sm: 0 },
    display: "inline-block",
  },

  companyText: {
    fontSize: { xs: 13, sm: 14 },
    color: "#4B5563",
    lineHeight: 1.6,
    whiteSpace: "pre-line",
    wordBreak: "break-word",
  },

  clientBox: {
    textAlign: { xs: "left", sm: "right" },
    width: { xs: "100%", sm: "auto" },
  },

  invoiceTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    mb: { xs: 2, sm: 3 },
    pb: { xs: 1.5, sm: 2 },
    borderBottom: "2px solid rgba(137, 14, 238, 0.2)",
    flexWrap: "wrap",
  },

  invoiceIcon: {
    color: "#890eee",
    fontSize: { xs: 24, sm: 28 },
  },

  invoiceTitle: {
    fontSize: { xs: 18, sm: 20, md: 22 },
    fontWeight: 700,
    color: "#890eee",
    letterSpacing: "0.5px",
  },

  desktopTable: {
    display: { xs: "none", sm: "block" },
    overflowX: "auto",
    "& .MuiTable-root": {
      minWidth: 650,
    },
    "&::-webkit-scrollbar": {
      height: 8,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#890eee",
      borderRadius: 4,
    },
  },

  mobileCards: {
    display: { xs: "flex", sm: "none" },
    flexDirection: "column",
    gap: 1.5,
    mb: 2,
  },

  th: {
    fontWeight: 700,
    fontSize: { sm: 12, md: 13 },
    color: "#890eee",
    borderBottom: "2px solid rgba(137, 14, 238, 0.3)",
    py: 1.5,
    bgcolor: "rgba(137, 14, 238, 0.02)",
  },

  td: {
    fontSize: { sm: 13, md: 14 },
    borderBottom: "1px solid rgba(137, 14, 238, 0.1)",
    py: 1.5,
  },

  productName: {
    fontWeight: 600,
    fontSize: { sm: 13, md: 14 },
    color: "#1F2937",
  },

  productDesc: {
    fontSize: { sm: 11, md: 12 },
    color: "#6B7280",
    mt: 0.5,
  },

  divider: {
    my: { xs: 2, sm: 3 },
    borderColor: "rgba(137, 14, 238, 0.2)",
    borderWidth: { xs: 1, sm: 1.5 },
  },

  summarySection: {
    display: "flex",
    justifyContent: { xs: "stretch", sm: "flex-end" },
    mt: { xs: 1, sm: 2 },
  },

  summaryBox: {
    width: { xs: "100%", sm: 320 },
    bgcolor: { xs: "rgba(137, 14, 238, 0.02)", sm: "transparent" },
    borderRadius: { xs: 2.5, sm: 0 },
    p: { xs: 2.5, sm: 0 },
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 1.5,
  },

  summaryLabel: {
    fontSize: { xs: 14, sm: 15 },
    color: "#4B5563",
  },

  summaryValue: {
    fontSize: { xs: 14, sm: 15 },
    fontWeight: 500,
    color: "#1F2937",
  },

  summaryDivider: {
    my: 1.5,
    borderColor: "rgba(137, 14, 238, 0.2)",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mt: 1,
    pt: 1,
  },

  totalLabel: {
    color: "#890eee",
    fontWeight: 700,
    fontSize: { xs: 16, sm: 18 },
    letterSpacing: "0.5px",
  },

  totalValue: {
    color: "#890eee",
    fontWeight: 800,
    fontSize: { xs: 20, sm: 22 },
  },

  paymentNote: {
    mt: 2,
    pt: 1.5,
    textAlign: "center",
    borderTop: "1px dashed rgba(137, 14, 238, 0.3)",
  },

  paymentText: {
    fontSize: { xs: 12, sm: 13 },
    color: "#890eee",
    fontWeight: 500,
  },
};
