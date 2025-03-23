"use client";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { FormData } from "@/lib/types/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
const focusAreaOptions: { name: string; label: string }[] = [
  { name: "AI", label: "AI" },
  { name: "Web Development", label: "Web Development" },
  { name: "Mobile Development", label: "Mobile Development" },
  { name: "Data Science", label: "Data Science" },
  { name: "Conversation", label: "Conversation" },
];

export default function FormsPost() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  // use mutation fn to send data to server
  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch("/api/graphql/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation CreatePost($title: String!, $content: String!, $focusAreas: [FocusAreaInput!]!) {
              createPost(title: $title, content: $content, focusAreas: $focusAreas) {
                title
                content
                focusAreas {
                  name
                  label
                }
              }
            }
          `,
          variables: {
            title: data.title,
            content: data.content,
            focusAreas: data.focusAreas.map((focus) => ({
              name: focus.name,
              label: focus.label,
            })),
          },
        }),
      });

      if (!response.ok) {
        console.error("Network error:", response.statusText);
        throw new Error("Failed to create a post");
      }

      const result = await response.json();

      if (result.errors) {
        console.error("GraphQL error:", result.errors);
      }

      return result.data.createPost;
    },
    onSuccess: () => {
      toast("Post successfully created.", {
        description: "Test",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    },
    onError: (err) => {
      toast("Post Failed to Create.", {
        description: "Test",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      console.error("Error creating the post:", err.message);
    },
  });

  async function onSubmit(data: FormData) {
    mutation.mutate(data);
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-grow p-4 border-2 rounded-lg space-y-4 "
    >
      <h2 className="mb-4 font-bold">Create a post:</h2>
      {/* title input */}
      <label htmlFor="title">Title: </label>
      <input
        type="text"
        placeholder="Title of the post"
        className="w-full my-2 p-2 border rounded mb-2"
        {...register("title", {
          required: "This field is required",
          minLength: {
            value: 10,
            message: "title must at least have 10 characters",
          },
        })}
      />
      <p className="text-red-500 font-bold">
        {errors.title && errors.title.message}
      </p>
      {/* content of the post */}
      <label htmlFor="content">Content: </label>
      <input
        type="text"
        placeholder="Content of the post"
        className="w-full my-2 p-2 border rounded mb-2"
        {...register("content", {
          required: "Content of the post is required!",
          minLength: {
            value: 20,
            message: "Title must at least have 20 Characters",
          },
        })}
      />
      <p className="font-bold text-red-500">
        {errors.content && errors.content.message}
      </p>
      {/* focus areas options */}
      <label htmlFor="focusAreas">Focus Areas:</label>
      <Controller
        control={control}
        name="focusAreas"
        rules={{ required: "Post must at least have one Focus Area!" }}
        render={({ field }) => (
          <Select
            {...field}
            isMulti={true}
            options={focusAreaOptions}
            className="my-2 "
            placeholder="Select Focus Areas"
          />
        )}
      />
      <p className="font-bold text-red-500">
        {errors.focusAreas && errors.focusAreas.message}
      </p>
      <button
        type="submit"
        disabled={isSubmitting ? true : false}
        className="border-2 px-4 py-2 rounded-md cursor-pointer"
      >
        {isSubmitting ? "Posting" : "Post"}
      </button>
    </form>
  );
}
