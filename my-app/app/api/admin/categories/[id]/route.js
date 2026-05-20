import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Category from "@/models/Category";
import slugify from "slugify";

export async function GET(req, { params }) {
  await dbConnect();

  try {
    const { id } = await params;

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        {
          message: "category not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  await dbConnect();

  const { id } = await params;

  const body = await req.json();

  try {
    const updateData = {
      name: body.category_name,
      fileTypes: body.file_types,
      show_at_featured: body.show_at_featured,
      show_at_nav: body.show_at_nav,
    };

    if (body.category_name) {
      updateData.slug = slugify(body.category_name, {
        lower: true,
      });
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCategory) {
      return NextResponse.json(
        {
          message: "Category not  found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();

  try {
    const { id } = await params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json(
        {
          message: "category  not  found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      message: "Category  deleted  successfully",
      id,
    });
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