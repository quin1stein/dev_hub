import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/utils/prisma";
import slugify from "slugify";
import { FocusAreaOption } from "@/lib/types/types";
import { redirect } from "next/navigation";
import { GraphQLError } from "graphql";

export const resolvers = {
  Query: {
    getPosts: async () => {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();

      if (!data.user || error) {
        throw new Error("Must be authenticated");
      }
      try {
        const getPosts = await prisma.post.findMany({
          select: {
            id: true,
            title: true,
            slug: true,
            content: true,
            user: {
              select: {
                name: true,
              },
            },
            focusAreas: {
              select: {
                name: true,
                label: true,
              },
            },
          },
        });

        return getPosts;
      } catch (err: unknown) {
        console.error("An error has occured: " + err);
      }
    }, //get Posts[]
    getSpecificPost: async (_: unknown, args: { slug: string }) => {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();
      if (!data.user || error) {
        throw new Error("Not authenticated.");
      }

      try {
        const getSpecificPost = await prisma.post.findUnique({
          where: { slug: args.slug },
          select: {
            id: true,
            title: true,
            content: true,
            slug: true,
            createdAt: true,
            comments: {
              select: {
                user: {
                  select: { name: true, profileSlug: true },
                },
                content: true,
                createdAt: true,
                id: true,
              },
            },
            focusAreas: {
              select: {
                name: true,
                label: true,
              },
            },
            user: {
              select: {
                name: true,
                profileSlug: true,
                role: true,
              },
            },
          },
        });

        if (!getSpecificPost) {
          return null;
        }

        return getSpecificPost;
      } catch (err: unknown) {
        console.error("An error has occured: " + err);
      }
    }, // get a specific post through slug
    getUserInfo: async () => {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();

      if (!data || error) {
        throw new GraphQLError("User not authenticated", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      try {
        const getUserProfile = await prisma.user.findUnique({
          where: {
            id: data.user.id,
          },
          select: {
            name: true,
            email: true,
            createdAt: true,
            role: true,
            updatedAt: true,
            profileSlug: true,
          },
        });
        if (!getUserProfile) {
          redirect("/login");
        }

        return getUserProfile;
      } catch (err: unknown) {
        console.error("An error has occured: " + err);
      }
    }, // get user profile
  },
  Mutation: {
    createPost: async (
      _: unknown,
      args: { title: string; content: string; focusAreas: FocusAreaOption[] }
    ) => {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();

      if (error || !data) {
        throw new GraphQLError("User not authenticated", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      const existingUser = await prisma.user.findUnique({
        where: { id: data.user.id },
      });

      if (!existingUser) {
        throw new Error("User not found. Please log in.");
      }

      const slugBase = slugify(args.title, {
        lower: true,
        strict: true,
        trim: true,
      });
      const slugPost = `${slugBase}-${Date.now().toString(36)}-${Math.floor(
        Math.random() * 100
      )}`;

      try {
        const post = await prisma.post.create({
          data: {
            title: args.title,
            content: args.content,
            slug: slugPost,
            user: { connect: { id: data.user.id } },
            focusAreas: {
              connectOrCreate: args.focusAreas.map((focus) => ({
                where: { name: focus.name },
                create: { name: focus.name, label: focus.label },
              })),
            },
          },
          include: {
            focusAreas: true,
          },
        });

        return post;
      } catch (err: unknown) {
        console.error("Error creating post:", err);
        throw new Error("Failed to create post");
      }
    }, // end of createPost()
    createComment: async (
      _: unknown,
      args: { content: string; postId: number }
    ) => {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();

      if (!data.user || error) {
        throw new GraphQLError("Unauthorized: Please log in to comment.", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      try {
        const createComment = await prisma.comment.create({
          data: {
            content: args.content,
            user: { connect: { id: data.user.id } },
            post: { connect: { id: args.postId } },
          },
          include: {
            post: true,
          },
        });

        return createComment;
      } catch (err) {
        console.error("Database error:", err);
        throw new GraphQLError("Failed to create comment", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },
    // end of createComment
  },
};
