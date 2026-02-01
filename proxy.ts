import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
	const cookies = request.cookies;
	if (!cookies.has("slmauth")) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	const authCookie = cookies.get("slmauth");

	if (authCookie?.value !== Buffer.from(process.env.PASSWORD as string + process.env.APP_SECRET as string).toString("base64")) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/"]
};