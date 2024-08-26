import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Client, Account } from "appwrite";
import authService from "./appwrite/auth";
import { createSessionClient } from "./appwrite/adminAuth";

export async function middleware(request: NextRequest) {
  const { account } = await createSessionClient(request);

  console.log("ACCOUNT: ", account);

  if (!account && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (account && request.nextUrl.pathname.startsWith("/admin")) {
    try {
      const accountAuth = await account.get()
    } catch (error) {
      console.log("ERROR: ", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
