"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { UserMetadata } from "@supabase/supabase-js";
import { User } from "@/lib/types/types";

const Page = () => {
  const { profileSlug } = useParams() as { profileSlug: string };

  const { data, isLoading, error } = useQuery<User>({
    queryKey: ["profileUser", profileSlug],
    queryFn: async () => {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
  query GetUserProfile($profileSlug: String!) {
  getUserProfileThruSlug(profileSlug: $profileSlug) {
    name
    role
    createdAt
    updatedAt
    posts {
      title
      slug
      content
      createdAt
      focusAreas {
        label
        name
      }
    }
  }
}
`,
          variables: { profileSlug: profileSlug },
        }),
      });

      const result = await response.json();
      console.log("GRAPHQL RESULT:", result);
      if (result.errors) throw new Error(result.errors[0].message);
      return result.data.getUserProfileThruSlug;
    },
  });

  if (isLoading) return <p className="text-center py-6">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 py-6">
        Failed to load user profile.
      </p>
    );

  return (
    <main className="p-6 space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold">{data?.name}</h1>
        <p className="text-gray-600">{data?.role}</p>
        <p className="text-gray-500 text-sm">
          Joined{" "}
          {data?.createdAt &&
            formatDistanceToNow(new Date(Number(data.createdAt)), {
              addSuffix: true,
            })}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Posts</h2>
        <div className="space-y-6">
          {data?.posts?.length === 0 ? (
            <p className="text-gray-500">No posts yet.</p>
          ) : (
            data?.posts?.map((post: any) => (
              <Link
                key={post.slug}
                href={`/home/${post.slug}`}
                className="block p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-sm mb-2">
                  {post.createdAt &&
                    formatDistanceToNow(new Date(Number(post.createdAt)), {
                      addSuffix: true,
                      includeSeconds: true,
                    })}
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.focusAreas.map((fa: any) => (
                    <span
                      key={fa.name}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md"
                    >
                      {fa.label}
                    </span>
                  ))}
                </div>
                <p className="line-clamp-2">{post.content}</p>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default Page;
