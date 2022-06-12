import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const WHITE_LIST = ["/vercel.svg", "/favicon.ico", "/"];

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (
    WHITE_LIST.includes(req.nextUrl.pathname) ||
    req.nextUrl.pathname === "/" ||
    req.nextUrl.pathname.startsWith("/api/")
  ) {
    console.log("🚀 ~ file: _middleware.ts ~ line 11 ~ middleware ~ pathname", req.nextUrl.pathname);
    return;
  }

  const slug = req.nextUrl.pathname.split("/").pop();

  const data = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);

  if (data.status === 404) {
    return NextResponse.redirect(`${req.nextUrl.origin}`);
  }

  const dataJSON = await data.json();

  return NextResponse.redirect(dataJSON.url);
}
