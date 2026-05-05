import cloudinary from "@/lib/cloudinary";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { public_id } = await req.json();

    console.log("public_id================", public_id);

    if (!public_id) {
      return NextResponse.json(
        { error: "public_id  required" },
        { status: 400 }
      );
    }

    let deletedImage = await cloudinary.uploader.destroy(public_id);

    console.log("deletedimage=====>", deletedImage);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: "DELETED FAILED",
      },
      { status: 500 }
    );
  }
}
