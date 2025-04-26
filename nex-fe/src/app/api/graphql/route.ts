import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolver";
import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== "production",
  csrfPrevention: true,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    return {
      req,
      user: data.user || !error ? data.user : null,
    };
  },
});
export { handler as GET, handler as POST };
