import { NextRequest, NextResponse } from "next/server";
import type { ILoginRequest, ILoginResponse } from "@/shared/types/api.types";

/**
 * Mock API route for login
 * POST /api/auth/login
 */
export async function POST(request: NextRequest) {
  try {
    const body: ILoginRequest = await request.json();
    const { email, password } = body;

    // Mock validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Mock authentication (in real app, check against database)
    if (email === "demo@example.com" && password === "Demo123!@#") {
      const mockUser = {
        id: 1,
        email: "demo@example.com",
        name: "Demo User",
        role: "user",
        createdAt: new Date().toISOString(),
      };

      const response: ILoginResponse = {
        user: mockUser,
        token: "mock_jwt_token_" + Date.now(),
        refreshToken: "mock_refresh_token_" + Date.now(),
      };

      return NextResponse.json(response, { status: 200 });
    }

    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
