"use client";

import React, { useEffect, useState } from "react";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

import { useTheme } from "@mui/material/styles";

import { styles, responsiveStyles } from "./myItemsStyles";
import MyItemsMobileCards from "./MyItemsMobileCards";

import { useRouter } from "next/navigation";

export default function MyItemsTable() {
  const theme = useTheme();

  const [items, setItems] = useState([]);
  const router = useRouter();

  // breakpoints
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isExtraSmall = useMediaQuery(theme.breakpoints.down(400));

  const responsive = responsiveStyles(isSmallScreen, isExtraSmall);

  /* ======================================
     FETCH DATA FROM DATABASE
  ====================================== */

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(
          `${process.env.API}/admin/item-review/approved`
        );
        const json = await res.json();

        // ✅ Ensure items is always an array
        const list = Array.isArray(json.items) ? json.items : [];

        const formatted = list.map((item) => ({
          id: item._id,
          title: item.name,
          category:
            `${item.category_id.name} /  ${item.sub_category_id.name} ` || "—",
          price: `$${item.price}`,
          publishDate: new Date(item.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          status: item.status,
          thumbnail: item.preview_image,
        }));

        setItems(formatted);
      } catch (error) {
        console.error("Failed to fetch items:", error);
        setItems([]); // ✅ prevent crash
      }
    };

    fetchItems();
  }, []);

  return (
    <Box sx={styles.container}>
      {/* Header */}
      <Box sx={styles.headerRow}>
        <Box sx={responsive.headerTitleBox}>
          <Typography variant="h6" sx={responsive.headerTitle}>
            Approved Items
          </Typography>
          <Typography variant="body2" sx={responsive.headerSubtitle}>
            Manage your items and products
          </Typography>
        </Box>
      </Box>
      {/* ================= EMPTY STATE ================= */}
      {items.length === 0 && (
        <Box
          sx={{
            mt: 6,
            minHeight: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No product found
          </Typography>
        </Box>
      )}

      {/* ================= DESKTOP TABLE ================= */}
      {isLargeScreen && items.length > 0 && (
        <TableContainer component={Paper} sx={styles.tableContainer}>
          <Box sx={styles.tableWrapper}>
            <Table sx={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell sx={styles.colTitle}>Item Details</TableCell>
                  <TableCell sx={styles.colCenter}>Price</TableCell>
                  <TableCell sx={styles.colCenter}>Publish Date</TableCell>
                  <TableCell sx={styles.colAction}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {items.map((row) => (
                  <TableRow key={row.id} hover sx={styles.tableRow}>
                    <TableCell>
                      <Box sx={styles.detailsCell}>
                        <Avatar
                          variant="rounded"
                          src={row.thumbnail}
                          alt={row.title}
                          sx={styles.thumb}
                        />

                        <Box sx={styles.detailsText}>
                          <Typography sx={styles.itemTitle} noWrap>
                            {row.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={styles.categoryText}
                          >
                            {row.category}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell sx={styles.colCenter}>
                      <Typography sx={styles.priceText}>{row.price}</Typography>
                    </TableCell>

                    <TableCell sx={styles.colCenter}>
                      <Typography sx={styles.dateText}>
                        {row.publishDate}
                      </Typography>
                    </TableCell>

                    <TableCell sx={styles.colAction}>
                      <IconButton
                        size="small"
                        sx={styles.editButton}
                        onClick={() =>
                          router.push(
                            `/dashboard/admin/product/reviews?id=${row.id}`
                          )
                        }
                      >
                        <ViewModuleIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
      )}

      {/* ================= MOBILE VIEW ================= */}
      {!isLargeScreen && items.length > 0 && (
        <MyItemsMobileCards
          items={items}
          responsive={responsive}
          isSmallScreen={isSmallScreen}
        />
      )}

      {/* ================= LOAD MORE (MOBILE ONLY) ================= */}
      {!isLargeScreen && items.length > 0 && (
        <Box sx={styles.loadMoreContainer}>
          <Button variant="outlined" sx={styles.loadMoreButton}>
            Load More Items
          </Button>
        </Box>
      )}
    </Box>
  );
}
