import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_MAX_AGE } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get("refresh-token");
    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    // TODO: Verify refresh token and issue new access token
    const response = NextResponse.json({ message: "Token refreshed" }, { status: 200 });

    response.cookies.set("auth-token", "new-mock-jwt-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: AUTH_COOKIE_MAX_AGE,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
