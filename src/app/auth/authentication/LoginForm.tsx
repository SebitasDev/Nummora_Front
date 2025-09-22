"use client";

import {Box, Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import { useLogin } from "@/app/auth/hooks";
import React, { useState } from "react";

interface LoginFormProps {
  onWalletStatusChange?: (connected: boolean) => void;
  isRegister?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onWalletStatusChange,
  isRegister = true  
}) => {
  const { onSubmit, isConnected } = useLogin();
  const [role, setRole] = useState(0);

  React.useEffect(() => {
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
        
      {!isRegister && (
          <>
              <FormControl fullWidth>
                  <InputLabel id="role-select-label">Rol</InputLabel>
                  <Select
                      labelId="role-select-label"
                      value={role}
                      label="Rol"
                      onChange={(e) => setRole(Number(e.target.value))}
                  >
                      <MenuItem value={0}>Deudor</MenuItem>
                      <MenuItem value={1}>Prestamista</MenuItem>
                  </Select>
              </FormControl>

              <Button onClick={async () => await onSubmit(role)}>Ir</Button>
          </>
      )}
    </Box>
  );
};
