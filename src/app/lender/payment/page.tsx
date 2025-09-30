"use client";

import PaymentTemplate from "@/components/layouts/pageLayouts/PaymentTemplate";
import {useAuthGuard} from "@/hooks/useAuthGuard";

export default function PaymentPage() {
  useAuthGuard();
  return <PaymentTemplate />;
}
