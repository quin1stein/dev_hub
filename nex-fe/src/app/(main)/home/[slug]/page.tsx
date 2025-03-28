"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Posts } from "@/lib/types/types";
import { AsideRightHome } from "@/components/custom/main/aside-right-home";

const Page = () => {
  const { slug } = useParams();

  const {
    data: post,
    isLoading,
    error: errorFound,
  } = useQuery<Posts, Error>({
    queryKey: ["post", slug],
    queryFn: async () => {
      const response = await fetch("/api/graphql/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query GetSpecificPost($slug: String!) {
              getSpecificPost(slug: $slug) {
                id
                content
                title
                slug
                focusAreas {
                  label
                  name
                }
                user {
                  name
                  role
                }
              }
            }
          `,
          variables: { slug: slug },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      return result.data.getSpecificPost;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (errorFound) return <p>Error loading post: {errorFound.message}</p>;
  console.log(post);
  return (
    <>
      <main className="p-4 space-x-4 h-[80vh]">
        <section className="flex-grow bg-white p-6 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold mb-2">{post?.title}</h1>
          <div className="text-gray-600 mb-4">
            <span>
              by {post?.user.name} | Role: {post?.user.role}
            </span>
          </div>
          <article className="text-gray-800 leading-relaxed mb-6">
            {post?.content}
          </article>
          <div className="flex gap-2 mt-4">
            {post?.focusAreas.map((area) => (
              <span
                key={area.name}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm"
              >
                {area.label}
              </span>
            ))}
          </div>
        </section>
      </main>{" "}
      <AsideRightHome />
    </>
  );
};

export default Page;
