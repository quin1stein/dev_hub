import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/utils/prisma";
import { FormData } from "@/types/types";
import slugify from "slugify";

const supabase = await createClient();

export const resolvers = {
  Mutation: {
    createPost: async (
      _: unknown,
      { title, content, focusAreas }: FormData
    ) => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) {
        throw new Error("Must be authenticated!");
      }
      const slugBase = slugify(title, { lower: true, strict: true });
      const uniqueIdSlug = Date.now().toString(36); //base 36 string
      const slugPost = `${slugBase}-${uniqueIdSlug}`;

      return await prisma.post.create({
        data: {
          title: title,
          content: content,
          slug: slugPost,
          user: {
            connect: { id: user.id },
          },
          focusAreas: {
            connectOrCreate: focusAreas.map((focus) => ({
              where: { name: focus.name },
              create: { name: focus.name, label: focus.label },
            })),
          },
        },
      });
    }, // end of createPost() mutation
  },
};
