"use client";

import { Box } from "@mui/material";
import { useLogin } from "@/app/auth/hooks";
import { useBalance } from "wagmi";
import React from "react";

interface LoginFormProps {
  onWalletStatusChange?: (connected: boolean) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onWalletStatusChange,
}) => {
  const { handleSubmit, onSubmit, isConnected, account } = useLogin();

  React.useEffect(() => {
    onWalletStatusChange?.(isConnected);
  }, [isConnected, onWalletStatusChange]);

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <appkit-button size="md" label={"Conectar Billetera"} />
    </Box>
  );
};
``;
