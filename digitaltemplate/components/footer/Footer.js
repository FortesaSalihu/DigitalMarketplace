"use client";

import React from "react";
import {
  Box,
  Typography,
  Link,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import Image from "next/image";
import footerModernStyles from "./footerStyles";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";

export default function FooterModern() {
  return (
    <Box component="footer" sx={footerModernStyles.root}>
      {/* --- Top Section --- */}
      <Box sx={footerModernStyles.container}>
        <Box sx={footerModernStyles.columnGroup}>
          <Box sx={footerModernStyles.column}>
            <Typography className="colTitle">Digital Market</Typography>
            <Link href="#">Terms</Link>
            <Link href="#">Licenses</Link>
            <Link href="#">Market API</Link>
            <Link href="#">Become an affiliate</Link>
            <Link href="#">Cookies</Link>
            <Link href="#">Cookie Settings</Link>
          </Box>

          <Box sx={footerModernStyles.column}>
            <Typography className="colTitle">Help</Typography>
            <Link href="#">Help Center</Link>
            <Link href="#">Authors</Link>
          </Box>

          <Box sx={footerModernStyles.column}>
            <Typography className="colTitle">Our Community</Typography>
            <Link href="#">Community</Link>
            <Link href="#">Blog</Link>
            <Link href="#">Meetups</Link>
          </Box>

          <Box sx={footerModernStyles.column}>
            <Typography className="colTitle">Meet Digital</Typography>
            <Link href="#">About Envato</Link>
            <Link href="#">Careers</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Do not sell or share my personal information</Link>
            <Link href="#">Sitemap</Link>
          </Box>
        </Box>

        {/* Stats Section */}
        <Box sx={footerModernStyles.statsBox}>
          <Image
            src="/image/img3.jpg"
            alt="Envato Logo"
            width={50}
            height={20}
            style={{ marginBottom: "10px", borderRadius: 400 }}
          />
          <Typography sx={footerModernStyles.statsValue}>78,011,354</Typography>
          <Typography sx={footerModernStyles.statsTitle}>items sold</Typography>
          <Typography sx={{ ...footerModernStyles.statsValue, mt: 1 }}>
            $1,231,598,059
          </Typography>
          <Typography sx={footerModernStyles.statsTitle}>
            community earnings
          </Typography>
        </Box>
      </Box>

      <Divider sx={footerModernStyles.divider} />

      {/* --- Bottom Section --- */}
      <Box sx={footerModernStyles.bottomRow}>
        <Box sx={footerModernStyles.bottomLinks}>
          <Link href="#">Digital Elements</Link>
          <Link href="#">Placeit by Envato</Link>
          <Link href="#">Envato Tuts+</Link>
          <Link href="#">All Products</Link>
          <Link href="#">Sitemap</Link>
        </Box>

        <Typography>
          © {new Date().getFullYear()} Digital Pty Ltd. Trademarks and brands
          are the property of their respective owners.
        </Typography>

        <Stack direction="row" spacing={0.5} sx={footerModernStyles.social}>
          <IconButton aria-label="twitter" href="#" size="small">
            <TwitterIcon />
          </IconButton>
          <IconButton aria-label="facebook" href="#" size="small">
            <FacebookIcon />
          </IconButton>
          <IconButton aria-label="youtube" href="#" size="small">
            <YouTubeIcon />
          </IconButton>
          <IconButton aria-label="instagram" href="#" size="small">
            <InstagramIcon />
          </IconButton>
          <IconButton aria-label="pinterest" href="#" size="small">
            <PinterestIcon />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}
