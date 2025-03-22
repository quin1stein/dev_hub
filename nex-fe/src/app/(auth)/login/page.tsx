"use client";
import { useForm } from "react-hook-form";
import { SignupFormData } from "@/types/types";
import { login } from "../actions";
import Nav from "@/components/custom/nav";
import Footer from "@/components/custom/footer";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Page() {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>();

  const [inputType, setInputType] = useState<boolean>(false);
  const [messageStatus, setMessageStatus] = useState<string>("");
  async function logIn(data: SignupFormData) {
    setMessageStatus("");
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      const response = await login(formData);

      if (!response.success) {
        setMessageStatus(response.status);
      } else {
        setMessageStatus(response.status);
        route.push("/home");
      }
    } catch (e: any) {
      console.error("An error has occurred", e.message);
    }
  }

  return (
    <>
      <Nav position="fixed" />
      <main className="min-h-[80vh] flex flex-col justify-center items-center bg-gray-100 px-4">
        <form
          onSubmit={handleSubmit(logIn)}
          className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md border border-gray-300"
        >
          <h2 className="text-2xl font-bold text-center mb-4">Log In</h2>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email:
            </label>
            <input
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 "
              type="email"
              {...register("email", {
                required: "This field is required!",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid Email Format!",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password:
            </label>
            <div className="relative">
              <input
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 "
                type={inputType ? "password" : "text"}
                {...register("password", {
                  required: "This field is required!",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters.",
                  },
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                onClick={() => setInputType(!inputType)}
              >
                {inputType ? "Show" : "Hide"}
              </button>
            </div>
            {messageStatus && <p className="font-bold mt-1">{messageStatus}</p>}
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-white bg-black font-semibold py-2 rounded-md transition duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>
      </main>
      <p className="text-center">
        Note: You cannot log-in if the email you used to sign-in is not
        verified.
      </p>
      <Footer />
    </>
  );
}
