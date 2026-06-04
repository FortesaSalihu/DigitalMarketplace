import mongoose from "mongoose";

import User from "./User";
import Item from "./Item";

const ItemHistorySchema = new mongoose.Schema(
  {
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    reviewer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },

    title: String,
    body: String,
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
  },
  { timestamps: true }
);

export default mongoose.models.ItemHistory ||
  mongoose.model("ItemHistory", ItemHistorySchema);
