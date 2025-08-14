"use client";

import { Box, useTheme } from "@mui/material";
import { LoanSummary } from "@/app/lender/loan/components/LoanSummary/LoanSummary";
import { PaymentSchedule } from "@/app/lender/loan/components/PaymentSchedule/PaymentSchedule";
import { BorrowerInfoCard } from "@/app/lender/general-components/BorrowerInfoCard";
import { ContractInfoCard } from "@/app/lender/loan/components/ContractInfo/ContractInfoCard";
import { RiskEvaluationCard } from "@/app/lender/loan/components/RiskEvaluationCard/RiskEvaluationCard";

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
        <LoanSummary />
        <PaymentSchedule />
      </Box>
      <Box gridArea="rightCol" display="flex" flexDirection="column" gap={3}>
        <BorrowerInfoCard
          borrowerName="Carlos Rodriguez"
          score={"680"}
          paymentAddress="0x4c0896bBfA45B0f2F59C758D05F5f12e8456A987"
          totalLoans="2 activos"
        />
        <RiskEvaluationCard />
        <ContractInfoCard />
      </Box>
    </Box>
  );
}
