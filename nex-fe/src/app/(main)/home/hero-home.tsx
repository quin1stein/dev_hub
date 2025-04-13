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

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to fetch posts.
      </div>
    );

  return (
    <main className="flex-grow h-[90vh] p-6">
      <section className="h-full overflow-y-auto space-y-6">
        {posts ? (
          posts.map((post) => (
            <Link
              href={`/home/${post.slug}`}
              key={post.id}
              className="flex p-6 border rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Image
                src="/rawprofile.svg"
                alt="Profile Image"
                width={50}
                height={50}
                className="rounded-full self-start"
              />
              <div className="flex-grow ml-4">
                <h2 className="font-semibold  text-lg">{post.user.name}</h2>
                <p className="text-xl font-bold mt-1">{post.title}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.focusAreas.map((focus) => (
                    <span
                      key={focus.name}
                      className="px-3 py-1 text-sm rounded-md "
                    >
                      {focus.label}
                    </span>
                  ))}
                </div>
                <p className=" mt-3 line-clamp-2">{post.content}</p>
                <div className="flex items-center gap-3 mt-4 ">
                  <button className="flex items-center space-x-1 hover:text-green-500">
                    <FaArrowUp className="cursor-pointer" />
                    <span>12</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-red-500">
                    <FaArrowDown className="cursor-pointer" />
                    <span>14</span>
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-600">No posts available.</p>
        )}
      </section>
    </main>
  );
};
