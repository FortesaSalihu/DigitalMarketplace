import cloudinary from "@/lib/cloudinary";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        {
          error: "no file  recieved",
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "profile-image",
            resource_type: "image",
          },

          (error, result) => {
            if (error) reject(error);
            resolve(result);
          }
        )

        .end(buffer);
    });

    console.log("upload result", uploadResult);

    return NextResponse.json({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    });
  } catch (error) {
    console.log("errorrr= server", error);

    return NextResponse.json(
      { error: "upload  failed" },

      { status: 500 }
    );
  }
}
