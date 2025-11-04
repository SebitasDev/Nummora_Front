import { useInvestAmountStore } from "@/app/lender/invest/store/investAmountStore";
import Theme from "@/theme/theme";
import { useMediaQuery, useTheme } from "@mui/material";
import {useWalletAccount} from "@/hooks/useWalletAccount";
import {Address, encodePacked, keccak256, toBytes} from "viem";
import {financeLoan, FinanceLoanPayload} from "@/api/loan/financeLoan";
import {mapper} from "@/mappers/mapper";
import {FinanceLoanDto} from "@/interfaces/financeLoanDto";
import {toast} from "react-toastify";
import {InvestDto} from "@/interfaces/investDto";
import {invest, InvestPayload} from "@/api/investment/invest";
import {toWei} from "@/utilities/toWei";

export const useInvest = () => {
  const { amount, setAmount } = useInvestAmountStore();
  const theme = Theme;
  const themeMUI = useTheme();
  const isMobile = useMediaQuery(themeMUI.breakpoints.down("md"));
  const { user, walletClient } = useWalletAccount();
  
  const acceptDeposit = async (amount: number) => {
      try {
          if (!walletClient || !user) {
              throw new Error("Wallet not connected");
          }

          const messageHash = keccak256(
              encodePacked(
                  ['address', 'address', 'uint256', 'address'],
                  [
                      process.env.NEXT_PUBLIC_NUMMUS_LOAN_CORE as `0x${string}`,
                      process.env.NEXT_PUBLIC_STABLECOIN_ADDRESS as `0x${string}`,
                      toWei(amount),
                      user as `0x${string}`,
                  ]
              )
          );

          const signature = await walletClient.signMessage({
              account: walletClient.account,
              message: { raw: toBytes(messageHash) },
          });

          const investData: InvestDto = {
              userAddress: user,
              amount,
              tokenAddress: process.env.NEXT_PUBLIC_STABLECOIN_ADDRESS as `0x${string}`,
              signature,
          };

          const response = await invest(
              mapper.map(investData, InvestDto, InvestPayload),
          );

          toast.success(response.success);

          return { success: true, message: 'Inversion realizada con exito', data: response };
      } catch (e: any) {
          toast.error(`❌ Error al invertir en la plataforma: ${e?.message ?? 'Error desconocido'}`);
          return { success: false, error: e?.message ?? 'Error desconocido' };
      }
  }

  const acceptLoan = async (loanId: string) => {
    try {
      const loanData: FinanceLoanDto = {
        loanId,
        lender: user as Address,
        dataHash: null as unknown as Address,
      };

      loanData.dataHash = keccak256(
          encodePacked(
              ['string', 'address'],
              [loanData.loanId, loanData.lender],
          ),
      );

      const response = await financeLoan(
          mapper.map(loanData, FinanceLoanDto, FinanceLoanPayload),
      );

      toast.success(response.success);

      return { success: true, message: 'Préstamo financiado con éxito', data: response };
    } catch (e: any) {
      toast.error(`❌ Error al financiar préstamo: ${e?.message ?? 'Error desconocido'}`);
      return { success: false, error: e?.message ?? 'Error desconocido' };
    }
  };


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
