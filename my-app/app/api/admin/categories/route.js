import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Category from "@/models/Category";

import SubCategory from "@/models/SubCategory";

export async function GET() {
  try {
    await dbConnect();

    const categories = await Category.find().lean();

    const categoriesWithSubs = await Promise.all(
      categories.map(async (cat) => {
        const subs = await SubCategory.find({
          category_id: cat._id,
        }).lean();

        return {
          id: cat.slug,
          title: cat.name,
          slug: cat.slug,

          subs: subs.map((sub) => ({
            name: sub.name,
            slug: sub.slug,
          })),
        };
      }),
    );

    return NextResponse.json(categoriesWithSubs);
  } catch (error) {
    return NextResponse.json(
      {
        error: "failed to fetch categorues",
      },
      {
        status: 500,
      },
    );
  }
}