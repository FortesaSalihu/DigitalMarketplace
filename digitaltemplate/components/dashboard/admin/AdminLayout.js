"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import DashboardGrid from "./DashboardGrid";

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#eef6fb" }}>
        <CssBaseline />
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <Box
          component="main"
          sx={{
            flex: 1,
          }}
        >
          <Topbar onMenuClick={() => setMobileOpen(true)} />
          <DashboardGrid />
        </Box>
      </Box>
    </>
  );
}
