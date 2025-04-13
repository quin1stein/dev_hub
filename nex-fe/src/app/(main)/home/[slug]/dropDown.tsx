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
function DropDownPost({
  authorLink,
  postSlug,
}: {
  authorLink: string;
  postSlug: string;
}) {
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
                Visit Author Page
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Post</DropdownMenuItem>
            <DropdownMenuItem>Delete Post</DropdownMenuItem>
            <DropdownMenuItem>Report Post</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={copyLink}>Copy Link</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export { DropDownPost };
