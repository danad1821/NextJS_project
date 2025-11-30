import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/_lib/db";
import Product from "@/app/_models/Product";
import { ObjectId } from "mongodb";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const {id} = await params; 
        await connectToDatabase();
        const data = await request.json();
        const updatedProduct = await Product.findByIdAndUpdate(new ObjectId(id), data, { new: true });
        if (!updatedProduct) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json(
            { error: "Failed to update product" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const {id} = await params; 
        await connectToDatabase();
        const deletedProduct = await Product.findByIdAndDelete(new ObjectId(id));
        if (!deletedProduct) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json(
            { error: "Failed to delete product" },
            { status: 500 }
        );
    }
}