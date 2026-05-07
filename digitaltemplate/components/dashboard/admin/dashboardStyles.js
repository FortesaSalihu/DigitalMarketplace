// 🎨 Modern color palette with depth and contrast
const palette = {
  blue: "#890eee", // bright accent blue
  navy: "#890eee", // deep modern dark navy
  muted: "#890eee", // subtle muted gray-blue
  green: "#890eee", // modern success green
  background: "#f9fafb", // soft neutral background
  gradientBlue: "linear-gradient(135deg, #0071ff 0%, #00b2ff 100%)",
  gradientGreen: "linear-gradient(135deg, #22c55e 0%, #5eead4 100%)",
  gradientGray: "linear-gradient(135deg, #e2e8f0 0%, #f8fafc 100%)",
};

// 🧭 Sidebar: flat but slightly glossy with depth
const sidebar = {
  bgcolor: palette.navy,
  color: "#fff",
  height: "100%",
  p: 2,
  boxSizing: "border-box",
  boxShadow: "4px 0 20px rgba(0,0,0,0.15)",
};

// 🔝 Topbar: sleek and minimal
const topbar = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  mb: 2,
  backdropFilter: "blur(12px)",
  background: "rgba(255,255,255,0.85)",
  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
};

// 📦 Layout container
const container = {
  width: "100%",
  pb: 4,
  // backgroundColor: palette.background,
  minHeight: "auto",
  borderRadius: "12px",
  px: { xs: 1, sm: 2 },
};

// 🧊 Card: modern gradient + subtle glass effect
const card = {
  position: "relative",
  background: "#ffffff",
  borderRadius: 16,
  backdropFilter: "blur(8px)",
  boxShadow: "0 6px 20px #890eee",
  transition: "all 250ms ease",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.05))",
    zIndex: 0,
  },
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 16px 30px #890eee",
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  p: 2,
  zIndex: 1,
};

// 🟦 Icon container with glowing edge
const iconBox = {
  width: 52,
  height: 52,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#890eee",
  boxShadow: "0 6px 16px #890eee",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 8px 20px #890eee",
  },
};

// 💵 Large metric value
const value = {
  fontSize: { xs: "1.1rem", sm: "1.25rem" },
  fontWeight: 700,
  color: palette.navy,
  letterSpacing: "-0.4px",
};

// 🏷️ Metric title
const title = {
  fontSize: { xs: "0.8rem", sm: "0.85rem" },
  color: palette.muted,
  fontWeight: 500,
  mt: 0.5,
  textTransform: "capitalize",
};

// 🔹 Meta row styling
const metaRow = {
  mt: 1.25,
  display: "flex",
  alignItems: "center",
  gap: 1,
};

const metaDot = (color) => ({
  height: 7,
  width: 7,
  borderRadius: "50%",
  bgcolor: color,
  boxShadow: "0 1px 4px rgba(11,35,64,0.06)",
});

const metaLabel = {
  px: 1,
  py: 0.4,
  borderRadius: 6,
  background: "rgba(0,113,255,0.06)",
  fontSize: "0.72rem",
  color: palette.navy,
  fontWeight: 600,
};

export default {
  palette,
  sidebar,
  topbar,
  container,
  card,
  iconBox,
  value,
  title,
  metaRow,
  metaDot,
  metaLabel,
};
