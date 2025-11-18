import { dbConnect } from "@/lib/mongodb";
import User from "@/Models/User";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface DecodedToken extends JwtPayload {
  id: string;
}

export async function PUT(req: Request) {
  try {
    await dbConnect();

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    if (!decoded?.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, mobile, password } = body;

    const updateData: { name?: string; email?: string; mobile?: string; passwordHash?: string } = {
      name,
      email,
      mobile,
    };

    if (password) {
      updateData.passwordHash = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      updateData,
      { new: true }
    ).select("-passwordHash");

    return NextResponse.json({ user: updatedUser });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
