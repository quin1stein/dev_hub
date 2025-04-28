import { NextRequest } from "next/server";

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FocusAreaOption {
  name: string;
  label: string;
}

export interface FormData {
  title: string;
  content: string;
  focusAreas: FocusAreaOption[];
}

export type User = {
  id: string;
  profileSlug: string;
  role: Role;
  name: string;
  email: string;
  posts?: Posts[];
  comments?: Comment[];
  createdAt: number;
  updatedAt: number;
};

export type Comment = {
  id: number;
  content: string;
  user: User;
  post: Posts;
  createdAt: string;
};

export type Vote = {
  id: string;
  user: User;
  value: 1 | -1;
};

export type Posts = {
  id: number;
  slug: string;
  createdAt: string;
  title: string;
  content: string;
  focusAreas: FocusAreaOption[];
  user: User;
  comments: Comment[];
  votes: Vote[];
};

export type PaginatedPost = {
  posts: Posts[];
  nextCursor: string | null;
};

enum Role {
  user,
  moderator,
  editor,
  contributor,
  admin,
}
export type Context = {
  req: NextRequest;
  user: {
    id: string;
    email: string | undefined;
    role: string | undefined;
  } | null;
  isAuthenticated: boolean;
};

export type PostResponse = {
  post: Posts;
  isOwnComment: boolean;
};
