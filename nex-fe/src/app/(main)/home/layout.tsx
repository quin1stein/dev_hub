import { Metadata } from "next";
import { NavHome } from "@/components/custom/main/nav-home";
import AsideHome from "@/components/custom/main/aside-home";
export const metadata: Metadata = { title: "Home | DevHub" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavHome />
      <main className="flex items-center justify-between">
        <AsideHome />
        {children}
      </main>
    </>
  );
}
