"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtVerify } from "jose";

export function useAuthGuard() {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("authToken");

            if (!token) {
                router.push("/auth/login");
                return;
            }

            try {
                const secret = new TextEncoder().encode(
                    process.env.NEXT_PUBLIC_JWT_SECRET || "super_duper_secret_key"
                );

                await jwtVerify(token, secret);
            } catch (err) {
                console.error("Invalid token:", err);
                router.push("/auth/login");
            }
        };

        checkAuth();
    }, [router]);
}
