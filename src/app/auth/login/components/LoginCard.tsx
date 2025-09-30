import { CustomCard } from "@/components/atoms/CustomCard";
import SectionHeader from "@/components/atoms/SectionHeader";
import { Box, Button, Divider, useMediaQuery, useTheme } from "@mui/material";
import SelfVerificationButton from "@/lib/self/SelfVerificationButton";
import { useState } from "react";
import {
  ProgressSteps,
  StepLabel,
  ConnectWalletButton,
} from "@/app/auth/components";
import { useLogin } from "../hooks/useLogin";
import { RoleGroup } from "../../components/RoleGroup";

export const LoginCard = () => {
  const [_, setSessionId] = useState("");
  const [selfVerified, setSelfVerified] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [roleIsSelected, setIsRoleSelected] = useState(false);
  const [roleSelected, setRoleSelected] = useState(Number);
  const themeMUI = useTheme();
  const isMdUp = useMediaQuery(themeMUI.breakpoints.up("md"));
  const { errors, control, onSubmit } = useLogin();
  return (
    <CustomCard
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px",
        border: "0px",
        width: "100%",
        height: "100%",
      }}
    >
      <SectionHeader
        title={"Iniciar sesión"}
        subtitle="Completa ambos pasos para acceder"
        subtitleSize={isMdUp ? 14 : 12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: "1%",
        }}
      />
      <StepLabel
        number={1}
        title="Tipo de Usuario"
        isDone={roleIsSelected}
        sx={{ fontSize: isMdUp ? 14 : 11 }}
      />
      <RoleGroup
        control={control}
        errors={errors}
        onIsRoleSelected={setIsRoleSelected}
        OnRoleSelected={setRoleSelected}
      />
      <Button onClick={() => onSubmit(roleSelected)}>
        IF SELF NOT WORKING
      </Button>
      <Divider
        variant="fullWidth"
        sx={{
          color: "grey.600",
          fontSize: isMdUp ? 15 : 12,
        }}
      >
        y
      </Divider>
      <StepLabel
        number={2}
        title="Conexión de Billetera"
        isDone={walletConnected}
        sx={{ fontSize: isMdUp ? 14 : 11 }}
      />
      <ConnectWalletButton onWalletStatusChange={setWalletConnected} />
      <Divider
        variant="fullWidth"
        sx={{
          color: "grey.600",
          fontSize: isMdUp ? 15 : 12,
        }}
      >
        y
      </Divider>
      <StepLabel
        number={3}
        title="Verificación de identidad"
        isDone={selfVerified}
        sx={{ fontSize: isMdUp ? 14 : 11 }}
      />
      <Box sx={{ mt: -3.5, mb: 2, width: "100%", height: 100 }}>
        <SelfVerificationButton
          onSessionId={setSessionId}
          onResult={(data) => {
            if (data?.status === "success" || data?.verified) {
              setSelfVerified(true);
            }
          }}
          selfVerified={selfVerified}
          isWalletConnected={walletConnected}
        />
      </Box>

      <ProgressSteps
        selfVerified={selfVerified}
        walletConnected={walletConnected}
        roleSelected={roleIsSelected}
        onAllStepsCompleted={() => onSubmit(roleSelected)}
      />
    </CustomCard>
  );
};
