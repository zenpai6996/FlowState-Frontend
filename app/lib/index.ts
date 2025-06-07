export const publicRoutes = [
  "/sign-in",
  "/sign-up",
  "/verify-email",
  "/reset-password",
  "/forgot-password",
  "/",
];

export const isPublicRoute = (path:string) => {
  return publicRoutes.includes(path);
}