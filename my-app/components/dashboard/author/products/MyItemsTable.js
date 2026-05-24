"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
  Chip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";

import { styles, responsiveStyles } from "./myItemsStyles";
import MyItemsMobileCards from "./MyItemsMobileCards";
import CreateItemModal from "./CreateItemModal";
import { useRouter } from "next/navigation";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";

// sample data
// const sampleData = [
//   {
//     id: 1,
//     title: "EzyBook Online Booking System — a longer title to test truncation",
//     category: "Code & Scripts / PHP Scripts",
//     price: "$127",
//     publishDate: "Feb 24, 2025",
//     status: "Approved",
//     thumbnail:
//       "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=800&q=80",
//   },
//   {
//     id: 2,
//     title: "SocialSphere Social Network Platform",
//     category: "Code & Scripts / PHP Scripts",
//     price: "$246",
//     publishDate: "Feb 24, 2025",
//     status: "Approved",
//     thumbnail:
//       "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
//   },
//   {
//     id: 3,
//     title: "Eventify Event Management Solution",
//     category: "Code & Scripts / PHP Scripts",
//     price: "$286",
//     publishDate: "Feb 24, 2025",
//     status: "Approved",
//     thumbnail:
//       "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?w=800&q=80",
//   },
// ];

const StatusChip = ({ status }) => {
  const STATUS_CONFIG = {
    active: {
      label: "Active",
      bg: "#DCFCE7", // fresh green
      color: "#166534",
    },

    approved: {
      label: "Approved",
      bg: "#ECFDF5", // mint green (lighter than active)
      color: "#047857",
    },

    pending: {
      label: "Pending",
      bg: "#FEF3C7", // amber
      color: "#92400E",
    },

    resubmitted: {
      label: "Resubmitted",
      bg: "#E0F2FE", // sky blue
      color: "#075985",
    },

    inactive: {
      label: "Inactive",
      bg: "#F1F5F9", // neutral gray
      color: "#475569",
    },

    soft_rejected: {
      label: "Soft Rejected",
      bg: "#FFE4E6", // rose
      color: "#9F1239",
    },

    hard_rejected: {
      label: "Hard Rejected",
      bg: "#7F1D1D", // deep red
      color: "#FEF2F2",
    },
  };

  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;

  return (
    <Chip
      size="small"
      label={config.label}
      sx={{
        bgcolor: config.bg,
        color: config.color,
        fontWeight: 600,
        borderRadius: "6px",
        textTransform: "capitalize",
      }}
    />
  );
};

export default function MyItemsTable() {
  const theme = useTheme();
  const [openItemModal, setOpenItemModal] = useState(false);
  const [items, setItems] = useState([]);
  const router = useRouter();

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isExtraSmall = useMediaQuery(theme.breakpoints.down(400));

  const responsive = responsiveStyles(isSmallScreen, isExtraSmall);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${process.env.API}/author/item`);
        const json = await res.json();
        const list = Array.isArray(json.items) ? json.items : [];

        const formatted = list.map((item) => {
          let priceDispaly = "Free";

          if (!item.is_free && item.price > 0) {
            if (item.discount_price && item.discount_price > 0) {
              priceDispaly = {
                regular: item.price,
                discount: item.discount_price,
              };
            } else {
              priceDispaly = {
                regular: item.price,
              };
            }

            return {
              id: item._id,
              title: item.name,

              category:
                `${item.category_id?.name}/ ${item.sub_category_id?.name}` ||
                "_",

              price: priceDispaly,
              publishDate: new Date(item.createdAt).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }
              ),

              status: item.status,
              thumbnail: item.preview_image,
              previewType: item.preview_type,
            };
          }
        });

        setItems(formatted);
      } catch (error) {
        console.log("failed to fetch items");
        setItems([]);
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
            My Items
          </Typography>
          <Typography variant="body2" sx={responsive.headerSubtitle}>
            Manage your items and products
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={!isExtraSmall && <AddIcon />}
          sx={styles.addButton}
          fullWidth={isSmallScreen}
          size={isSmallScreen ? "small" : "medium"}
          onClick={() => setOpenItemModal(true)}
        >
          {isExtraSmall ? "Add" : "Add Item"}
        </Button>
      </Box>

      {/* Desktop Table */}
      {isLargeScreen ? (
        <TableContainer component={Paper} sx={styles.tableContainer}>
          <Box sx={styles.tableWrapper}>
            <Table sx={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell sx={styles.colTitle}>Item Details</TableCell>
                  <TableCell sx={styles.colCenter}>Price</TableCell>
                  <TableCell sx={styles.colCenter}>Publish Date</TableCell>
                  <TableCell sx={styles.colCenter}>Status</TableCell>
                  <TableCell sx={styles.colAction}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {items.map((row) => (
                  <TableRow key={row.id} hover sx={styles.tableRow}>
                    <TableCell>
                      <Box sx={styles.detailsCell}>
                        {/* 🔥 PREVIEW LOGIC */}
                        <Avatar
                          variant="rounded"
                          src={
                            row.previewType === "image"
                              ? row.thumbnail
                              : undefined
                          }
                          alt={row.title}
                          sx={{
                            ...styles.thumb,
                            position: "relative",
                          }}
                        >
                          {row.previewType === "video" && (
                            <PlayCircleOutlineIcon fontSize="medium" />
                          )}

                          {row.previewType === "audio" && (
                            <AudiotrackIcon fontSize="medium" />
                          )}
                        </Avatar>

                        <Box sx={styles.detailsText}>
                          {/* 🔥 TRUNCATED TITLE */}
                          <Typography sx={styles.itemTitle} title={row.title}>
                            {row.title.length > 100
                              ? row.title.substring(0, 100) + "..."
                              : row.title}
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

                    {/* 🔥 PRICE COLUMN */}
                    <TableCell sx={styles.colCenter}>
                      {row.price === "Free" ? (
                        <Typography sx={styles.priceText}>Free</Typography>
                      ) : row.price.discount ? (
                        <Box>
                          <Typography
                            sx={{
                              ...styles.priceText,
                              textDecoration: "line-through",
                            }}
                          >
                            ${row.price.regular}
                          </Typography>
                          <Typography sx={styles.priceText}>
                            ${row.price.discount}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography sx={styles.priceText}>
                          ${row.price.regular}
                        </Typography>
                      )}
                    </TableCell>

                    <TableCell sx={styles.colCenter}>
                      <Typography sx={styles.dateText}>
                        {row.publishDate}
                      </Typography>
                    </TableCell>

                    <TableCell sx={styles.colCenter}>
                      <StatusChip status={row.status} />
                    </TableCell>

                    <TableCell sx={styles.colAction}>
                      <IconButton
                        aria-label="edit"
                        size="small"
                        sx={styles.editButton}
                        onClick={() =>
                          router.push(
                            `/dashboard/author/product/edit?id=${row.id}`
                          )
                        }
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
      ) : (
        <MyItemsMobileCards
          items={items}
          responsive={responsive}
          isSmallScreen={isSmallScreen}
        />
      )}

      {!isLargeScreen && items.length > 0 && (
        <Box sx={styles.loadMoreContainer}>
          <Button variant="outlined" sx={styles.loadMoreButton}>
            Load More Items
          </Button>
        </Box>
      )}

      <CreateItemModal
        open={openItemModal}
        onClose={() => setOpenItemModal(false)}
      />
    </Box>
  );
}
