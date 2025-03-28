// For the signup form data
// input
export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// For focus areas with name and label
// input
export interface FocusAreaOption {
  name: string;
  label: string;
}

// For the post creation form
export interface FormData {
  title: string;
  content: string;
  focusAreas: FocusAreaOption[];
}

// User type, assuming minimal details
export type User = {
  id: string;
  profileSlug: string;
  role: string;
  name: string;
  email: string;
  posts?: Posts[]; // A user can have multiple posts
  comments?: Comment[]; // A user can have multiple comments
};

// Comment type with association to Post
export type Comment = {
  id: string;
  content: string;
  user: User;
  post: Posts;
};

// Vote type with association to User
export type Vote = {
  id: string;
  user: User;
  value: 1 | -1; // Could be 1 for upvote, -1 for downvote
};

// Post type with associations to User, Comments, and FocusAreas
export type Posts = {
  id: string;
  slug: string;
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
