"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
function DropDownPost({
  authorLink,
  postSlug,
  isOwnComment,
  postID,
}: {
  authorLink: string;
  postSlug: string;
  isOwnComment: boolean;
  postID: number;
}) {
  const route = useRouter();
  const copyLink = async () => {
    const postUrl = `${window.location.origin}/home/${postSlug}`;

    try {
      await navigator.clipboard.writeText(postUrl);
      toast("Successfully copied", {
        description: "Test",
        action: {
          label: "Undo",
          onClick: () => console.log("undo"),
        },
      });
    } catch (err: unknown) {
      toast("Failed to copy", {
        description: `Link: ${postUrl}`,
        action: {
          label: "Undo",
          onClick: () => console.log("undo"),
        },
      });
    }
  };

  const mutation = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: async (postID: number) => {
      const postid = parseInt(postID.toString(), 10);
      const response = await fetch("/api/graphql/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `mutation DeletePost($postId: Int!) {
          deletePost(postId: $postId) {
            isSuccess
            message
          }
        }`,
          variables: { postId: postid },
        }),
      });

      const result = await response.json();
      console.log("Response from server:", result);

      if (!response.ok) {
        throw new Error("Failed to delete Post");
      }

      return result.data.deletePost;
    },
    onError: (error) => {
      toast.error(
        `An error occurred while deleting the post: ${error.message}`
      );
    },
    onSuccess: () => {
      toast.success("Post successfully deleted");
      route.push("/");
    },
  });

  function deletePost(postId: number) {
    mutation.mutate(postId);
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"}>
            <BsThreeDots />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="left" align="start">
          <DropdownMenuLabel>Post info:</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href={`/home/profile/${authorLink}`}>
                Visit Author Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {isOwnComment && (
              <>
                <DropdownMenuItem>Edit Post</DropdownMenuItem>
                <DropdownMenuItem onClick={() => deletePost(postID)}>
                  <Button></Button>
                  Delete Post
                </DropdownMenuItem>
              </>
            )}
            {isOwnComment || <DropdownMenuItem>Report Post</DropdownMenuItem>}

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={copyLink}>Copy Link</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export { DropDownPost };
