// File: components/Topbar.jsx
import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import styles from "./dashboardStyles";

export default function Topbar({
  onMenuClick = () => {},
  user = { name: "Super Admin", email: "admin@gmail.com", avatarText: "SA" },
}) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="header"
      sx={{
        ...styles.topbar,
        alignItems: "center",
        height: { xs: 56, sm: 72 },
        px: { xs: 1, sm: 2.5 },
        py: 0.5,
        bgcolor: "#fff",
        borderBottom: "1px solid rgba(104, 6, 216, 0.04)",
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      {/* Left: only mobile menu icon (no title text) */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {isSmall && (
          <IconButton
            onClick={onMenuClick}
            size="small"
            aria-label="open menu"
            sx={{
              color: styles.palette.navy,
              bgcolor: "transparent",
              "&:hover": { bgcolor: "transparent" },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      {/* Right: profile (name + email) and icon */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ textAlign: "right", mr: 0 }}>
          <Box
            component="div"
            sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#0b2340" }}
          >
            {user.name}
          </Box>
          <Box component="div" sx={{ fontSize: "0.72rem", color: "#6b7d91" }}>
            {user.email}
          </Box>
        </Box>

        <Avatar
          sx={{
            bgcolor: styles.palette.navy,
            width: 36,
            height: 36,
            fontSize: "0.85rem",
            boxShadow: "0 1px 2px rgba(11,35,64,0.06)",
          }}
        >
          {user.avatarText}
        </Avatar>

        <Tooltip title="Toggle theme">
          <IconButton
            size="small"
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              bgcolor: "#f2f6fb",
              border: "1px solid rgba(11,35,64,0.04)",
              "&:hover": { bgcolor: "#eef4fb" },
            }}
            aria-label="toggle theme"
          >
            <DarkModeOutlinedIcon
              sx={{ fontSize: 18, color: styles.palette.navy }}
            />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
