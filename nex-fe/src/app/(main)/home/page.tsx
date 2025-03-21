import AsideHome from "@/components/custom/main/aside-home";
import { AsideRightHome } from "@/components/custom/main/aside-right-home";
import { HeroHome } from "@/components/custom/main/hero-home";
export default function Page() {
  return (
    <>
      <main className="flex justify-between items-center">
        {" "}
        <AsideHome />
        <HeroHome />
        <AsideRightHome />
      </main>
    </>
  );
}
