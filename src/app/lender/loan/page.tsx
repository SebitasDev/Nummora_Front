"use client";

import LoanTemplate from "@/components/layouts/pageLayouts/LoanTemplate";
import {useAuthGuard} from "@/hooks/useAuthGuard";

export default function PaymentPage() {
  useAuthGuard();
  return <LoanTemplate />;
}
