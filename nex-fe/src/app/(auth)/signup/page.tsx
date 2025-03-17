"use client";
import { useForm } from "react-hook-form";
import { SignupFormData } from "@/types/types";
import { signUp } from "../actions";
import { useState } from "react";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>();

  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(data: SignupFormData) {
    setServerError(null); // Reset any previous errors

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("name", data.name);

    try {
      await signUp(formData);
    } catch (error: any) {
      setServerError(error.message || "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register("name", { required: "Name is required!" })}
          type="text"
          placeholder="Name"
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>

      <div>
        <input
          {...register("email", {
            required: "Email is required!",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
              message: "Invalid email address",
            },
          })}
          type="email"
          placeholder="Email"
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>

      <div>
        <input
          {...register("password", {
            required: "Password is required!",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          type="password"
          placeholder="Password"
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>

      {serverError && <p className="error">{serverError}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}
