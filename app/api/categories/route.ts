import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/_lib/db";
import Category from "@/app/_models/Category";

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find().lean();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const data = await request.json();
        const newCategory = await Category.create(data);
        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        console.error("Error creating category:", error);
        return NextResponse.json(
            { error: "Failed to create category" },
            { status: 500 }
        );
    }
}