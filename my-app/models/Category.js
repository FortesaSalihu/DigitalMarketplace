import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
        },

        fileTypes: {
            type: [String],
            required: true,
            default: [],
        },

        show_at_featured: {
            type: Boolean,
            default: false,
        },
        show_at_nav: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);