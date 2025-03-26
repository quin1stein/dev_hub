"use server";
import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/utils/prisma";

// Login function
export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = (formData.get("email") as string).trim();
  const password = (formData.get("password") as string).trim();

  // Check if user exists in Prisma
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      status: "User does not exist",
      success: false,
    };
  }

  const { error, data: supabaseData } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error || !supabaseData.session) {
    return {
      status: error?.message || "Failed to Log In",
      success: false,
    };
  }

  revalidatePath("/", "layout");
  return {
    status: "Login successful!",
    success: true,
    redirect: "/home",
  };
}

// Signup function
export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // Check if user already exists in Prisma
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    return { status: "User already exists!", success: false };
  }

  // Sign up the user in Supabase
  const { data: supabaseUser, error } = await supabase.auth.signUp(data);

  if (error || !supabaseUser?.user) {
    return { status: "Failed to sign-in!", success: false };
  }

  try {
    // Store Supabase UID in Prisma
    const slugProfile = slugify(formData.get("name") as string, {
      replacement: "-",
      strict: true,
      lower: true,
    });
    await prisma.user.create({
      data: {
        profileSlug: `${slugProfile}-${Date.now().toString(36)}`,
        id: supabaseUser.user.id, // Store the Supabase UID
        email: data.email,
        name: formData.get("name") as string,
      },
    });

    return {
      status:
        "Account created successfully! Check your Gmail to verify your email.",
      success: true,
    };
  } catch (err) {
    console.error("Prisma user creation error:", err);
    return { status: "Failed to save user to database!", success: false };
  }
}
