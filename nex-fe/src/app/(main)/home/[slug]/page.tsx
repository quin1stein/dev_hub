"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { PostResponse } from "@/lib/types/types";
import { AsideRightHome } from "@/components/custom/main/aside-right-home";
import { CommentForm } from "./comment-form";
import { formatDistanceToNow } from "date-fns";
import { DropDownPost } from "./dropDown";
import { DropDownComment } from "./dropDownComments";
import Link from "next/link";
const Page = () => {
  const { slug } = useParams() as { slug: string };

  const {
    data: post,
    isLoading,
    error: errorFound,
  } = useQuery<PostResponse, Error>({
    queryKey: ["post", slug],
    queryFn: async () => {
      const response = await fetch("/api/graphql/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query GetSpecificPost($slug: String!) {
              getSpecificPost(slug: $slug) {
                post {
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
                isOwnComment
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
      <main className="p-4 flex-grow space-x-4 h-[90vh] relative">
        <section className="flex-grow p-6 rounded-2xl shadow-lg">
          <section className="flex justify-between items-center">
            {" "}
            <h1 className="text-2xl font-bold mb-2">{post?.post.title} </h1>
            {post?.post.user.profileSlug && (
              <DropDownPost
                postID={post.post.id}
                isOwnComment={post.isOwnComment}
                authorLink={post.post.user.profileSlug}
                postSlug={slug}
              />
            )}{" "}
          </section>

          <div className="text-gray-600 mb-4">
            <span>
              by {post?.post.user.name} | Role: {post?.post.user.role}
            </span>
          </div>
          <article className=" leading-relaxed mb-6">
            {post?.post.content}
          </article>
          <div className="flex gap-2 mt-4">
            {post?.post.focusAreas.map((area) => (
              <span
                key={area.name}
                className="dark:bg-gray-300 dark:text-black px-2 py-1 rounded-md text-sm"
              >
                {area.label}
              </span>
            ))}
          </div>
        </section>
        {/* Comment section */}
        <section className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          <div
            className={`no-scrollbar ${
              post?.post.comments.length ? "border-b-4" : ""
            } space-y-4 h-[40vh] overflow-y-auto`}
          >
            {post?.post.comments.length ? (
              post.post.comments.map((comment, index) => {
                return (
                  <div key={index} className="border p-4 roundedalg shadow-sm">
                    <div className="mb-2 flex justify-between">
                      <Link
                        href={`/home/profile/${comment.user.profileSlug}`}
                        className="font-semibold hover:underline"
                      >
                        {comment.user.name}
                      </Link>
                      <DropDownComment commentID="" isOwnComment={true} />
                    </div>
                    <p>{comment.content}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDistanceToNow(
                        new Date(Number(comment.createdAt)),
                        {
                          addSuffix: true,
                          includeSeconds: true,
                        }
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

        {post && <CommentForm id={Number(post.post.id)} slug={slug} />}
      </main>{" "}
      <AsideRightHome />
    </>
  );
};

export default Page;
