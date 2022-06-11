import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (
    req.nextUrl.pathname === "/" ||
    req.nextUrl.pathname.startsWith("/api/") ||
    req.nextUrl.pathname === "/favicon.ico" ||
    req.nextUrl.pathname === "/vercel.svg"
  ) {
    return;
  }

  console.log("🚀 ~ file: _middleware.ts ~ line 5 ~ middleware ~ req.nextUrl.pathname", req.nextUrl.pathname);

  const slug = req.nextUrl.pathname.split("/").pop();

  const data = await fetch(`${req.nextUrl.origin}/api/${slug}`);

  if (data.status === 404) {
    return NextResponse.redirect(`${req.nextUrl.origin}`);
  }

  const dataJSON = await data.json();

  return NextResponse.redirect(dataJSON.url);
}
