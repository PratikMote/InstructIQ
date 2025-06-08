import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// ❌ These should NOT be protected:
const isPublicRoute = createRouteMatcher([
  '/dashboard/HowWorks',
  '/dashboard/questions',
]);

// ✅ Everything else under /dashboard and /forum is protected
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/forum(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req) && isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
