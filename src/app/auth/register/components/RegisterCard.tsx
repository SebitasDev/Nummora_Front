import { useState } from "react";
import { CustomCard } from "@/components/atoms/CustomCard";
import SectionHeader from "@/components/atoms/SectionHeader";
import { Box, Button, Divider, useMediaQuery, useTheme } from "@mui/material";
import HumanTechVerificationButton from "@/lib/self/HumanTechVerificationButton";
import { RoleGroup } from "../../components/RoleGroup";
import { useRegister } from "@/app/auth/register/hooks/useRegister";
import {
  ProgressSteps,
  StepLabel,
  ConnectWalletButton,
} from "@/app/auth/components";

export const RegisterCard = () => {
  const [roleIsSelected, setIsRoleSelected] = useState(false);
  const [roleSelected, setRoleSelected] = useState(Number);
  const [selfVerified, setSelfVerified] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const themeMUI = useTheme();
  const isMdUp = useMediaQuery(themeMUI.breakpoints.up("md"));
  const { onRegisterUser, errors, control } = useRegister();

  return (
    <CustomCard
      sx={{
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.5,
        boxShadow: "0px",
        border: "0px",
        width: "100%",
      }}
    >
      <SectionHeader
        title={"Registrarse"}
        subtitle="Completa los 3 pasos para registrarte"
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
      <Divider
        variant="fullWidth"
        sx={{
          color: "grey.600",
          fontSize: isMdUp ? 15 : 12,
          marginY: "1%",
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
      <Button onClick={async () => await onRegisterUser(roleSelected)}>
        Registrarse ( Self no funcionando )
      </Button>
      <Divider
        variant="fullWidth"
        sx={{
          color: "grey.600",
          fontSize: isMdUp ? 15 : 12,
          marginY: "1%",
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
        <HumanTechVerificationButton
          onResult={(data) => {
            if (data?.status === "success" || data?.verified) {
              setSelfVerified(true);
            }
          }}
          isWalletConnected={walletConnected}
          selfVerified={selfVerified}
        />
      </Box>
      <ProgressSteps
        roleSelected={roleIsSelected}
        selfVerified={selfVerified}
        walletConnected={walletConnected}
        onAllStepsCompleted={() => onRegisterUser(roleSelected)}
      />
    </CustomCard>
  );
};
