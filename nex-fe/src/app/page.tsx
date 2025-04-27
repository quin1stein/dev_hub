"use client";
import Nav from "@/components/custom/nav";
import Hero from "@/components/custom/hero";
import Footer from "@/components/custom/footer";
import { UserProvider } from "@/lib/contexts/userContext";
export default function Home() {
  return (
    <>
      <UserProvider>
        <Nav />
        <Hero />
        <Footer />
      </UserProvider>
    </>
  );
}
