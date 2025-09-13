import { useInvestAmountStore } from "@/app/lender/invest/store/investAmountStore";
import Theme from "@/theme/theme";
import { useMediaQuery, useTheme } from "@mui/material";
import {useContractWrite} from "@/hooks/useContractWrite";
import {NummoraLoanAbi} from "@/contracts";
import {toBigInt} from "ethers";
import {DepositNummoraLoan} from "@/contracts/functions/NummoraLoan.functions/DepositNummoraLoan";
import {useWalletAccount} from "@/hooks/useWalletAccount";
import {parseEther} from "viem";

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
        "0xB4630414268949dd89D335a66be40819D2db0C5c" as `0x${string}`, //Address Stablecoin
        BigInt(value) * BigInt(10 ** 18) //Amount
      ]
    });
  }

  const acceptLoan = async (value: number, installments: number, interest: number) => {
    
    await write({
      ContractAddress: process.env.NEXT_PUBLIC_NUMMUS_LOAN_CORE as `0x${string}`,
      abi: NummoraLoanAbi,
      functionName: "createLoan",
      args: [
         user, //User address
        "0xae8B1aBF4155647a6f41D93B40820C56E8fBa360" as `0x${string}`, //Address borrower
        "0xB4630414268949dd89D335a66be40819D2db0C5c" as `0x${string}`, //Address Stablecoin
        BigInt(value) * BigInt(10 ** 18), //Amount
        parseEther(interest.toString()), //Interest to pay
        installments, //Quotes
        parseEther((interest * (25 / 100)).toString()) //Interest platform
      ]
    });
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
