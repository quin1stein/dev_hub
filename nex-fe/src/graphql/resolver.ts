import { GraphQLError } from "graphql";
import { prisma } from "@/utils/prisma";
import slugify from "slugify";
import { FocusAreaOption, Context } from "@/lib/types/types";

export const resolvers = {
  Query: {
    getPosts: async (_: unknown, _args: unknown, context: Context) => {
      if (!context.isAuthenticated) {
        throw new GraphQLError("Must be authenticated", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      try {
        const posts = await prisma.post.findMany({
          select: {
            id: true,
            title: true,
            slug: true,
            content: true,
            createdAt: true,
            user: { select: { name: true } },
            focusAreas: { select: { name: true, label: true } },
          },
        });

        return posts;
      } catch (err: unknown) {
        console.error("Error fetching posts:", err);
        throw new GraphQLError("Failed to fetch posts", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },

    getSpecificPost: async (
      _: unknown,
      args: { slug: string },
      context: Context
    ) => {
      if (!context.isAuthenticated) {
        throw new GraphQLError("Not authenticated.", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      try {
        const post = await prisma.post.findUnique({
          where: { slug: args.slug },
          select: {
            id: true,
            title: true,
            content: true,
            slug: true,
            createdAt: true,
            comments: {
              select: {
                user: { select: { name: true, profileSlug: true } },
                content: true,
                createdAt: true,
                id: true,
              },
            },
            focusAreas: { select: { name: true, label: true } },
            user: {
              select: { name: true, profileSlug: true, role: true, id: true },
            },
          },
        });

        if (!post) {
          return null;
        }

        return { post, isOwnComment: context.user?.id === post.user.id };
      } catch (err: unknown) {
        console.error("Error fetching specific post:", err);
        throw new GraphQLError("Failed to fetch post", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },

    getUserInfo: async (_: unknown, _args: unknown, context: Context) => {
      if (!context.isAuthenticated) {
        throw new GraphQLError("User not authenticated", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      try {
        const userProfile = await prisma.user.findUnique({
          where: { id: context.user?.id },
          select: {
            name: true,
            email: true,
            createdAt: true,
            role: true,
            updatedAt: true,
            profileSlug: true,
          },
        });

        if (!userProfile) {
          throw new GraphQLError("User profile not found", {
            extensions: { code: "USER_NOT_FOUND" },
          });
        }

        return userProfile;
      } catch (err: unknown) {
        console.error("Error fetching user profile:", err);
        throw new GraphQLError("Failed to fetch user profile", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },

    getUserProfileThruSlug: async (
      _: unknown,
      args: { profileSlug: string },
      context: Context
    ) => {
      if (!context.isAuthenticated) {
        throw new GraphQLError("User not authenticated", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      try {
        const user = await prisma.user.findUnique({
          where: { profileSlug: args.profileSlug },
          select: {
            name: true,
            updatedAt: true,
            role: true,
            createdAt: true,
            posts: {
              select: {
                title: true,
                slug: true,
                createdAt: true,
                content: true,
                focusAreas: { select: { name: true, label: true } },
              },
            },
          },
        });

        return user;
      } catch (err: unknown) {
        console.error("Error fetching user through profile slug:", err);
        throw new GraphQLError("Failed to fetch user by profile slug", {
          extensions: { code: "USER_NOT_FOUND" },
        });
      }
    },
  },

  Mutation: {
    createPost: async (
      _: unknown,
      args: { title: string; content: string; focusAreas: FocusAreaOption[] },
      context: Context
    ) => {
      if (!context.isAuthenticated) {
        throw new GraphQLError("User not authenticated", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      const existingUser = await prisma.user.findUnique({
        where: { id: context.user?.id },
      });

      if (!existingUser) {
        throw new GraphQLError("User not found", {
          extensions: { code: "USER_NOT_FOUND" },
        });
      }

      const slugBase = slugify(args.title, {
        lower: true,
        strict: true,
        trim: true,
      });
      const slugPost = `${slugBase}-${Date.now().toString(36)}`;

      try {
        const post = await prisma.post.create({
          data: {
            title: args.title,
            content: args.content,
            slug: slugPost,
            user: { connect: { id: context.user?.id } },
            focusAreas: {
              connectOrCreate: args.focusAreas.map((focus) => ({
                where: { name: focus.name },
                create: { name: focus.name, label: focus.label },
              })),
            },
          },
          include: { focusAreas: true },
        });

        return post;
      } catch (err: unknown) {
        console.error("Error creating post:", err);
        throw new GraphQLError("Failed to create post", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },

    createComment: async (
      _: unknown,
      args: { content: string; postId: number },
      context: Context
    ) => {
      if (!context.isAuthenticated) {
        throw new GraphQLError("Unauthorized: Please log in to comment.", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      try {
        const comment = await prisma.comment.create({
          data: {
            content: args.content,
            user: { connect: { id: context.user?.id } },
            post: { connect: { id: args.postId } },
          },
          include: { post: true },
        });

        return comment;
      } catch (err: unknown) {
        console.error("Error creating comment:", err);
        throw new GraphQLError("Failed to create comment", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },
    deletePost: async (
      _: unknown,
      args: { postId: number },
      context: Context
    ) => {
      if (!context.isAuthenticated) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      try {
        const post = await prisma.post.findUnique({
          where: { id: args.postId },
        });
        if (!post) {
          return { message: "Post not found", isSuccess: false };
        }

        await prisma.post.delete({
          where: { id: args.postId },
        });

        return { message: "Post successfully deleted", isSuccess: true };
      } catch (err: unknown) {
        throw new GraphQLError("Internal Server Error", {
          extensions: { code: "INTERNAL_SERVER_ERROR", http: { status: 500 } },
        });
      }
    },
  },
};
