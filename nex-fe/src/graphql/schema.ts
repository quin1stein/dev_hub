import { gql } from "graphql-tag";

export const typeDefs = gql`
  enum UserRole {
    user
    admin
  }
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
    createdAt: String!
    user: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    content: String!
    post: Post!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    profileSlug: String!
    role: UserRole!
    posts: [Post!]!
    createdAt: String!
    updatedAt: String!
  }
  input FocusAreaInput {
    name: String!
    label: String!
  }

  type PaginatedPost {
    posts: [Post!]!
    nextCursor: String
    hasNextPage: Boolean
  }

  type Query {
    getPosts: [Post!]!
    getSpecificPost(slug: String!): Post!
    getUserInfo: User!
    getUserProfileThruSlug(profileSlug: String!): User!
  }

  type Mutation {
    createPost(
      title: String!
      content: String!
      focusAreas: [FocusAreaInput!]!
    ): Post!
    createComment(content: String!, postId: Int!): Comment
  }
`;
