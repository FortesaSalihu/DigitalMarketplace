"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Sidebar from "@/components/dashboard/admin/Sidebar";
import Topbar from "@/components/dashboard/admin/Topbar";

// ✅ IMPORT SUBCATEGORY FORM
import SubcategoryCreateForm from "@/components/dashboard/admin/Subcategories/Create/SubcategoryCreateForm";

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#eef6fb" }}>
      <CssBaseline />

      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <Box component="main" sx={{ flex: 1 }}>
        <Topbar onMenuClick={() => setMobileOpen(true)} />

        {/* ✅ SUBCATEGORY CREATE FORM */}
        <SubcategoryCreateForm />
      </Box>
    </Box>
  );
}
