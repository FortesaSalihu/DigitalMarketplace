import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import UploadedFile from "@/models/UploadedFile";

import { getToken } from "next-auth/jwt";

export async function POST(req) {
  try {
    await dbConnect();

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const author_id = token?.sub;
    const { public_id, categoryId } = await req.json();

    if (!public_id || !categoryId) {
      return NextResponse.json(
        { error: "public_id and categoryId required" },
        { status: 400 }
      );
    }

    const file = await UploadedFile.findOne({
      "path.public_id": public_id,
      author_id,
      category_id: categoryId,
    });

    if (!file) {
      return NextResponse.json(
        { error: "File not found or unauthorized" },
        { status: 404 }
      );
    }

    await cloudinary.uploader.destroy(public_id);

    await UploadedFile.deleteOne({ _id: file._id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("DELETE FILE ERROR:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
