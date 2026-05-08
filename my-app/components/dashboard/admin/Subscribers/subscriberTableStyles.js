export const subscriberTableStyles = {
  wrapper: {
    width: "100%",
    p: { xs: 2, sm: 3 },
    bgcolor: "#F7FBFF",
    borderRadius: 2,
    mx: "auto",
    maxWidth: { lg: 1200, xl: 1400 },
    fontFamily: "Inter, Roboto, Arial, sans-serif",
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: { xs: "flex-start", sm: "center" },
    flexDirection: { xs: "column", sm: "row" },
    gap: 2,
    mb: 2,
  },

  headerTitle: {
    fontSize: { xs: "18px", sm: "20px" },
    fontWeight: 700,
    color: "#0b1826",
  },

  tablePaper: {
    width: "100%",
    overflowX: "auto",
    bgcolor: "transparent",
    boxShadow: "none",
  },

  table: {
    minWidth: 650,
    display: { xs: "none", md: "table" },
  },

  th: {
    fontSize: "13px",
    color: "#890eee",
    fontWeight: 700,
    px: 2,
    whiteSpace: "nowrap",
  },

  tr: {
    "&:last-child td": { borderBottom: 0 },
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      bgcolor: "#F9F5FF",
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(137, 14, 238, 0.1)",
      "& td": { color: "#890eee" },
    },
  },

  td: {
    fontSize: "14px",
    color: "#111827",
    px: 2,
    py: 1.4,
    whiteSpace: "nowrap",
  },

  tdRight: {
    textAlign: "right",
  },

  cardList: {
    display: { xs: "flex", md: "none" },
    flexDirection: "column",
    gap: 2,
  },

  card: {
    p: 2.5,
    borderRadius: 2,
    border: "1px solid #EFF2F7",
    bgcolor: "#FFFFFF",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(137, 14, 238, 0.15)",
      borderColor: "#890eee",
    },
  },

  mobileRow: {
    display: "flex",
    justifyContent: "space-between",
    mb: 1,
  },

  mobileLabel: {
    fontSize: "12px",
    color: "#6B7280",
  },

  mobileValue: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#111827",
  },

  mobileActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 1,
    pt: 2,
    mt: 2,
    borderTop: "1px solid #f0f0f0",
  },

  mobileActionBtn: {
    width: 40,
    height: 40,
    borderRadius: "10px",
    bgcolor: "#F9F5FF",
    color: "#890eee",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      bgcolor: "#EFE7FF",
      transform: "scale(1.08)",
    },
  },

  mobileDeleteBtn: {
    bgcolor: "#FFF1F2",
    color: "#B91C1C",
    "&:hover": {
      bgcolor: "#FFE4E6",
    },
  },
};
