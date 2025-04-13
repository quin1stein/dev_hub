import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { FaCode } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { ModeToggle } from "./toggle-mode";
import { logout } from "@/app/(auth)/actions";
import { TbSunMoon } from "react-icons/tb";

export function DropdownMenuDemo({
  name,
  link,
}: {
  name: string;
  link: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>{name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="bottom" align="start">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={link}>Profile</Link>
            <DropdownMenuShortcut>
              <CgProfile />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/home/posts/${name}`}>Your Posts</Link>
            <DropdownMenuShortcut>
              <FaCode />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ModeToggle />
            <DropdownMenuShortcut>
              <TbSunMoon />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={logout}>
            Log Out{" "}
            <DropdownMenuShortcut>
              <IoIosLogOut />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
