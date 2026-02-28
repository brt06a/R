import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// NOTE: This in-memory rate limit map does not persist across serverless
// function invocations or multiple instances. Use Redis/Upstash in production.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimit(ip: string, limit: number = 60, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) return false;
  record.count++;
  return true;
}

export function middleware(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

  if (request.nextUrl.pathname.startsWith("/api/")) {
    const apiLimit = request.nextUrl.pathname.startsWith("/api/auth/") ? 10 : 60;
    if (!rateLimit(ip, apiLimit)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
  }

  const protectedRoutes = ["/dashboard", "/submit"];
  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    const token = request.cookies.get("auth-token");
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*", "/submit/:path*"],
};
