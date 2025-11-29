import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/_lib/db";
import Category from "@/app/_models/Category";
import { ObjectId } from "mongodb";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const {id} = await params; 
        await connectToDatabase();
        const category = await Category.findById(new ObjectId(id));
        if (!category) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(category, { status: 200 });
    } catch (error) {
        console.error("Error fetching category:", error);
        return NextResponse.json(
            { error: "Failed to fetch category" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const {id} = await params; 
        await connectToDatabase();
        const data = await request.json();
        const updatedCategory = await Category.findByIdAndUpdate(new ObjectId(id), data, { new: true });
        if (!updatedCategory) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(updatedCategory, { status: 200 });
    } catch (error) {
        console.error("Error updating category:", error);
        return NextResponse.json(
            { error: "Failed to update category" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const {id} = await params; 
        await connectToDatabase();
        const deletedCategory = await Category.findByIdAndDelete(new ObjectId(id));
        if (!deletedCategory) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting category:", error);
        return NextResponse.json(
            { error: "Failed to delete category" },
            { status: 500 }
        );
    }
}