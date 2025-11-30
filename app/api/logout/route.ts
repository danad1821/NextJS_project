import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Handle POST requests to the /api/logout endpoint
export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("user");

  return NextResponse.json(
    { success: true, message: "Logged out successfully" },
    { status: 200 }
  );
}
