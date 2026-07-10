import { CommentSchema } from "@/services/validations/comment";

export async function submitComment(data: CommentSchema): Promise<void> {
  const response = await fetch("/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let message = "Failed to submit comment. Please try again.";

    try {
      const body = (await response.json()) as { message?: string };
      if (typeof body.message === "string") message = body.message;
    } catch {
      // Keep default message when response body is not JSON.
    }

    throw new Error(message);
  }
}
