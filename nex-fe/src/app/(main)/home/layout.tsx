"use client";
import { NavHome } from "@/components/custom/main/nav-home";
import AsideHome from "@/components/custom/main/aside-home";
import { UserProvider } from "@/lib/contexts/userContext";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserProvider>
        <NavHome />{" "}
        <main className="flex items-center justify-between">
          <AsideHome />
          {children}
        </main>
      </UserProvider>
    </>
  );
}
