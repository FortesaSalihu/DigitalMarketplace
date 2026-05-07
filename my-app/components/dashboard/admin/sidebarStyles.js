// styles/sidebarStyles.js
export const sidebarStyles = {
  // Layout constants
  SIDEBAR_WIDTH_OPEN: 250,
  SIDEBAR_WIDTH_COLLAPSED: 84,

  // Main sidebar container
  sidebar: {
    bgcolor: "#050308ff",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  // Brand header styles
  brandHeader: {
    position: "sticky",
    top: 0,
    zIndex: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 1,
    mb: 1,
    py: 1,
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    background: "#050308ff",
  },

  brandHeaderCollapsed: {
    justifyContent: "center",
  },

  brandText: {
    ml: 3,
    fontWeight: 900,
    color: "#ffffff",
    fontSize: "1rem",
  },

  // Scrollable area
  scrollableArea: {
    flex: 1,
    overflowY: "auto",
    pr: 1.5,
    // WebKit scrollbar
    "&::-webkit-scrollbar": {
      width: 8,
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(255,255,255,0.08)",
      borderRadius: 8,
      border: "2px solid transparent",
      backgroundClip: "padding-box",
    },
    "&:hover::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(255,255,255,0.12)",
    },
    // Firefox scrollbar
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(255,255,255,0.08) transparent",
  },

  // List styles
  list: {
    color: "#fff",
    mt: 1,
  },

  // List item styles
  listItem: {
    display: "block",
  },

  // List item button styles
  listItemButton: {
    justifyContent: "flex-start",
    px: 2,
  },

  listItemButtonCollapsed: {
    justifyContent: "center",
  },

  listItemButtonDangerous: {
    "&:hover": {
      backgroundColor: "rgba(255, 123, 123, 0.1)",
    },
  },

  // List item icon styles
  listItemIcon: {
    color: "#ffffff",
    minWidth: 0,
    mr: 1,
  },

  listItemIconCollapsed: {
    mr: 0,
  },

  listItemIconDangerous: {
    color: "#ff7b7b",
  },

  // List item text styles
  listItemText: {
    fontSize: "0.95rem",
  },

  listItemTextDangerous: {
    color: "#ffb4b4",
  },

  // Child item styles
  childListItemButton: {
    py: 0.7,
    pl: 4,
  },

  childListItemButtonCollapsed: {
    pl: 2,
  },

  childListItemText: {
    fontSize: "0.85rem",
    color: "#e9f2ff",
  },

  // Profile section
  profileSection: {
    position: "sticky",
    bottom: 0,
    zIndex: 3,
    background: "#050308ff",
    py: 1,
  },

  profileAvatar: {
    bgcolor: "#1e3a5c",
    width: 32,
    height: 32,
  },

  // Drawer styles
  drawerTemporary: {
    display: { xs: "block", sm: "none" },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: 280,
      bgcolor: "black",
    },
  },

  drawerPermanent: {
    display: { xs: "none", sm: "block" },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: "auto", // Will be set dynamically
      bgcolor: "#000000",
    },
  },

  // Mobile header
  mobileHeader: {
    bgcolor: "#000000",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    px: 2,
    py: 1,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },

  mobileHeaderText: {
    fontWeight: 700,
    color: "#fff",
    fontSize: "1rem",
  },

  closeButton: {
    color: "#fff",
    "&:hover": {
      bgcolor: "rgba(255,255,255,0.06)",
    },
  },

  // Spacer
  spacer: {
    height: 12,
  },

  // Divider
  divider: {
    bgcolor: "rgba(255,255,255,0.08)",
    my: 1,
  },
};

// Helper functions for dynamic styles
export const getListItemButtonStyles = (collapsed, dangerous = false) => {
  return {
    ...sidebarStyles.listItemButton,
    ...(collapsed && sidebarStyles.listItemButtonCollapsed),
    ...(dangerous && sidebarStyles.listItemButtonDangerous),
  };
};

export const getListItemIconStyles = (collapsed, dangerous = false) => {
  return {
    ...sidebarStyles.listItemIcon,
    ...(collapsed && sidebarStyles.listItemIconCollapsed),
    ...(dangerous && sidebarStyles.listItemIconDangerous),
  };
};

export const getChildListItemButtonStyles = (collapsed) => {
  return {
    ...sidebarStyles.childListItemButton,
    ...(collapsed && sidebarStyles.childListItemButtonCollapsed),
  };
};
