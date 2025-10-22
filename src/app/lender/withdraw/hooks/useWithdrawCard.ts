import { useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import {useWalletAccount} from "@/hooks/useWalletAccount";
import {NummoraLoanAbi} from "@/contracts";
import {useContractWrite} from "@/hooks/useContractWrite";
import {useInvestAmount} from "@/app/lender/withdraw/hooks/useInvestAmount";
import {parseEther} from "viem";
import {NUMMORA_CORE_ADDRESS, STABLECOIN_ADDRESS} from "@/Common/envairoments";

export const useWithdrawCard = () => {
  const [expanded, setExpanded] = useState(false);
  const { user } = useWalletAccount();
  const { write } = useContractWrite();
  const { totalIncome } = useInvestAmount();

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  const themeMUI = useTheme();
  const isMdUp = useMediaQuery(themeMUI.breakpoints.up("md"));

  const addressOptions = [
    user!,
  ];

  const confirmWithdraw = async () => {
    const cleanAmount = totalIncome.replace(/\./g, '').replace(',', '.');
    await write({
      ContractAddress: NUMMORA_CORE_ADDRESS,
      abi: NummoraLoanAbi,
      functionName: "withdraw",
      args: [
        STABLECOIN_ADDRESS, //Address Stablecoin
        parseEther(cleanAmount) //Amount
      ]
    });
  }

  return {
    expanded,
    handleToggle,
    isMdUp,
    addressOptions,
    confirmWithdraw
  };
};
