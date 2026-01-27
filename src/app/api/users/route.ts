import { NextRequest, NextResponse } from "next/server";
import type { IUser } from "@/shared/types/user.types";

/**
 * Mock API route for users
 * GET /api/users - Get all users
 * POST /api/users - Create new user
 */
export async function GET(request: NextRequest) {
  try {
    // Mock users data (in real app, fetch from database)
    const mockUsers: IUser[] = [
      {
        id: 1,
        email: "user1@example.com",
        name: "User One",
        role: "user",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        email: "user2@example.com",
        name: "User Two",
        role: "admin",
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        email: "user3@example.com",
        name: "User Three",
        role: "user",
        createdAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json(mockUsers, { status: 200 });
  } catch (error) {
    console.error("Get users error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, role } = body;

    if (!email || !name) {
      return NextResponse.json(
        { message: "Email and name are required" },
        { status: 400 }
      );
    }

    // Mock user creation (in real app, save to database)
    const newUser: IUser = {
      id: Math.floor(Math.random() * 1000),
      email,
      name,
      role: role || "user",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Create user error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
