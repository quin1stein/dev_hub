import { SkeletonCard } from "@/components/custom/skeleton";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<SkeletonCard />}>{children}</Suspense>
    </>
  );
}
