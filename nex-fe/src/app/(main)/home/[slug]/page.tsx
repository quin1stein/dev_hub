"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Posts } from "@/lib/types/types";
import { AsideRightHome } from "@/components/custom/main/aside-right-home";
import { CommentForm } from "./comment-form";
const Page = () => {
  const { slug } = useParams() as { slug: string };

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
          query: `query GetSpecificPost($slug: String!) {
                getSpecificPost(slug: $slug) {
                  content
                  title
                  slug
                  id  
                  createdAt
                  comments {
                    user {
                      name
                      profileSlug
                    }
                    content
                    createdAt
                    id
                  }
                  focusAreas {
                    name
                    label
                  }
                  user {
                    name
                    profileSlug
                    role
                  }

                }
              }`,
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
  console.log(post);
  if (isLoading) return <p>Loading...</p>;
  if (errorFound) return <p>Error loading post: {errorFound.message}</p>;
  console.log(post);
  return (
    <>
      <main className="p-4 space-x-4 h-[90vh] relative">
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
        {/* Comment section */}
        <section>
          {post?.comments.length ? (
            post.comments.map((comment, index) => {
              return (
                <article key={index}>
                  {comment.user.name} {comment.content}
                </article>
              );
            })
          ) : (
            <p className="text-center">No Comments yet</p>
          )}
        </section>
        {post && <CommentForm id={post.id} slug={slug} />}
      </main>{" "}
      <AsideRightHome />
    </>
  );
};

export default Page;
