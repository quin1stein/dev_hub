"use client";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export function CommentForm({ id, slug }: { id: number; slug: string }) {
  type Comment = {
    content: string;
  };
  const queryClient = useQueryClient();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Comment>();

  const mutation = useMutation({
    mutationFn: async (data: Comment) => {
      const response = await fetch("/api/graphql/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `mutation Mutation($content: String!, $postId: Int!) {
            createComment(content: $content, postId: $postId) {
              content
              post {
                id
              }
            }
          }`,
          variables: {
            content: data.content,
            postId: id,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("An error has occurred");
      }

      const result = await response.json();

      if (result.errors) {
        throw new Error("GraphQL Error: " + result.errors[0]?.message);
      }

      return result.data.createComment;
    },
    onSuccess: () => {
      toast("Comment successfully created", {
        description: `Your comment has been added to post ID.`,
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });
      queryClient.invalidateQueries({ queryKey: ["post", slug] });
      reset();
    },
    onError: (error) => {
      toast("Comment failed to publish", {
        description: error.message || "Something went wrong.",
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });
    },
  });

  async function onSubmit(comment: Comment) {
    mutation.mutate(comment);
  }

  return (
    <main className="absolute bottom-0 left-[30%]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-x-2">
        <input
          className="p-2 border-black/20 focus:border-black border-2 rounded-md"
          type="text"
          {...register("content", {
            required: "Can't comment without entering any character.",
          })}
          placeholder="Enter a comment"
        />
        <button
          className="cursor-pointer p-2 rounded-md border-2 bg-black text-white"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </form>
    </main>
  );
}
