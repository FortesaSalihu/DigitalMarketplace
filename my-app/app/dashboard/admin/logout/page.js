"use client";

import LogOut from "@/components/dashboard/user/LogOut/LogOut";
import { useState } from "react";
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";
import Sidebar from "@/components/dashboard/admin/Sidebar";
import Topbar from "@/components/dashboard/admin/Topbar";

export default function KycUpdatePage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          bgcolor: "#eef6fb",
        }}
      >
        <CssBaseline />

        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        <Box
          component="main"
          sx={{
            flex: 1,
          }}
        >
          <Topbar onMenuClick={() => setMobileOpen(true)} />
          <LogOut />
        </Box>
      </Box>
    </>
  );
}
