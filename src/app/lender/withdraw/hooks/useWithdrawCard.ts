import { useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import {useWalletAccount} from "@/hooks/useWalletAccount";
import {NummoraLoanAbi} from "@/contracts";
import {useContractWrite} from "@/hooks/useContractWrite";
import {useInvestAmountStore} from "@/app/lender/withdraw/store/useInvestAmountStore";
import {useInvestAmount} from "@/app/lender/withdraw/hooks/useInvestAmount";
import {parseEther} from "viem";

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
      ContractAddress: process.env.NEXT_PUBLIC_NUMMUS_LOAN_CORE as `0x${string}`,
      abi: NummoraLoanAbi,
      functionName: "withdraw",
      args: [
        "0xB4630414268949dd89D335a66be40819D2db0C5c" as `0x${string}`, //Address Stablecoin
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
