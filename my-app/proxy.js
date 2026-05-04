import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: [
    // dashboards
    "/dashboard/user/:path*",
    "/dashboard/admin/:path*",
    "/dashboard/author/:path*",
    "/dashboard/reviewer/:path*",

    // "/kyc",

    "/api/user/:path*",
    "/api/admin/:path*",
    "/api/author/:path*",
    "/api/reviewer/:path*",

    "/login",
    "/register",
  ],
};

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    const token = await getToken({ req });
    const role = token?.user?.user_type;

    console.log("token---", token);

    console.log("role==========", role);

    if (token && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/dashboard/user") && role !== "user") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/dashboard/author") && role !== "author") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/dashboard/reviewer") && role !== "reviewer") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // if (pathname === "/kyc" && role === "user") {
    //   const kycVerificationStatus = token?.user?.kyc_verification_status;

    //   if (
    //     kycVerificationStatus === "pending" ||
    //     kycVerificationStatus === "approved"
    //   ) {
    //     return NextResponse.redirect(new URL("/dashboard/user", req.url));
    //   }
    // }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        if (pathname === "/login" || pathname === "/register") {
          return true;
        }

        return !!token;
      },
    },
  }
);
