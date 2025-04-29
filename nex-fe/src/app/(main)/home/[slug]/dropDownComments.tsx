import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDots } from "react-icons/bs";
export const DropDownComment = ({
  commentID,
  isOwnComment,
}: {
  commentID: number;
  isOwnComment: boolean;
}) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"}>
            <BsThreeDots />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="left" align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              {isOwnComment || (
                <Button variant={"secondary"}>Report Comment</Button>
              )}
            </DropdownMenuItem>
            {isOwnComment && (
              <>
                <DropdownMenuItem>
                  <Button variant={"secondary"}>Edit Comment</Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button variant={"secondary"}>Delete Comment</Button>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
