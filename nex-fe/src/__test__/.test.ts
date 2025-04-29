import { graphql } from "graphql";
import { typeDefs } from "../graphql/schema";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "../graphql/resolver";
import { mockPrisma } from "../__test__/mocks/mock.ts";
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
test("Test", async () => {
  const query = `
    query {
      getPosts {
        id
        title
      }
    }
  `;

  const result = await graphql({
    schema,
    source: query,
    contextValue: { user: { id: "1" }, prisma: mockPrisma },
  });

  expect(result.errors).toBeUndefined();
});
