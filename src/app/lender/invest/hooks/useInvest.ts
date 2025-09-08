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

  const acceptLoan = async (value: number, installments: number, interest: number) => {
    const loanData: FinanceLoanDto = {
      lender: user as Address,
      borrower: '0xae8B1aBF4155647a6f41D93B40820C56E8fBa360' as `0x${string}`,
      token: process.env.NEXT_PUBLIC_STABLECOIN_ADDRESS as `0x${string}`,
      amount: BigInt(value) * BigInt(10 ** 18), 
      interest: parseEther(interest.toString()),   
      installments: BigInt(installments), 
      platformFee: parseEther((interest * (25 / 100)).toString()),
      dataHash: null as unknown as Address
    };
    
    loanData.dataHash = keccak256(
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

    const response = await financeLoan(mapper.map(loanData, FinanceLoanDto, FinanceLoanPayload))

    console.log(response);
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
