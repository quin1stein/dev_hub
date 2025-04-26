import { GraphQLError } from "graphql";
import Error from "next/error";
import { type User } from "@supabase/supabase-js";
export const requireAuth = (user: User | null, err: Error) => {
  if (!user || err) {
    throw new GraphQLError("User not authenticated!", {
      extensions: { code: "UNATHORIZED", status: { code: 401 } },
    });
  }
};

export const requireRole = (
  user: unknown,
  role: "user" | "admin" | "contributor"
) => {
  if (!user) {
    throw new GraphQLError("User not authenticated", {
      extensions: { code: "UNAUTHORIZED", http: { status: 401 } },
    });
  }
  if (user !== role) {
    throw new GraphQLError("Forbidden: Insufficient permissions", {
      extensions: { code: "FORBIDDEN", http: { status: 403 } },
    });
  }
};
