"use client";
import { useForm } from "react-hook-form";
import { SignupFormData } from "@/types/types";
import { login } from "../actions";

export const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>();

  async function logIn(data: SignupFormData) {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      await login(formData);
    } catch (e: any) {
      console.error("An error has occured", e.message);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(logIn)}>
        <input
          type="text"
          {...register("email", { required: "Field required!" })}
        />
        <input
          type="text"
          {...register("password", {
            required: "Field Required!",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
              message: "Invalid email address",
            },
          })}
        />
      </form>
    </>
  );
};
