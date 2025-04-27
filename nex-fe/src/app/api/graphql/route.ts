"use server";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolver";
import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { Context } from "@/lib/types/types";
import { prisma } from "@/utils/prisma";
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== "production",
  csrfPrevention: true,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest): Promise<Context> => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    const user = data.user && !error ? data.user : null;

    const fetchUser: { role: string } | null = await prisma.user.findUnique({
      where: { id: user?.id },
      select: {
        role: true,
      },
    });

    return {
      req,
      user: user
        ? { id: user.id, email: user.email, role: fetchUser?.role }
        : null,
      isAuthenticated: !!user,
    };
  },
});
export { handler as GET, handler as POST };
