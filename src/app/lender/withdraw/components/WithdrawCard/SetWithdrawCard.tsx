import { AmountInput } from "@/app/lender/withdraw/components/WithdrawCard/AmountInput";
import {
  Button,
  CardContent,
  CardHeader,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import AccountBalanceWalletOutlined from "@mui/icons-material/AccountBalanceWalletOutlined";
import { CustomCard } from "@/components/atoms/CustomCard";
import { WithdrawMethod } from "@/app/lender/withdraw/components/WithdrawCard/WithdrawMethod";
import React, { useState } from "react";
import SectionHeader from "@/components/atoms/SectionHeader";
import {useWithdrawCard} from "@/app/lender/withdraw/hooks/useWithdrawCard";

export const SetWithdrawCard = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  
  const { confirmWithdraw } = useWithdrawCard();

  return (
    <CustomCard sx={{ p: 1.7 }}>
      <CardHeader
        title={
          <SectionHeader
            title="Configurar Retiro"
            subtitle="Selecciona el metodo y monto que deseas retirar"
            icon={
              <AccountBalanceWalletOutlined sx={{ color: "success.light" }} />
            }
          />
        }
      />
      <Box sx={{ p: 1 }}>
        <AmountInput sx={{ mb: 4 }} />
        <WithdrawMethod
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        ></WithdrawMethod>
        <Button
          disabled={selectedAddress === ""}
          sx={{
            bgcolor: "success.light",
            width: "100%",
            marginTop: 4,
          }}
          variant="contained"
          onClick={async () => await confirmWithdraw()}
        >
          Confirmar Retiro
        </Button>
      </Box>
    </CustomCard>
  );
};
