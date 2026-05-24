"use client";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Box,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  AccountCircle as AccountCircleIcon,
  ShoppingCart as ShoppingCartIcon,
  ReceiptLong as ReceiptLongIcon,
  RateReview as RateReviewIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import dashboardStyles from "./dashboardStyles";
import PasswordIcon from "@mui/icons-material/Password";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import InventoryIcon from "@mui/icons-material/Inventory";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
const drawerWidth = 220;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, href: "/dashboard/author" },
  {
    text: "Profile",
    icon: <AccountCircleIcon />,
    href: "/dashboard/author/profile",
  },
  {
    text: "My Products",
    icon: <InventoryIcon />, // or <ShopIcon /> / <CategoryIcon />
    href: "/dashboard/author/products",
  },
  {
    text: "Sales",
    icon: <TrendingUpIcon />, // or <AttachMoneyIcon />
    href: "/dashboard/author/sales",
  },
  {
    text: "Withdrawals",
    icon: <AccountBalanceWalletIcon />, // or <PaymentsIcon />
    href: "/dashboard/author/withdrawals",
  },
  {
    text: "Purchases",
    icon: <ShoppingCartIcon />,
    href: "/dashboard/author/purchases",
  },
  {
    text: "Transactions",
    icon: <ReceiptLongIcon />,
    href: "/dashboard/author/transactions",
  },
  {
    text: "Payouts",
    icon: <CurrencyExchangeIcon />,
    href: "/dashboard/author/payouts",
  },
  {
    text: "Change Password",
    icon: <PasswordIcon />,
    href: "/dashboard/author/change-password",
  },
  {
    text: "Reviews",
    icon: <RateReviewIcon />,
    href: "/dashboard/author/reviews",
  },
  { text: "Logout", icon: <LogoutIcon />, href: "/dashboard/author/logout" },
];

export default function DashboardLayout({ children }) {
  const theme = useTheme();
  const pathname = usePathname();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen((s) => !s);

  const isActive = (href) => {
    if (!pathname) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const drawer = (
    <Box sx={{ ...dashboardStyles.sidebarRoot }}>
      <Box sx={dashboardStyles.logoWrap}>
        <Box sx={dashboardStyles.logoBox}>digital</Box>
      </Box>

      <List sx={{ width: "100%" }}>
        {menuItems.map((item) => {
          const active = isActive(item.href);
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component="a"
                href={item.href}
                sx={[
                  dashboardStyles.sidebarButton,
                  active && dashboardStyles.sidebarButtonActive,
                ]}
              >
                <ListItemIcon sx={{ color: active ? "#fff" : undefined }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={dashboardStyles.rootBox}>
      {/* AppBar */}
      <AppBar position="fixed" elevation={0} sx={dashboardStyles.appbar}>
        <Toolbar sx={dashboardStyles.toolbar}>
          {isSm && (
            <IconButton
              onClick={handleDrawerToggle}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={dashboardStyles.topWelcome}>
              Welcome back!
            </Typography>
            <Avatar sx={{ width: 36, height: 36 }}>JD</Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isSm ? "temporary" : "permanent"}
          open={isSm ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              background: "#ffffff",
              borderRight: "1px solid rgba(0,0,0,0.04)",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
          background: "#eef6fb",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ height: 72 }} /> {/* spacer for AppBar */}
        {children}
      </Box>
    </Box>
  );
}
