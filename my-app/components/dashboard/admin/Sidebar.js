// File: components/Sidebar.jsx
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CloseIcon from "@mui/icons-material/Close";

// Import styles and data
import {
  sidebarStyles,
  getListItemButtonStyles,
  getListItemIconStyles,
  getChildListItemButtonStyles,
} from "./sidebarStyles";
import { menuItems } from "./menuItems";

const { SIDEBAR_WIDTH_OPEN, SIDEBAR_WIDTH_COLLAPSED } = sidebarStyles;

export default function Sidebar({
  mobileOpen = false,
  setMobileOpen = () => {},
}) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const [openCollapse, setOpenCollapse] = useState({
    home: false,
    categories: false,
    orders: false,
    reviews: false,
    kyc: false,
    withdrawals: false,
    "withdraw-methods": false,
    sections: false,
    "social-links": false,
    banner: false,
    pages: false,
    subscribers: false,
    access: false,
    payment: false,
    settings: false,
    "wipe-database": false,
    logout: false,
  });

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = (key) =>
    setOpenCollapse((s) => ({ ...s, [key]: !s[key] }));

  const handleNavigation = (path) => {
    router.push(path);
    if (isSmall) {
      setMobileOpen(false);
    }
  };

  const renderMenuItems = () => {
    return menuItems.map((item) => {
      const hasChildren = item.children && item.children.length > 0;

      if (hasChildren) {
        return (
          <ListItem key={item.id} disablePadding sx={sidebarStyles.listItem}>
            <ListItemButton
              onClick={() => toggleCollapse(item.id)}
              sx={getListItemButtonStyles(collapsed, item.dangerous)}
              aria-expanded={openCollapse[item.id]}
              aria-controls={`${item.id}-collapse`}
            >
              <ListItemIcon
                sx={getListItemIconStyles(collapsed, item.dangerous)}
              >
                {item.icon}
              </ListItemIcon>
              {!collapsed && (
                <>
                  {/* FIX 1: primaryTypographyProps replaced with slotProps */}
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        fontSize: sidebarStyles.listItemText.fontSize,
                        color: item.dangerous
                          ? sidebarStyles.listItemTextDangerous.color
                          : "inherit",
                      },
                    }}
                  />
                  {openCollapse[item.id] ? <ExpandLess /> : <ExpandMore />}
                </>
              )}
            </ListItemButton>

            <Collapse
              in={openCollapse[item.id] && !collapsed}
              timeout="auto"
              unmountOnExit
              id={`${item.id}-collapse`}
            >
              <List component="div" disablePadding sx={{ pl: 0 }}>
                {item.children.map((child) => (
                  <ListItemButton
                    key={child.path}
                    component="div"
                    onClick={() => handleNavigation(child.path)}
                    sx={getChildListItemButtonStyles(collapsed)}
                  >
                    {/* FIX 2: primaryTypographyProps replaced with slotProps */}
                    <ListItemText
                      primary={child.label}
                      slotProps={{ primary: sidebarStyles.childListItemText }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </ListItem>
        );
      }

      return (
        <ListItem key={item.id} disablePadding sx={sidebarStyles.listItem}>
          <ListItemButton
            onClick={() => handleNavigation(item.path)}
            sx={getListItemButtonStyles(collapsed, item.dangerous)}
          >
            <ListItemIcon sx={getListItemIconStyles(collapsed, item.dangerous)}>
              {item.icon}
            </ListItemIcon>
            {/* FIX 3: primaryTypographyProps replaced with slotProps */}
            {!collapsed && (
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    fontSize: sidebarStyles.listItemText.fontSize,
                    color: item.dangerous
                      ? sidebarStyles.listItemTextDangerous.color
                      : "inherit",
                  },
                }}
              />
            )}
          </ListItemButton>
        </ListItem>
      );
    });
  };

  const SidebarContent = (
    <Box
      sx={{
        ...sidebarStyles.sidebar,
        width: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_OPEN,
      }}
      role="presentation"
    >
      {!isSmall && (
        <Box
          sx={{
            ...sidebarStyles.brandHeader,
            justifyContent: collapsed
              ? sidebarStyles.brandHeaderCollapsed.justifyContent
              : "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {!collapsed && (
              <Typography sx={sidebarStyles.brandText} variant="h6">
                Digital
              </Typography>
            )}
          </Box>

          <IconButton
            size="small"
            onClick={() => setCollapsed((c) => !c)}
            sx={{ color: "#f1f1f1ff", mr: 2 }}
            aria-label="toggle sidebar"
          >
            <MenuOpenIcon />
          </IconButton>
        </Box>
      )}

      <Box sx={sidebarStyles.scrollableArea}>
        <List
          sx={sidebarStyles.list}
          component="nav"
          aria-label="main navigation"
        >
          {renderMenuItems()}
        </List>

        <Box sx={sidebarStyles.spacer} />
      </Box>

      <Divider sx={sidebarStyles.divider} />

      <Box sx={sidebarStyles.profileSection}>
        <List sx={{ mt: 0, color: "#fff" }} component="div">
          <ListItem disablePadding sx={sidebarStyles.listItem}>
            <ListItemButton
              component="div"
              sx={getListItemButtonStyles(collapsed)}
              onClick={() => handleNavigation("/profile")}
            >
              {!collapsed ? (
                // FIX 4: primaryTypographyProps + secondaryTypographyProps replaced with slotProps
                <ListItemText
                  primary="Super Admin"
                  secondary="admin@digital.com"
                  slotProps={{
                    primary: { fontSize: "0.85rem" },
                    secondary: { fontSize: "0.72rem", color: "#9fbbe6" },
                  }}
                />
              ) : (
                <Avatar sx={sidebarStyles.profileAvatar}>SA</Avatar>
              )}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Box
        component="nav"
        sx={{
          width: {
            sm: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_OPEN,
          },
          flexShrink: 0,
        }}
      >
        <Drawer
          variant="temporary"
          open={!!mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={sidebarStyles.drawerTemporary}
        >
          <Box sx={sidebarStyles.mobileHeader}>
            <Typography sx={sidebarStyles.mobileHeaderText}>Digital</Typography>
            <IconButton
              onClick={() => setMobileOpen(false)}
              size="small"
              sx={sidebarStyles.closeButton}
              aria-label="close drawer"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {SidebarContent}
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            ...sidebarStyles.drawerPermanent,
            "& .MuiDrawer-paper": {
              ...sidebarStyles.drawerPermanent["& .MuiDrawer-paper"],
              width: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_OPEN,
            },
          }}
        >
          {SidebarContent}
        </Drawer>
      </Box>
    </>
  );
}
