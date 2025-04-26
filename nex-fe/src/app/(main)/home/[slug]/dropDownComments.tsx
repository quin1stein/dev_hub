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
import { BsThreeDots } from "react-icons/bs";
export const DropDownComment = () => {
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
            <DropdownMenuItem>Report Comment</DropdownMenuItem>
            <DropdownMenuItem>Edit Comment</DropdownMenuItem>
            <DropdownMenuItem>Delete Comment</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
