// components/Categories/CategoriesBar.jsx
"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CategoryIcon from "@mui/icons-material/Category";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import CloseIcon from "@mui/icons-material/Close";

const categoriesData = [
  {
    id: "code-scripts",
    title: "Code & Scripts",
    subs: ["JavaScript", "Python", "Node.js", "Automation"],
  },
  {
    id: "website-themes",
    title: "Website Themes & Templates",
    subs: ["Next.js Templates", "React Themes", "Shopify Themes", "WordPress"],
  },
  {
    id: "graphics",
    title: "Graphics & Design",
    subs: ["Logos", "UI Kits", "Icons", "Illustrations"],
  },
  {
    id: "video-motion",
    title: "Video & Motion Graphics",
    subs: ["Intro Templates", "Transitions", "Slides", "Overlays"],
  },
  {
    id: "audio",
    title: "Audio & Music",
    subs: ["Stock Music", "SFX", "Loops", "Voice Over"],
  },
  {
    id: "ebooks",
    title: "eBooks & Learning Materials",
    subs: ["Programming", "Data Science", "Design", "Marketing"],
  },
];

export default function CategoriesBar() {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleMouseEnter = (categoryId) => () => {
    setActiveCategory(categoryId);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  const handleArrowClick = (categoryId) => (event) => {
    event.stopPropagation();
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  const handleSubcategoryClick = () => {
    setActiveCategory(null);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setActiveCategory(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {/* Show horizontal categories only on tablet and desktop */}
      {isTablet && (
        <Box
          sx={{
            borderBottom: "1px solid #e2e8f0",
            backgroundColor: "white",
            position: "relative",
            display: { xs: "none", sm: "block" },
            minHeight: "80px", // Ensure space for subcategories
          }}
        >
          <Box
            sx={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "16px",
            }}
          >
            {/* Categories Row */}
            <Box
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "flex-start",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {categoriesData.map((category) => (
                <Box
                  key={category.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  {/* Category Button and Arrow */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      position: "relative",
                      zIndex: 10,
                    }}
                    onMouseEnter={handleMouseEnter(category.id)}
                  >
                    <Button
                      component={Link}
                      href={`/category/${category.id}`}
                      sx={{
                        textTransform: "none",
                        color: "#0f172a",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        minWidth: "auto",
                        px: 2,

                        whiteSpace: "nowrap",
                        border: "1px solid transparent",
                        borderRadius: "20px",
                        "&:hover": {
                          backgroundColor: "#890eeeff",
                          borderColor: "#e2e8f0",
                          color: "#fff",
                        },
                      }}
                    >
                      {category.title}
                    </Button>

                    {category.subs && (
                      <IconButton
                        size="small"
                        onClick={handleArrowClick(category.id)}
                        sx={{
                          color: "#64748b",
                          padding: "2px",
                          "&:hover": {
                            backgroundColor: "transparent",
                            color: "#0b63ff",
                          },
                        }}
                      >
                        <KeyboardArrowDownIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>

                  {/* SUB CATEGORIES - FIXED POSITIONING */}
                  {category.subs && activeCategory === category.id && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "45px", // Position below the category button
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow:
                          "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
                        padding: "12px 0",
                        minWidth: "200px",
                        zIndex: 9999,
                        display: "flex",
                        flexDirection: "column",
                      }}
                      onMouseEnter={handleMouseEnter(category.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {category.subs.map((sub) => (
                        <Button
                          key={sub}
                          component={Link}
                          href={`/category/${category.id}/${sub
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          sx={{
                            textTransform: "none",
                            justifyContent: "flex-start",
                            padding: "8px 16px",
                            color: "#0f172a",
                            fontSize: "0.875rem",
                            width: "100%",
                            minHeight: "auto",

                            borderRadius: 20,
                            "&:hover": {
                              fontWeight: 200,
                              backgroundColor: "#890eeeff",
                              borderColor: "#e2e8f0",
                              color: "#fff",
                            },
                          }}
                          onClick={handleSubcategoryClick}
                        >
                          {sub}
                        </Button>
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}

      {/* Mobile: Show only menu icon */}
      {!isTablet && (
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{
              color: "#890eeeff",
              flexDirection: "column",
            }}
          >
            <CategoryIcon />
          </IconButton>
        </Box>
      )}

      {/* Mobile Drawer */}
      {/* <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 220 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <Typography variant="h6">Categories</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {categoriesData.map((category) => (
              <Box key={category.id}>
                {category.subs && category.subs.length > 0 ? (
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: 700 }}>
                        {category.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {category.subs.map((sub) => (
                        <ListItem key={sub} disablePadding>
                          <Button
                            component={Link}
                            href={`/category/${category.id}/${sub
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            sx={{
                              textTransform: "none",
                              justifyContent: "flex-start",
                              width: "100%",
                              py: 0.8,
                              color: "#0f172a",
                            }}
                            onClick={() => setDrawerOpen(false)}
                          >
                            {sub}
                          </Button>
                        </ListItem>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  <ListItem disablePadding>
                    <Button
                      component={Link}
                      href={`/category/${category.id}`}
                      sx={{
                        textTransform: "none",
                        justifyContent: "flex-start",
                        width: "100%",
                        py: 0.8,
                        color: "#0f172a",
                      }}
                      onClick={() => setDrawerOpen(false)}
                    >
                      <Typography sx={{ fontWeight: 700 }}>
                        {category.title}
                      </Typography>
                    </Button>
                  </ListItem>
                )}
                <Divider />
              </Box>
            ))}
          </List>
        </Box>
      </Drawer> */}

      {!isTablet && (
        <Box sx={styles.mobileWrapper}>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={styles.mobileIcon}
          >
            <CategoryIcon />
          </IconButton>
        </Box>
      )}

      {/* ================= DRAWER ================= */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={styles.drawerContainer}>
          <Box sx={styles.drawerHeader}>
            <Typography variant="h6">Categories</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {categoriesData.map((category) => (
              <Box key={category.slug}>
                {category.subs?.length > 0 ? (
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={styles.mobileTitle}>
                        {category.title}
                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                      {category.subs.map((sub) => (
                        <ListItem key={sub.slug} disablePadding>
                          <Button
                            component={Link}
                            href={`/products?category=${category.slug}&subcategory=${sub.slug}`}
                            sx={styles.mobileButton}
                            onClick={() => setDrawerOpen(false)}
                          >
                            {sub.name}
                          </Button>
                        </ListItem>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  <ListItem disablePadding>
                    <Button
                      component={Link}
                      href={`/products?category=${category.slug}`}
                      sx={styles.mobileButton}
                      onClick={() => setDrawerOpen(false)}
                    >
                      <Typography sx={styles.mobileTitle}>
                        {category.title}
                      </Typography>
                    </Button>
                  </ListItem>
                )}
                <Divider />
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
