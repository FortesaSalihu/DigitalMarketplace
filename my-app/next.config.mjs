/** @type {import('next').NextConfig} */

import config from "./config.js"

const nextConfig = {
  images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "i.pravatar.cc",
        },
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
        },
      ],
    },

    env: {
      DB_URI: config.DB_URI,
      API: config.API,
      CLOUDINARY_CLOUD_NAME: config.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: config.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: config.CLOUDINARY_API_SECRET,
      GOOGLE_API_KEY:config.GOOGLE_API_KEY,
      GOOGLE_CLIENT_ID: config.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: config.GOOGLE_CLIENT_SECRET,
      NEXTAUTH_SECRET: config.NEXTAUTH_SECRET,
      RAZORPAY_KEY_ID: config.RAZORPAY_KEY_ID,
      RAZORPAY_KEY_SECRET: config.RAZORPAY_KEY_SECRET,
      PAYPAL_CLIENT_ID: config.PAYPAL_CLIENT_ID,
      PAYPAL_CLIENT_SECRET: config.PAYPAL_CLIENT_SECRET
    },
};

export default nextConfig;
