import { Metadata } from "next";
import { NavHome } from "@/components/custom/main/nav-home";
export const metadata: Metadata = { title: "Home | DevHub" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavHome />
      {children}
    </>
  );
}
