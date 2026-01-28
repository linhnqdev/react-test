import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Hiện tại middleware chỉ pass-through, không làm gì thêm.
 * Được giữ lại để dễ mở rộng sau này (logging, locale, v.v.).
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}
