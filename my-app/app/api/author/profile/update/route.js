import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import { getServerSession } from "next-auth/next";

import { authOptions } from "@/utils/authOptions";
import User from "@/models/User";
export async function PUT(req) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const body = await req.json();

    if (!session?.user?._id) {
      return NextResponse.json(
        {
          message: "Not  authenticated",
        },
        {
          status: 401,
        }
      );
    }

    const userId = session?.user?._id;

    let updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: body.name,
        email: body.email,
        city: body.city,
        address: body.address,
        country: body.country,
        avatar: body.avatar,
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        {
          message: "user not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("profile update serror====>", error);
    return NextResponse.json(
      { message: "Profile update failed" },
      { status: 500 }
    );
  }
}
