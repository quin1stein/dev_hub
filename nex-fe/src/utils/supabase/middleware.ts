import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // public routes
  const publicRoutes = ["/", "/login", "/signup", "/about"];
  // protected Routes
  const protectedRoutes = ["/home"]

  const path = request.nextUrl.pathname;
  
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))
  const isPublicRoute = publicRoutes.includes(path)

  //unauthenticated user trying to access protected route, redirect to login route
  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
//authenticated user accessing public route will be redirected into home route
  if (user && isPublicRoute) {
    return NextResponse.redirect(new URL("/home", request.url))
  }

  return supabaseResponse
}