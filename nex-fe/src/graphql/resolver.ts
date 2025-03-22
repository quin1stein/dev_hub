import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/utils/prisma";
import slugify from "slugify";
import { FocusAreaOption } from "@/types/types";

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
    },
  },
  Mutation: {
    createPost: async (
      _: unknown,
      args: { title: string; content: string; focusAreas: FocusAreaOption[] }
    ) => {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();

      if (error || !data) {
        throw new Error("Authentication failed! Please log in.");
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
      const slugPost = `${slugBase}-${Date.now().toString(36)}`;

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
  },
};
