import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {jwtVerify} from "jose";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("authToken")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    try {
        await jwtVerify(token, new TextEncoder().encode('super_duper_secret_key'));
        return NextResponse.next();
    } catch (err) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }
}

export const config = {
    matcher: ["/lender/:path*", "/borrower/:path*"]
};
