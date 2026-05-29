import mongoose from "mongoose";
import User from "./User";
import Category from "./Category";

const UploadedFileSchema = new mongoose.Schema(
  {
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    name: String,
    mime_type: String,
    extension: String,
    size: Number,

    path: {
      url: {
        type: String,
      },

      public_id: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.UploadedFile ||
  mongoose.model("UploadedFile", UploadedFileSchema);
