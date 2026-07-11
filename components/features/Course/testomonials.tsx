"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema, CommentSchema } from "@/services/validations/comment";
import { submitComment } from "@/services/comments";
import TextBoxInput from "@/components/ui/form/text-box-input";
import SubmitButton from "@/components/ui/form/submit-button";
import {useCommentsStore,} from "@/stores/comments-store";
import { formatCommentDate } from "@/utils/functions";
import { ArrowIcon } from "@/components/ui/icons";
const AVATARS = ["/images/person-1.jpg", "/images/person-2.jpg"] as const;

export default function Testomonials() {
  const comments = useCommentsStore((state) => state.comments);
  const addComment = useCommentsStore((state) => state.addComment);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
  } = useForm<CommentSchema>({
    defaultValues: {
      comment: "",
    },
    resolver: zodResolver(commentSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: CommentSchema) => {
    clearErrors("root");

    try {
      await submitComment(data);
      addComment(data.comment);
      reset({ comment: "" });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to submit comment. Please try again.";

      setError("root", { type: "submit", message });
    }
  };

  return (
    <div className="space-y-5"  >
      <h2 className="text-lg font-semibold">Comments</h2>

      <div className="flex flex-col items-stretch justify-center gap-8 divide-y-2 divide-gray-200">
        {comments.map((item, index) => (
          <div
            key={`${item.date}-${index}`}
            className="flex w-full items-start justify-center gap-4"
          >
            <Image
              className="h-20 w-20 shrink-0 rounded-full object-cover object-top"
              src={AVATARS[index % AVATARS.length]}
              alt={item.name}
              width={100}
              height={100}
            />
            <div className="w-full min-w-0 space-y-3">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="font-normal">{formatCommentDate(item.date)}</p>
              </div>
              <p className="wrap-break-word">{item.comment}</p>
            </div>
          </div>
        ))}
      </div>

      <form  className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="shadow-[16px_8px_40px_0px_rgba(0,0,0,0.10)] rounded-md p-2">
        <TextBoxInput
          label="Comment"
          placeHolder="Enter your comment"
          register={register}
          errors={errors}
          name="comment"
          showLabel={false}
        />
        </div>
        
        <SubmitButton
          isLoading={isSubmitting}
          text="Submit Review"
          disabled={isSubmitting}
          errors={errors}
          Icon={<ArrowIcon/>}
        />
      </form>
    </div>
  );
}
