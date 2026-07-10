import { z } from "zod";

export const commentSchema = z.object({
    comment: z.string().min(1,"Comment is required").max(200,"Comment must be less than 200 characters"),
}).refine((data) => {
    return data.comment.length >= 1 && data.comment.length <= 200;
}, {
    message: "Comment must be between 1 and 200 characters",
    path: ["comment"],
});

export type CommentSchema = z.infer<typeof commentSchema>;