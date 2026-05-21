import mongoose from "mongoose";
import User from "./User";
import Category from "./Category";

const SubCategorySchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.SubCategory ||
  mongoose.model("SubCategory", SubCategorySchema);
