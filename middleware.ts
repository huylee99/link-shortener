import { NextResponse, NextRequest, NextFetchEvent } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const slug = req.nextUrl.pathname.split("/").pop();

  const data = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);

  console.log(data, slug);
  if (data.status === 400) {
    return NextResponse.redirect(`${req.nextUrl.origin}`);
  }

  const dataJSON = await data.json();

  return NextResponse.redirect(dataJSON.url);
}

export const config = {
  matcher: "/s/:path*",
};
