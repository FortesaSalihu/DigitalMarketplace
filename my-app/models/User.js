import mongoose from "mongoose";

import WithdrawlMethod from "./WithdrawlMethod";

const UserSchema = new mongoose.Schema(
  {
    avatar: {
      url: { type: String },
      public_id: {
        type: String,
      },
    },

    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },

    password: String,
    level_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
    },

    balance: {
      type: Number,
      default: 0,
    },

    user_type: {
      type: String,
      enum: ["user", "author", "admin"],
      default: "user",
    },

    country: String,
    city: String,
    address: String,
    kyc_status: {
      type: Boolean,
      default: false,
    },
    total_sale: {
      type: Number,
      default: 0,
    },

    withdraw_method_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WithdrawlMethod",
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);