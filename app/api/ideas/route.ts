import { NextRequest, NextResponse } from "next/server";
import { ideaFilterSchema } from "@/lib/validations/idea";
import { MOCK_IDEAS } from "@/lib/constants";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filters = ideaFilterSchema.safeParse({
      search: searchParams.get("search") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      sort: searchParams.get("sort") ?? undefined,
    });

    if (!filters.success) {
      return NextResponse.json(
        { error: "Invalid filters", details: filters.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // TODO: Query database with filters
    return NextResponse.json({ ideas: MOCK_IDEAS, total: MOCK_IDEAS.length }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    // TODO: Validate with ideaSchema and save to database
    return NextResponse.json({ message: "Idea created", idea: body }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
