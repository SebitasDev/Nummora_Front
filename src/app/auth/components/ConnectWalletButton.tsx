"use client";

import { Box } from "@mui/material";
import { useWalletAuth } from "@/app/auth/hooks/useWalletAccount";
import React, { useEffect } from "react";

interface ConnectWalletButtonProps {
  onWalletStatusChange?: (connected: boolean) => void;
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  onWalletStatusChange,
}) => {
  const { isConnected } = useWalletAuth();

  useEffect(() => {
    onWalletStatusChange?.(isConnected);
  }, [isConnected, onWalletStatusChange]);

  return (
    <Box
      component={"form"}
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
