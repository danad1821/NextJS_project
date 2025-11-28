import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/_lib/db";
import User from "@/app/_models/User";
import bcrypt from "bcryptjs";
import { error } from "console";

async function hashPassword(password: string): Promise<string> {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash; // Return the hash to be stored
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err;
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    if (!data.type) {
      return NextResponse.json(
        { error: "Action not specified" },
        { status: 400 }
      );
    }
    if (data.email && data.password) {
      if (data.type === "Login") {
        if (data.email && data.password) {
          const user = await User.findOne({ email: data.email }).lean();
          if (!user) {
            return NextResponse.json(
              { error: "User not found" },
              { status: 404 }
            );
          }

          const passwordMatch = await bcrypt.compare(
            data.password,
            user.password
          );

          if (!passwordMatch) {
            return NextResponse.json(
              { error: "Invalid password" },
              { status: 401 }
            );
          }

          return NextResponse.json(user, { status: 200 });
        }
      } else if (data.type === "Register") {
        data.password = await hashPassword(data.password);
        const createdUser = await User.create(data);
        return NextResponse.json(createdUser, { status: 201 });
      }
    }
    else{
        return NextResponse.json({error: "Email and password are required"}, {status: 400});
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
