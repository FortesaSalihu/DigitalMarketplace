import mongoose from "mongoose";

import User from "./User";

import Category from "./Category";

import SubCategory from "./SubCategory";

const ItemSchema = new mongoose.Schema(
  {
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      trim: true,
    },

    slug: {
      type: String,
      trim: true,
      unique: true,
    },

    description: String,
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    sub_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },

    options: String,
    version: String,
    demo_link: String,

    tags: {
      type: [String],
      default: [],
    },

    preview_type: {
      type: String,
      enum: ["audio", "video", "image"],
    },

    preview_image: String,
    preview_video: String,
    preview_audio: String,

    main_file: String,
    main_files: {
      type: [String],
      default: [],
    },

    is_main_file_external: {
      type: Boolean,
      default: false,
    },

    screenshots: {
      type: [String],
      default: [],
    },

    price: {
      type: Number,
      default: 0,
    },

    discount_price: {
      type: Number,
      default: 0,
    },

    is_supported: {
      type: Boolean,
      default: false,
    },
    support_instructions: String,

    status: {
      type: String,

      enum: [
        "approved",

        "soft_rejected",
        "hard_rejected",
        "pending",
        "resubmitted",
      ],
      default: "pending",
    },

    total_sales: {
      type: Number,
      default: 0,
    },
    total_sale_amount: {
      type: Number,
      default: 0,
    },

    total_earning: {
      type: Number,
      default: 0,
    },

    is_free: {
      type: Boolean,
      default: false,
    },
    is_trending: {
      type: Boolean,
      default: false,
    },

    is_best_selling: {
      type: Boolean,
      default: false,
    },
    is_on_discound: {
      type: Boolean,
      default: false,
    },

    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Item || mongoose.model("Item", ItemSchema);
