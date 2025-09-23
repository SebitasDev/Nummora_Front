'use client'

import {LenderDashboardTemplate} from "@/components/layouts/pageLayouts/LenderDashboardTemplate";
import {useAuthGuard} from "@/hooks/useAuthGuard";

export default function LenderPage() {
    useAuthGuard();
    return <LenderDashboardTemplate/>; 
}