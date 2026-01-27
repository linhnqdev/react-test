import { NextRequest, NextResponse } from "next/server";

/**
 * Mock API route for logout
 * POST /api/auth/logout
 */
export async function POST(request: NextRequest) {
  try {
    // In real app, invalidate token on server
    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
