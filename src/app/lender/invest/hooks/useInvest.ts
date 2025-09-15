import { useInvestAmountStore } from "@/app/lender/invest/store/investAmountStore";
import Theme from "@/theme/theme";
import { useMediaQuery, useTheme } from "@mui/material";
import {useContractWrite} from "@/hooks/useContractWrite";
import {NummoraLoanAbi} from "@/contracts";
import {useWalletAccount} from "@/hooks/useWalletAccount";
import {Address, encodePacked, keccak256, parseEther} from "viem";
import {financeLoan, FinanceLoanPayload} from "@/api/loan/financeLoan";
import {mapper} from "@/mappers/mapper";
import {FinanceLoanDto} from "@/interfaces/financeLoanDto";
import {toast} from "react-toastify";
import { useEffect } from "react";

export const useInvest = () => {
  const { amount, setAmount } = useInvestAmountStore();
  const theme = Theme;
  const themeMUI = useTheme();
  const isMobile = useMediaQuery(themeMUI.breakpoints.down("md"));
  const { user } = useWalletAccount();
  const { write } = useContractWrite();
  
  const acceptDeposit = async (value: number) => {
    await write({
      ContractAddress: process.env.NEXT_PUBLIC_NUMMUS_LOAN_CORE as `0x${string}`,
      abi: NummoraLoanAbi,
      functionName: "deposit",
      args: [
        process.env.NEXT_PUBLIC_STABLECOIN_ADDRESS as `0x${string}`, //Address Stablecoin
        BigInt(value) * BigInt(10 ** 18) //Amount
      ]
    });
  }

  const acceptLoan = async (loanId: string) => {
    const loanData: FinanceLoanDto = {
      loanId,
      lender: user as Address,
      dataHash: null as unknown as Address
    };
    
    loanData.dataHash = keccak256(
        encodePacked(
            ['string', 'address'],
            [ loanData.loanId, loanData.lender ]
        )
    );

    const response = await financeLoan(mapper.map(loanData, FinanceLoanDto, FinanceLoanPayload))

    toast('Prestamo financiado con exito');
  }

  return {
    amount,
    setAmount,
    theme,
    themeMUI,
    isMobile,
    acceptDeposit,
    acceptLoan
  };
};
