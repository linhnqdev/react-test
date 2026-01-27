import { NextRequest, NextResponse } from "next/server";
import type { IUser } from "@/shared/types/user.types";

/**
 * Mock API route for user by ID
 * GET /api/users/[id] - Get user by ID
 * PUT /api/users/[id] - Update user
 * DELETE /api/users/[id] - Delete user
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Mock user (in real app, fetch from database)
    const mockUser: IUser = {
      id: parseInt(id),
      email: `user${id}@example.com`,
      name: `User ${id}`,
      role: "user",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(mockUser, { status: 200 });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Mock user update (in real app, update in database)
    const updatedUser: IUser = {
      id: parseInt(id),
      email: body.email || `user${id}@example.com`,
      name: body.name || `User ${id}`,
      role: body.role || "user",
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Mock user deletion (in real app, delete from database)
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
