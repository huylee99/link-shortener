import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  console.log("🚀 ~ file: _middleware.ts ~ line 5 ~ middleware ~ req.nextUrl.pathname", req.nextUrl.pathname);

  if (req.nextUrl.pathname === "/" || req.nextUrl.pathname.startsWith("/api/")) {
    return;
  }

  const slug = req.nextUrl.pathname.split("/").pop();

  const data = await fetch(`${req.nextUrl.origin}/api/${slug}`);

  if (data.status === 404) {
    return NextResponse.redirect(`${req.nextUrl.origin}`);
  }

  const dataJSON = await data.json();

  return NextResponse.redirect(dataJSON.url);
};

export default middleware;
