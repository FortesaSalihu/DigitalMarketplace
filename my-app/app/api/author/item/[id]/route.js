import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Item from "@/models/Item";
import slugify from "slugify";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const userId = session.user._id;
    const { id } = await params;

    const item = await Item.findOne({
      _id: id,
      author_id: userId,
    });

    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    // const ALLOWED_STATUSES = ["approved", "soft_rejected"];

    // if (!ALLOWED_STATUSES.includes(item.status)) {
    //   return NextResponse.json(
    //     {
    //       message:
    //         "You are not allowed to edit this item in its current status.",
    //     },
    //     { status: 403 }
    //   );
    // }

    const body = await req.json();

    const {
      name,
      description,
      category_id,
      subcategory_id,
      version,
      demo_link,
      tags,

      preview_type,
      preview_image,
      preview_video,
      preview_audio,

      main_file,
      main_files = [],
      is_main_file_external,

      screenshots = [],

      supported,
      support_instructions,
      regular_price,
      discount_price,
      is_free,
      reviewer_message,
      status,
    } = body;

    let finalMainFile = null;
    let finalMainFiles = [];

    if (is_main_file_external === true) {
      finalMainFile = main_file;
      finalMainFiles = [];
    } else if (is_main_file_external === false) {
      finalMainFile = null;
      finalMainFiles = main_files;
    }

    const updateData = {
      ...(name && {
        name,
        slug: slugify(name, { lower: true }),
      }),

      ...(description && { description }),
      ...(category_id && { category_id }),
      ...(subcategory_id && { sub_category_id: subcategory_id }),

      ...(version && { version }),
      ...(demo_link && { demo_link }),
      ...(tags && { tags }),

      ...(preview_type && { preview_type }),
      ...(preview_image && { preview_image }),
      ...(preview_video && { preview_video }),
      ...(preview_audio && { preview_audio }),

      ...(typeof is_main_file_external === "boolean" && {
        is_main_file_external,
        main_file: finalMainFile,
        main_files: finalMainFiles,
      }),

      ...(screenshots.length > 0 && { screenshots }),

      ...(supported !== undefined && {
        is_supported: supported === "yes",
      }),

      ...(support_instructions && { support_instructions }),

      ...(regular_price !== undefined && {
        price: Number(regular_price) || 0,
      }),

      ...(discount_price !== undefined && {
        discount_price: Number(discount_price) || 0,
      }),

      ...(is_free !== undefined && {
        is_free: Boolean(is_free),
      }),

      ...(reviewer_message && { reviewer_message }),

      // ...(status && { status }),
    };

    const updatedItem = await Item.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    console.log("updatedItem  successfully===>", updatedItem);
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.log("UPDATE ITEM ERROR ❌", error);

    return NextResponse.json(
      { message: "Item update failed" },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  await dbConnect();

  try {
    const { id } = await params;

    const item = await Item.findById(id)
      .populate("category_id")
      .populate("sub_category_id");

    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();

  try {
    const { id } = params;

    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Item deleted successfully",
      id,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
