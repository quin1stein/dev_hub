import { gql } from "graphql-tag";

export const typeDefs = gql`
  type FocusArea {
    id: ID!
    name: String!
    label: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    slug: String!
    focusAreas: [FocusArea!]!
  }

  input FocusAreaInput {
    name: String!
    label: String!
  }

  type Query {
    getPosts: [Post!]!
  }

  type Mutation {
    createPost(
      title: String!
      content: String!
      focusAreas: [FocusAreaInput!]!
    ): Post!
  }
`;
