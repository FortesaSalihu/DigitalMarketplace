import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          err: "All fields are required",
        },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          err: "Email already in use",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("user saved", user);

    return NextResponse.json(
      {
        msg: "User registered successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);

    return NextResponse.json(
      {
        err: error.message || "Server error",
      },
      { status: 500 }
    );
  }
}


