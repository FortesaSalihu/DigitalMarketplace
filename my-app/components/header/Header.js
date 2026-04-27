// components/Header/Header.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import CloseIcon from "@mui/icons-material/Close";
import headerStyles from "./headerStyles";
import WidgetsIcon from "@mui/icons-material/Widgets";
// import { useSession, signIn } from "next-auth/react";

import Avatar from "@mui/material/Avatar";
import LoginIcon from "@mui/icons-material/Login";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  // const { data: session } = useSession();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Contact", href: "/contact" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <>
      <AppBar position="sticky" sx={headerStyles.appBar}>
        <Toolbar sx={headerStyles.toolbar}>
          {/* LEFT: Logo */}
          <Box sx={headerStyles.left}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Box sx={headerStyles.logoBox} aria-label="DigiMart logo">
                {/* Replace with your real logo */}
                <svg
                  viewBox="0 0 140 32"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: 140, height: 32 }}
                >
                  {/* <rect rx="4" width="36" height="32" fill="#890eeeff" /> */}
                  <text
                    x="46"
                    y="21"
                    fontFamily="Inter, Arial, sans-serif"
                    fontWeight="800"
                    fontSize="14"
                    fill="#890eeeff"
                  >
                    Digital
                  </text>
                </svg>
              </Box>
            </Link>
          </Box>

          {/* CENTER: absolutely centered area */}
          <Box sx={headerStyles.centerArea} aria-hidden={false}>
            <Box sx={headerStyles.centerInteractive}>
              {/* Desktop nav links (md+) */}
              <Box
                component="nav"
                sx={headerStyles.navLinks}
                aria-label="Main navigation"
              >
                {mdUp &&
                  navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography component="span" sx={headerStyles.navLink}>
                        {item.label}
                      </Typography>
                    </Link>
                  ))}
              </Box>

              {/* Start Selling button: render ONLY on md+ */}
              {mdUp && (
                <Button
                  variant="contained"
                  href="/start-selling"
                  sx={headerStyles.startSellingBtn}
                  aria-label="Start Selling"
                >
                  Start Selling
                </Button>
              )}
            </Box>
          </Box>

          {/* RIGHT: icons + mobile menu */}
          <Box sx={headerStyles.rightControls}>
            <IconButton aria-label="Cart" sx={headerStyles.iconButton}>
              <ShoppingCartOutlinedIcon />
            </IconButton>
            <IconButton
              aria-label="Login"
              sx={headerStyles.iconButton}
              // onClick={() => signIn()}
            >
              <LoginIcon />
            </IconButton>
            {/* ACCOUNT / LOGIN */}
            {/* {!session ? (
              // 🔐 NOT LOGGED IN → LOGIN ICON
              
            ) : ( */}
            {/* // ✅ LOGGED IN → USER AVATAR */}
            <IconButton
              aria-label="Account"
              component={Link}
              href="/dashboard/user"
              sx={headerStyles.iconButton}
            >
              <Avatar
                src="/image/img4.jpg"
                alt="User"
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
            {/* )} */}
            {/* show hamburger on small screens */}
            <IconButton
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
              sx={headerStyles.mobileMenuButton}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Mobile stacked centered Start Selling: render ONLY on <md */}
        {!mdUp && (
          <Box sx={headerStyles.mobileCenterStack}>
            <Button
              variant="contained"
              href="/start-selling"
              sx={headerStyles.startSellingBtn}
              aria-label="Start Selling Mobile"
            >
              Start Selling
            </Button>
          </Box>
        )}
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <Typography variant="h6" noWrap>
              <WidgetsIcon
                sx={{
                  color: "#890eeeff",
                }}
              />
            </Typography>
            <IconButton
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
            >
              <CloseIcon
                sx={{
                  color: "red",
                }}
              />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/start-selling"
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary="Start Selling" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
