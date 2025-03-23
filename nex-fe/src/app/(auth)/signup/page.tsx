"use client";
import { useForm } from "react-hook-form";
import { SignupFormData } from "@/lib/types/types";
import { signUp } from "../actions";
import { useState } from "react";
import Nav from "@/components/custom/nav";
import Footer from "@/components/custom/footer";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>();

  const [serverError, setServerError] = useState<string | null>(null);
  const [inputType, setInputType] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");

  async function onSubmit(data: SignupFormData) {
    setServerError(null);
    setStatusMessage("");
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("name", data.name);

    try {
      // get the status of the account creation
      const fe = await signUp(formData);

      if (fe.success) {
        setStatusMessage(fe.status);
      } else {
        setStatusMessage(fe.status);
      }
    } catch (error: any) {
      setServerError(error.message || "Something went wrong");
    }
  }

  return (
    <>
      <Nav position="fixed" />
      <main className="flex justify-center items-center w-full h-[80vh] p-8">
        <section className="h-auto w-[24vw] border-2 p-6 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Sign Up</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            {/*name of the user */}
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="w-full border p-2 rounded-md"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 5,
                    message: "Must be at least 5 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Cannot exceed 20 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Special characters and numbers are not allowed",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/*email*/}
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full border p-2 rounded-md"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email format",
                  },
                })}
              />

              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/*pasword */}
            <div>
              <label htmlFor="password">Password</label>
              <div className="relative">
                <input
                  type={inputType ? "text" : "password"}
                  id="password"
                  className="w-full border p-2 rounded-md"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Must be at least 8 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-1 text-sm rounded-md"
                  onClick={() => setInputType(!inputType)}
                >
                  {inputType ? "Hide Password" : "Show Password"}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* re enter password and validate if it matched */}
            <div>
              <label htmlFor="confirmPassword">Re-Enter Password</label>
              <div className="relative">
                <input
                  type={inputType ? "text" : "password"}
                  id="confirmPassword"
                  className="w-full border p-2 rounded-md"
                  {...register("confirmPassword", {
                    required: "Password is required",
                    validate: (value, { password }) =>
                      value === password || "Passwords do not match",
                  })}
                />
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>

            {/* Server Error */}
            {statusMessage && <p className="font-bold mt-1">{statusMessage}</p>}
            {serverError && (
              <p className="text-red-500 text-sm">{serverError}</p>
            )}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
