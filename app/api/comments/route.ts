import { commentSchema } from "@/services/validations/comment";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = commentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid comment data." },
        { status: 400 },
      );
    }

    // Replace with real persistence when a database is connected.
    return NextResponse.json({ message: "Comment submitted successfully." });
  } catch {
    return NextResponse.json(
      { message: "Failed to submit comment. Please try again." },
      { status: 500 },
    );
  }
}
