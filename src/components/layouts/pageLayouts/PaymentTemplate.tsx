"use client";

import { Box, useTheme } from "@mui/material";
import { PaymentConfirmation } from "@/app/lender/payment/components/Payment/PaymentConfirmation";
import { LoanProgress } from "@/app/lender/payment/components/LoanProgress/LoanProgress";
import { PaymentSchedule } from "@/app/lender/payment/components/PaymentSchedule/PaymentSchedule";
import { BorrowerInfoCard } from "@/app/lender/components/BorrowerInfoCard";
import { LoanDetailsCard } from "@/app/lender/payment/components/LoanDetails/LoanDetailsCard";
import { QuickActionsCard } from "@/app/lender/payment/components/QuickActions/QuickActionsCard";

export default function TransactionsHistory() {
  const themeMUI = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        [themeMUI.breakpoints.up("md")]: {
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gridTemplateAreas: `
            "header header"
            "leftCol rightCol"
          `,
          gap: 3,
        },
      }}
    >
      <Box gridArea="leftCol" display="flex" flexDirection="column" gap={3}>
        <PaymentConfirmation />
        <LoanProgress />
        <PaymentSchedule />
      </Box>
      <Box gridArea="rightCol" display="flex" flexDirection="column" gap={3}>
        <BorrowerInfoCard
          borrowerName="Maria Gonzales"
          score={"750"}
          paymentAddress="0x4c0896bBfA45B0f2F59C758D05F5f12e8456A987"
          totalLoans="3 activos"
        />
        <LoanDetailsCard />
        <QuickActionsCard />
      </Box>
    </Box>
  );
}
