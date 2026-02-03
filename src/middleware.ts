export { auth as middleware } from "@/auth";

export const config = {
    // Specify the paths you want the middleware to run on
    matcher: ["/dashboard/:path*"],
};
