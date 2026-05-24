import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Item from "@/models/Item";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    const categorySlug = searchParams.get("category");

    const subCategorySlug = searchParams.get("subcategory");

    let filter = {};

    if (categorySlug) {
      const category = await Category.findOne({
        slug: categorySlug,
      });

      if (!category) {
        return NextResponse.json({
          success: true,
          products: [],
        });
      }

      filter.category_id = category._id;
    }

    if (subCategorySlug) {
      const subCategory = await SubCategory.findOne({
        slug: subCategorySlug,
      });

      if (!subCategory) {
        return NextResponse.json({
          success: true,
          products: [],
        });
      }

      filter.sub_category_id = subCategory._id;
    }

    const products = await Item.find(filter)
      .populate("author_id", "name")
      .populate("category_id", "name  slug")
      .populate("sub_category_id", "name slug")

      .sort({ createdAt: -1 });

    console.log("productes", products);

    return NextResponse.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.log("products fetch error", error);

    return NextResponse.json(
      {
        success: false,
        message: "server error",
      },
      { status: 500 }
    );
  }
}
