import { useInvestAmountStore } from "@/app/lender/invest/store/investAmountStore";
import Theme from "@/theme/theme";
import { useMediaQuery, useTheme } from "@mui/material";
import {useContractWrite} from "@/hooks/useContractWrite";
import {NummoraLoanAbi} from "@/contracts";
import {useWalletAccount} from "@/hooks/useWalletAccount";
import {encodePacked, keccak256, parseEther} from "viem";
import axios from 'axios';

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

    const loanData = {
      lender: user as `0x${string}`,
      borrower: '0xae8B1aBF4155647a6f41D93B40820C56E8fBa360' as `0x${string}`,
      token: '0xB4630414268949dd89D335a66be40819D2db0C5c' as `0x${string}`,
      amount: BigInt(value) * BigInt(10 ** 18), 
      interest: parseEther(interest.toString()),   
      installments: BigInt(installments), 
      platformFee: parseEther((interest * (25 / 100)).toString())
    };

    const dataHash = keccak256(
        encodePacked(
            ['address', 'address', 'address', 'uint256', 'uint256', 'uint256', 'uint256'],
            [
              loanData.lender,
              loanData.borrower,
              loanData.token,
              loanData.amount,
              loanData.interest,
              loanData.installments,
              loanData.platformFee
            ]
        )
    );

    const payload = {
      lender: loanData.lender,
      borrower: loanData.borrower,
      token: loanData.token,
      amount: loanData.amount.toString(),
      interest: loanData.interest.toString(), 
      installments: loanData.installments.toString(),
      platformFee: loanData.platformFee.toString(),
      dataHash: dataHash
    };

    const response = await axios.post('http://localhost:3000/blockchain/loan', payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    console.log('Success:', response.data);
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
