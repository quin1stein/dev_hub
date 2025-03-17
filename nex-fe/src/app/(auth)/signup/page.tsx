"use client";
import { useForm } from "react-hook-form";
import { SignupFormData } from "@/types/types";
import { signUp } from "../actions";
export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  // function for submitting signup datas.
  async function onSubmit(data: SignupFormData) {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("name", data.password);
    formData.append("username", data.name);

    await signUp(formData);
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", {
            required: "Email is required!",
            minLength: 5,
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
              message: "Invalid email address",
            },
          })}
          type="text"
        />
      </form>
    </>
  );
}
