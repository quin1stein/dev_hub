"use client";
import Image from "next/image";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Posts } from "@/lib/types/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
export const HeroHome = () => {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<Posts[], Error>({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch("/api/graphql/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query GetPosts {
                      getPosts { 
                        id
                        title
                        slug
                        content
                        user {
                          name
                        }
                        focusAreas {
                          name
                          label
                        }
                      }
                    }`,
        }),
      });

      if (!response.ok) {
        throw new Error("Network error");
      }

      const result = await response.json();

      if (result.errors) {
        throw new Error("GraphQL Error: " + result.errors[0]?.message);
      }

      return result.data.getPosts;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to fetch posts.</div>;

  return (
    <main className="flex-grow h-[90vh] p-4">
      <section className="h-full overflow-y-auto space-y-4">
        {posts ? (
          posts?.map((post, index) => {
            console.log(post);
            return (
              <Link
                href={`/home/${post.slug}`}
                key={index}
                className="flex items-start p-4 border-2 rounded-lg gap-4"
              >
                <Image
                  src="/rawprofile.svg"
                  alt="Profile Image"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="flex-grow">
                  <h2 className="font-semibold">{post.user.name}</h2>
                  <p className="text-lg">{post.title}</p>
                  <p>{post.content}</p>
                  <div className="flex items-center justify-start gap-2 mt-2">
                    <FaArrowUp className="cursor-pointer hover:text-green-500" />
                    <span>12</span>
                    <FaArrowDown className="cursor-pointer hover:text-red-500" />
                    <span>14</span>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <p>No posts</p>
        )}
      </section>
    </main>
  );
};
