'use client'

import WithdrawTemplate from "@/components/layouts/pageLayouts/WithdrawTemplate";
import {useAuthGuard} from "@/hooks/useAuthGuard";

export default function BorrowerPage() {
    useAuthGuard();
    return <WithdrawTemplate/>; 
}