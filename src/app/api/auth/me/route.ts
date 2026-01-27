import { NextRequest, NextResponse } from "next/server";
import type { IUser } from "@/shared/types/user.types";

/**
 * Mock API route for getting current user
 * GET /api/auth/me
 */
export async function GET(request: NextRequest) {
  try {
    // In real app, verify token and get user from database
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Mock user (in real app, decode token and fetch from database)
    const mockUser: IUser = {
      id: 1,
      email: "demo@example.com",
      name: "Demo User",
      role: "user",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(mockUser, { status: 200 });
  } catch (error) {
    console.error("Get current user error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
