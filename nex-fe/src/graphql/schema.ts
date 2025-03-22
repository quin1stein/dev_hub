export const typeDefs = `#graphql
  type Post {
    id: ID!
    title: String!
    content: String!
    focusAreas: [FocusArea!]!
  }

  type FocusArea {
    id: ID!
    name: String!
    label: String!
  }

  type Query {
    getPosts: [Post!]!
  }

  type Mutation {
    createPost(title: String!, content: String!, focusAreas: [String!]!): Post!
  }
`;
