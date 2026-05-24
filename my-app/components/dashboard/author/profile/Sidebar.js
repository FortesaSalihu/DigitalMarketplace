"use client";

import React from "react";
import {
  Paper,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";

import PlaceIcon from "@mui/icons-material/Place";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import styles from "./profileStyles";

const Sidebar = ({ userData }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Paper sx={styles.sidebar} elevation={1}>
      <Box sx={styles.sidebarHeader}>
        <Avatar
          src={
            userData.profileImage
              ? userData.profileImage?.url
              : "/mnt/data/digital profile.png"
          }
          alt="profile"
          sx={styles.avatar}
        />

        <Box>
          <Typography variant="h6" sx={styles.nameText}>
            {userData.fullName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Exclusive Author
          </Typography>
        </Box>
      </Box>

      <List sx={{ mt: 2, p: 0 }}>
        <ListItem sx={styles.listItem} disableGutters>
          <AccountCircleIcon sx={styles.icon} />
          <ListItemText primary="Username" secondary={userData?.fullName} />
        </ListItem>

        <ListItem sx={styles.listItem} disableGutters>
          <EmailIcon sx={styles.icon} />
          <ListItemText primary="Email" secondary={userData.email} />
        </ListItem>

        <ListItem sx={styles.listItem} disableGutters>
          <PlaceIcon sx={styles.icon} />
          <ListItemText primary="Country" secondary={userData.country} />
        </ListItem>

        <Divider sx={{ my: 1 }} />

        <ListItem sx={styles.listItem} disableGutters>
          <MonetizationOnIcon sx={styles.icon} />
          <ListItemText primary="Balance" secondary="$0.00 USD" />
        </ListItem>

        <ListItem sx={styles.listItem} disableGutters>
          <CalendarTodayIcon sx={styles.icon} />
          <ListItemText
            primary="Member Since"
            secondary={formatDate(userData.createdAt)}
          />
        </ListItem>

        <ListItem sx={styles.listItem} disableGutters>
          <ShoppingBagIcon sx={styles.icon} />
          <ListItemText primary="Purchased" secondary="0 items" />
        </ListItem>
      </List>
    </Paper>
  );
};

export default Sidebar;
