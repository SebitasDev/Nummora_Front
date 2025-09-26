"use client";

import { AuthTemplate } from "@/components/layouts/AuthTemplate";
import { LoginCard } from "./components/LoginCard";

export default function LoginPage() {
  return (
    <AuthTemplate>
      <LoginCard />
    </AuthTemplate>
  );
}
