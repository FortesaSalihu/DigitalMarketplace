import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";

export async function PUT(req) {
  await dbConnect();

  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json(
        {
          error: "not authenticated",
        },
        { status: 401 },
      );
    }

    const { currentPassword, newPassword } = await req.json();

    //    console.log("request body===>" ,{ currentPassword, newPassword }   )

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        {
          error: "all   fields are  reuqired",
        },
        {
          status: 400,
        },
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        {
          error: "New password  must be at least 8  character",
        },

        {
          status: 400,
        },
      );
    }

    const user = await User.findById(token.user._id);

    console.log("db user===>", user);

    if (!user) {
      return NextResponse.json(
        {
          error: "user not found",
        },
        { status: 404 },
      );
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return NextResponse.json(
        {
          error: "current passowrd is incorrect",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return NextResponse.json(
      { message: "password  changed  successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log("password  change  error", error);

    return NextResponse.json(
      {
        error: "an  error occured  while changing password",
      },

      { status: 500 },
    );
  }
}