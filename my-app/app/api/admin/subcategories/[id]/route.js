import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import SubCategory from "@/models/SubCategory";
import Category from "@/models/Category";
import slugify from "slugify";

export async function GET(req, { params }) {
  await dbConnect();

  try {
    const { id } = await params;

    const subcategory = await SubCategory.findById(id).populate(
      "category_id",
      "name slug"
    );

    if (!subcategory) {
      return NextResponse.json(
        {
          message: "subcategory not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(subcategory);
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
    const { category_id, name } = body;

    if (category_id) {
      const categoryExists = await Category.findById(category_id);

      if (!categoryExists) {
        return NextResponse.json(
          {
            message: "Parent   category not found",
          },
          {
            status: 404,
          }
        );
      }
    }

    const updateData = {
      category_id,
      name,
    };

    if (name) {
      updateData.slug = slugify(name, {
        lower: true,
        strict: true,
      });
    }

    const updatedSubcategory = await SubCategory.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).populate("category_id", "name slug");

    if (!updatedSubcategory) {
      return NextResponse.json(
        {
          message: "SubCategory not  found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedSubcategory);
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
    const deletedSubcategory = await SubCategory.findByIdAndDelete(id);

    if (!deletedSubcategory) {
      return NextResponse.json(
        {
          message: "subcategory  not  found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      message: "subCategory  deleted  successfully",
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
