"use client";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/lib/contexts/userContext";
import { useState } from "react";
import { DropdownMenuDemo } from "../dropdown-menu";
export const NavHome = () => {
  const user = useUser();
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <nav className="flex justify-evenly items-center w-full h-[10vh] shadow-xl border-b-2">
      {/* logo of the website that redirects user to the /home route */}
      <Link
        href={"/home"}
        className="flex items-center h-full space-x-2 w-[10%] "
      >
        <Image
          className="h-3/5 w-[60px]"
          width={500}
          height={500}
          src={"/brain-cog.png"}
          alt="logo"
        />
        <h1 className="font-bold text-lg">DevHub</h1>
      </Link>
      {/* navigations */}
      <section>
        <ul className="flex items-center space-x-7">
          {[
            ["/create", "Create"],
            ["/people", "People"],
            ["/find", "Find"],
          ].map(([href, content], index) => {
            return (
              <li key={index} className="hover:underline list-disc">
                <Link href={href}>{content}</Link>
              </li>
            );
          })}
        </ul>
      </section>
      {/* profile of the user */}
      <article className=" h-full justify-evenly flex items-center w-[17em]">
        {/* <Image
          className="cursor-pointer transition-all duration-300 h-[75%] rounded-md w-[50%] bg-black hover:bg-amber-300"
          src={"/rawprofile.svg"}
          width={500}
          height={500}
          alt="profile"
        /> */}
        <DropdownMenuDemo name={user.name} link={user.profileSlug} />
        <h1 className="font-bold">{user.name}</h1>
      </article>
    </nav>
  );
};
