import { NextRequest, NextResponse } from "next/server";
import type { IRegisterRequest, IRegisterResponse } from "@/shared/types/api.types";

/**
 * Mock API route for register
 * POST /api/auth/register
 */
export async function POST(request: NextRequest) {
  try {
    const body: IRegisterRequest = await request.json();
    const { email, password, name } = body;

    // Mock validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Email, password, and name are required" },
        { status: 400 }
      );
    }

    // Mock user creation (in real app, save to database)
    const mockUser = {
      id: Math.floor(Math.random() * 1000),
      email,
      name,
      role: "user",
      createdAt: new Date().toISOString(),
    };

    const response: IRegisterResponse = {
      user: mockUser,
      token: "mock_jwt_token_" + Date.now(),
      refreshToken: "mock_refresh_token_" + Date.now(),
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
