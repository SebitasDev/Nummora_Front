"use client";

import { Box, Modal, useTheme } from "@mui/material";
import { LoanSummary } from "@/app/lender/loan/components/LoanSummary/LoanSummary";
import { PaymentSchedule } from "@/app/lender/loan/components/PaymentSchedule/PaymentSchedule";
import { BorrowerInfoCard } from "@/app/lender/components/BorrowerInfoCard";
import { ContractInfoCard } from "@/app/lender/loan/components/ContractInfo/ContractInfoCard";
import { RiskEvaluationCard } from "@/app/lender/loan/components/RiskEvaluationCard/RiskEvaluationCard";
import { QuickActionsCard } from "@/app/lender/loan/components/QuickActions/QuickActionsCard";
import { ContractPreview } from "@/app/lender/loan/components/ContractPreview/ContractPreviewModal";
import { useContractModal } from "@/app/lender/loan/hooks/useContractModal";

export default function TransactionsHistory() {
  const themeMUI = useTheme();
  const { isOpen, openModal, closeModal } = useContractModal();

  return (
    <>
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
          <QuickActionsCard onOpenContract={openModal} />
        </Box>
      </Box>

      <Modal open={isOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: { xs: "90%", md: "70%" },
            maxHeight: "90vh",
            overflowY: "auto",
            outline: "none",
          }}
        >
          <ContractPreview />
        </Box>
      </Modal>
    </>
  );
}
