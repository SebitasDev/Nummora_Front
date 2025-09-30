"use client";

import TransactionsHistoryTemplate from "@/components/layouts/pageLayouts/TransactionsHistoryTemplate";
import {useAuthGuard} from "@/hooks/useAuthGuard";

export default function TransactionsHistoryPage() {
  useAuthGuard();
  return <TransactionsHistoryTemplate />;
}
