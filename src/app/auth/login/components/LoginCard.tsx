import { CustomCard } from "@/components/atoms/CustomCard";
import SectionHeader from "@/components/atoms/SectionHeader";
import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import { LoginForm } from "../../authentication/LoginForm";
import SelfVerificationButton from "../../../../lib/self/SelfVerificationButton";
import { ProgressSteps } from "./ProgressSteps";
import { StepLabel } from "./StepLabel";
import { useState } from "react";

export const LoginCard = () => {
  const [sessionId, setSessionId] = useState("");
  const [selfVerified, setSelfVerified] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const themeMUI = useTheme();
  const isMdUp = useMediaQuery(themeMUI.breakpoints.up("md"));
  return (
    <CustomCard
      sx={{
        width: "80%",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        boxShadow: "0px",
        border: "0px",
      }}
    >
      <SectionHeader
        title={"Iniciar sesión"}
        subtitle="Completa ambos pasos para acceder"
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
        title="Conexión de Billetera"
        isDone={walletConnected}
        sx={{ fontSize: isMdUp ? 14 : 11 }}
      />
      <LoginForm onWalletStatusChange={setWalletConnected} />
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
        title="Verificación de identidad"
        isDone={selfVerified}
        sx={{ fontSize: isMdUp ? 14 : 11 }}
      />
      <Box sx={{ mt: -3.5, width: "100%", height: 100 }}>
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
      />
    </CustomCard>
  );
};
