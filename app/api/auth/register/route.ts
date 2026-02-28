import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sanitizeObject } from "@/lib/security/sanitize";
import { AUTH_COOKIE_MAX_AGE } from "@/lib/constants";

const registerBodySchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const sanitized = sanitizeObject(body);
    const result = registerBodySchema.safeParse(sanitized);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // TODO: Create user in database (hash password with bcrypt)
    const response = NextResponse.json(
      { message: "Registration successful", user: { email: result.data.email, name: result.data.name } },
      { status: 201 }
    );

    response.cookies.set("auth-token", "mock-jwt-token", {
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
