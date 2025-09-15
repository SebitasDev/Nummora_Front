"use client";

import { Box, Divider, Typography } from "@mui/material";
import { LoginForm, ShieldIcon, StepLabel } from "@/app/auth/login/components";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import SectionHeader from "../atoms/SectionHeader";
import { CustomCard } from "../atoms/CustomCard";
import { ProgressSteps } from "@/app/auth/login/components/ProgressSteps";

const SelfVerificationButton = dynamic(
  () => import("../../../self/frontend/SelfVerificationButton"),
  { ssr: false }
);

const SelfVerificationStatus = dynamic(
  () => import("../../../self/frontend/SelfVerificationStatus"),
  { ssr: false }
);

export const LoginTemplate = () => {
  const [sessionId, setSessionId] = useState("");
  const [selfVerified, setSelfVerified] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        height: "fit-content",
        background: "linear-gradient(to top left,  #ECE4FB, #D9FBF6 )",
      }}
    >
      <ShieldIcon sx={{ marginTop: "5%" }} />

      <SectionHeader
        title={"Bienvenido a Nummora"}
        titleSize={30}
        subtitle="Accede de manera segura con verificación digital"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginY: "1%",
        }}
      />

      <CustomCard
        sx={{
          width: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
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
            marginY: "1%",
          }}
        />
        <StepLabel number={1} title="Verificación de identidad" />
        <Box sx={{ mt: -3.5 }}>
          <SelfVerificationButton
            onSessionId={setSessionId}
            onResult={(data) => {
              if (data?.status === "success" || data?.verified) {
                setSelfVerified(true);
              }
            }}
          />
        </Box>
        <Divider
          variant="fullWidth"
          sx={{
            color: "grey.600",
            fontWeight: 400,
            borderColor: "grey.400",
          }}
        >
          y
        </Divider>
        <StepLabel number={2} title="Conexión de Billetera" />
        <LoginForm onWalletStatusChange={setWalletConnected} />
        <ProgressSteps
          selfVerified={selfVerified}
          walletConnected={walletConnected}
        />
      </CustomCard>
    </Box>
  );
};
