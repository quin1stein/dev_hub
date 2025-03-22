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
    user: User!
  }

  type Comment {
    id: ID!
    content: String!
    post: Post!
    user: User!
    createdAt: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: UserRole!
    posts: [Post!]!
  }
  input FocusAreaInput {
    name: String!
    label: String!
  }

  type Query {
    getPosts: [Post!]! # used to fetch all posts
    getPost(slug: String!): Post! # used to fetch a specfic post through slug
    getUserInfo: User! # used to fetch logged-in user's data
  }

  type Mutation {
    createPost(
      title: String!
      content: String!
      focusAreas: [FocusAreaInput!]!
    ): Post! # used to create post in /create route
  }
`;
