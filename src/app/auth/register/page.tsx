"use client";

import { AuthTemplate } from "@/components/layouts/AuthTemplate";
import { RegisterCard } from "./components/RegisterCard";

export default function LoginPage() {
  return (
    <AuthTemplate>
      <RegisterCard />
    </AuthTemplate>
  );
}
