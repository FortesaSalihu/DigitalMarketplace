// // File: components/MyItemsTable.jsx
// "use client";

// import React from "react";
// import Link from "next/link";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Avatar,
//   IconButton,
//   Button,
//   Chip,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import AddIcon from "@mui/icons-material/Add";
// import { useTheme } from "@mui/material/styles";

// import { styles, responsiveStyles } from "./myItemsStyles";
// import MyItemsMobileCards from "./MyItemsMobileCards";
// import CreateItemModal from "./CreateItemModal";
// // sample data
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
// import { useState } from "react";
// export default function MyItemsTable({ items = sampleData }) {
//   const theme = useTheme();
//   const [openItemModal, setOpenItemModal] = useState(false);

//   // breakpoints
//   const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
//   const isExtraSmall = useMediaQuery(theme.breakpoints.down(400));

//   // responsive styles
//   const responsive = responsiveStyles(isSmallScreen, isExtraSmall);

//   return (
//     <Box sx={styles.container}>
//       {/* Header */}
//       <Box sx={styles.headerRow}>
//         <Box sx={responsive.headerTitleBox}>
//           <Typography variant="h6" sx={responsive.headerTitle}>
//             My Items
//           </Typography>
//           <Typography variant="body2" sx={responsive.headerSubtitle}>
//             Manage your items and products
//           </Typography>
//         </Box>

//         <Button
//           variant="contained"
//           startIcon={!isExtraSmall && <AddIcon />}
//           sx={styles.addButton}
//           fullWidth={isSmallScreen}
//           size={isSmallScreen ? "small" : "medium"}
//           onClick={() => setOpenItemModal(true)}
//         >
//           {isExtraSmall ? "Add" : "Add Item"}
//         </Button>
//       </Box>

//       {/* Desktop Table */}
//       {isLargeScreen ? (
//         <TableContainer component={Paper} sx={styles.tableContainer}>
//           <Box sx={styles.tableWrapper}>
//             <Table sx={styles.table}>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={styles.colTitle}>Item Details</TableCell>
//                   <TableCell sx={styles.colCenter}>Price</TableCell>
//                   <TableCell sx={styles.colCenter}>Publish Date</TableCell>
//                   <TableCell sx={styles.colCenter}>Status</TableCell>
//                   <TableCell sx={styles.colAction}>Action</TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {items.map((row) => (
//                   <TableRow key={row.id} hover sx={styles.tableRow}>
//                     <TableCell>
//                       <Box sx={styles.detailsCell}>
//                         <Avatar
//                           variant="rounded"
//                           src={row.thumbnail}
//                           alt={row.title}
//                           sx={styles.thumb}
//                         />

//                         <Box sx={styles.detailsText}>
//                           <Link
//                             href={`/items/${row.id}`}
//                             style={styles.titleLink}
//                           >
//                             <Typography sx={styles.itemTitle} noWrap>
//                               {row.title}
//                             </Typography>
//                           </Link>

//                           <Typography
//                             variant="caption"
//                             sx={styles.categoryText}
//                           >
//                             {row.category}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     </TableCell>

//                     <TableCell sx={styles.colCenter}>
//                       <Typography sx={styles.priceText}>{row.price}</Typography>
//                     </TableCell>

//                     <TableCell sx={styles.colCenter}>
//                       <Typography sx={styles.dateText}>
//                         {row.publishDate}
//                       </Typography>
//                     </TableCell>

//                     <TableCell sx={styles.colCenter}>
//                       <Chip
//                         label={row.status}
//                         size="small"
//                         sx={styles.statusChip}
//                       />
//                     </TableCell>

//                     <TableCell sx={styles.colAction}>
//                       <IconButton
//                         aria-label="edit"
//                         size="small"
//                         sx={styles.editButton}
//                       >
//                         <EditIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Box>
//         </TableContainer>
//       ) : (
//         // ✅ Mobile Cards Component
//         <MyItemsMobileCards
//           items={items}
//           responsive={responsive}
//           isSmallScreen={isSmallScreen}
//         />
//       )}

//       {/* Load More */}
//       {!isLargeScreen && items.length > 0 && (
//         <Box sx={styles.loadMoreContainer}>
//           <Button variant="outlined" sx={styles.loadMoreButton}>
//             Load More Items
//           </Button>
//         </Box>
//       )}

//       <CreateItemModal
//         open={openItemModal}
//         onClose={() => setOpenItemModal(false)}
//       />
//     </Box>
//   );
// }

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
  const router = useRouter();

  const [items, setItems] = useState([]);

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isExtraSmall = useMediaQuery(theme.breakpoints.down(400));

  const responsive = responsiveStyles(isSmallScreen, isExtraSmall);

  return (
    <Box sx={styles.container}>
      {/* Header */}
      <Box sx={styles.headerRow}>
        <Box sx={responsive.headerTitleBox}>
          <Typography variant="h6" sx={responsive.headerTitle}>
            Pending Items
          </Typography>

          <Typography variant="body2" sx={responsive.headerSubtitle}>
            Manage your items and products
          </Typography>
        </Box>
      </Box>

      {/* ================= EMPTY STATE ================= */}
      {items.length === 0 && (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Typography>No pending items found.</Typography>
        </Box>
      )}

      {/* ================= DESKTOP TABLE ================= */}
      {isLargeScreen && items.length > 0 && (
        <TableContainer component={Paper} sx={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Avatar src={item?.images?.[0]?.url} />

                      <Typography>{item.title}</Typography>
                    </Box>
                  </TableCell>

                  <TableCell>{item.status}</TableCell>

                  <TableCell>
                    <IconButton>
                      <ViewModuleIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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