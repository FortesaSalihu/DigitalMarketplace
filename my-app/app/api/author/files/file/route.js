import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import UploadedFile from "@/models/UploadedFile";
import { getToken } from "next-auth/jwt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST(req) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const file = formData.get("file");
    const category_id = formData.get("categoryId");

    if (!file) {
      return NextResponse.json({ error: "No file received" }, { status: 400 });
    }

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const uploadResult = await cloudinary.uploader.upload(base64, {
      folder: "item-files",
      resource_type: "auto",
    });

    console.log("uploadResult ===>", uploadResult);
    // ✅ Save DB
    const savedFile = await UploadedFile.create({
      author_id: token.sub,
      category_id,
      name: file.name,
      mime_type: file.type,
      extension: file.name.split(".").pop()?.toLowerCase(),
      size: file.size,
      path: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
    });

    return NextResponse.json(savedFile);
  } catch (err) {
    console.log("UPLOAD ERROR:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await dbConnect();

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    if (!categoryId) {
      return NextResponse.json(
        { error: "categoryId required" },
        { status: 400 }
      );
    }

    const files = await UploadedFile.find({
      author_id: token?.sub,
      category_id: categoryId,
    }).sort({ createdAt: -1 });

    return NextResponse.json(files);
  } catch (error) {
    console.log("FETCH FILES ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}
