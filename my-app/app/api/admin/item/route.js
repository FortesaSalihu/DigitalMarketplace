import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Item from "@/models/Item";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import slugify from "slugify";

import ItemHistory from "@/models/ItemHistory";

export async function POST(req) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

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
      regularPrice,
      discount_price,
      is_free,
      reviewer_message,
    } = await req.json();

    //    const  body=await  req.json()

    //  console.log("item  body data===>",  body)

    //       return

    //  Handle main file logic
    let finalMainFile = null;
    let finalMainFiles = [];

    if (is_main_file_external === true) {
      // External link
      finalMainFile = main_file;
      finalMainFiles = [];
    } else {
      // Uploaded files
      finalMainFile = null;
      finalMainFiles = main_files;
    }

    // 3️⃣ Create item
    const newItem = await Item.create({
      author_id: session.user._id,

      name,
      slug: slugify(name, { lower: true }),
      description,

      category_id,
      sub_category_id: subcategory_id,

      version,
      demo_link,
      tags,

      preview_type,
      preview_image,
      preview_video,
      preview_audio,

      main_file: finalMainFile,
      main_files: finalMainFiles,
      is_main_file_external,

      screenshots,

      supported: supported === "yes",
      support_instructions,
      price: Number(regularPrice) || 0,
      discount_price: Number(discount_price) || 0,

      is_free: Boolean(is_free),
      reviewer_message,

      status: "pending",
    });

    await ItemHistory.create({
      author_id: session.user._id,
      item_id: newItem._id,
      title: "Initial Submission",
      body: reviewer_message,
      status: "pending",
    });

    console.log("newItem===>", newItem);

    return NextResponse.json(
      newItem,

      { status: 201 }
    );
  } catch (error) {
    console.log("CREATE ITEM ERROR ❌", error);

    return NextResponse.json(
      { message: "Item creation failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const items = await Item.find({
      author_id: session.user._id,
    })
      .select("-description") // 👈 Exclude description field
      .populate({
        path: "category_id",
        select: "name slug",
      })
      .populate({
        path: "sub_category_id",
        select: "name slug",
      })
      .populate({
        path: "author_id",
        select: "name email",
      })
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: items.length,
        items,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET ITEMS ERROR ❌", error);

    return NextResponse.json(
      { message: "Failed to fetch items" },
      { status: 500 }
    );
  }
}
