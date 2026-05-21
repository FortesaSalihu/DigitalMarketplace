import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import slugify from "slugify";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    console.log("subcategory===>", body);

    const { category_id, name } = body;

    if (!category_id || !name) {
      return NextResponse.json(
        {
          message: "Category and subcategory  name are  required",
        },
        { status: 400 }
      );
    }

    const categoryExists = await Category.findById(category_id);

    if (!categoryExists) {
      return NextResponse.json(
        {
          message: "Parent  category not  found",
        },
        {
          status: 404,
        }
      );
    }

    const subcategory = await SubCategory.create({
      category_id,
      name,
      slug: slugify(name, { lower: true }),
    });

    // console.log("subcategory   craeted==>" , subcategory)
    return NextResponse.json(subcategory, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const subcategories = await SubCategory.find()

      .populate("category_id", "name slug")

      .sort({ createdAt: -1 });

    return NextResponse.json(subcategories);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
