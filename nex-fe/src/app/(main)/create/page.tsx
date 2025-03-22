"use client";
import AsideHome from "@/components/custom/main/aside-home";
import { NavHome } from "@/components/custom/main/nav-home";
import Rules from "./rules";
import FormsPost from "./forms";
export default function Page() {
  return (
    <>
      <NavHome />
      <main className="flex justify-between items-start w-full h-[90vh] gap-4">
        <AsideHome />
        {/* forms post component is the form to create a post */}
        <FormsPost />
        <Rules />
      </main>
    </>
  );
}
