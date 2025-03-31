"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Posts } from "@/lib/types/types";
import { AsideRightHome } from "@/components/custom/main/aside-right-home";
import { CommentForm } from "./comment-form";
import { format } from "date-fns";
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
  if (errorFound) return <p>Error loading post: 404 Post not found</p>;
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
        {/* Comment section */}
        <section className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          <div className="no-scrollbar space-y-4 h-[40vh] overflow-y-auto">
            {post?.comments.length ? (
              post.comments.map((comment) => {
                console.log(comment.createdAt);
                return (
                  <div
                    key={comment.id}
                    className="border p-4 rounded-lg shadow-sm"
                  >
                    <div className="mb-2">
                      <span className="font-semibold">{comment.user.name}</span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {format(
                        new Date(Number(comment.createdAt)),
                        "dd MM, yyyy"
                      )}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-600">No comments yet.</p>
            )}
          </div>
        </section>

        {post && <CommentForm id={Number(post.id)} slug={slug} />}
      </main>{" "}
      <AsideRightHome />
    </>
  );
};

export default Page;
