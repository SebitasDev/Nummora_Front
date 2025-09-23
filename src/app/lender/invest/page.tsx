"use client";

import { InvestTemplate } from "@/components/layouts/pageLayouts/InvestTemplate";
import {useAuthGuard} from "@/hooks/useAuthGuard";

export default function InvestPage() {
  useAuthGuard();
  return <InvestTemplate />;
}
