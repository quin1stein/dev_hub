import { graphql } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "../graphql/schema";
import { resolvers } from "../graphql/resolver";
import { mockPrisma } from "../__test__/mocks/mock"; // your mocked Prisma client

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

describe("Query.getPosts", () => {
  it("returns a list of posts for authenticated user", async () => {
    const mockPosts = [
      {
        id: "1",
        title: "Test Post",
        slug: "test-post",
        content: "This is a test post.",
        createdAt: new Date().toISOString(),
        user: { name: "Test User" },
        focusAreas: [{ name: "web", label: "Web Dev" }],
      },
    ];

    mockPrisma.post.findMany.mockResolvedValue(mockPosts);

    const query = `
      query {
        getPosts {
          id
          title
          slug
          content
          createdAt
          user { name }
          focusAreas { name label }
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query,
      contextValue: {
        isAuthenticated: true,
        prisma: mockPrisma,
        user: { id: "1" },
      },
    });

    const data = result.data as {
      getPosts: {
        id: string;
        title: string;
        slug: string;
        content: string;
        createdAt: string;
        user: { name: string };
        focusAreas: { name: string; label: string }[];
      }[];
    };
    console.log(result.errors);

    expect(data.getPosts[0].title).toBe("Test Post");
  });
});
