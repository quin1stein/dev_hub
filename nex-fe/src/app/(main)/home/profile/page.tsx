"use client";
import { useUser } from "@/lib/contexts/userContext";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
const Page = () => {
  const user = useUser();

  if (!user) {
    return (
      <main className="h-full w-full flex items-center justify-center">
        <p className="text-gray-500">User not found 404</p>
      </main>
    );
  }

  return (
    <main className="h-full w-full p-6">
      <section className="max-w-3xl mx-auto shadow-md rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Image
            src="/rawprofile.svg"
            alt="Profile"
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <span className="font-medium">Role:</span> {user.role}
          </div>
          <div>
            <span className="font-medium">Profile Slug:</span>{" "}
            <Link
              href={`/profile/${user.profileSlug}`}
              className="text-blue-600 underline"
            >
              Profile Link
            </Link>
          </div>
          <div>
            <span className="font-medium">Joined:</span>{" "}
            {format(new Date(Number(user.createdAt)), "dd MM, yyyy")}
          </div>
          <div>
            <span className="font-medium">Last Updated:</span>{" "}
            {format(new Date(Number(user.updatedAt)), "dd MM, yyyy")}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
