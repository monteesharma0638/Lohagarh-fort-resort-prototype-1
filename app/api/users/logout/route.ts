import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const loginUrl = new URL("/admin/login", request.url);
  console.log("logging out....%%%%%%%%&&&&&&&&")

  const response = NextResponse.redirect(loginUrl);

  response.cookies.set("session", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });

  return response;
}