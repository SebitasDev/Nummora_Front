"use client";

import {
  Box,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { LoginForm, ShieldIcon, StepLabel } from "@/app/auth/login/components";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import SectionHeader from "../atoms/SectionHeader";
import { CustomCard } from "../atoms/CustomCard";
import { ProgressSteps } from "@/app/auth/login/components/ProgressSteps";
import { NumoraDescription } from "@/app/auth/login/components/NumoraDescription";

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
  const themeMUI = useTheme();
  const isMdUp = useMediaQuery(themeMUI.breakpoints.up("md"));

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
        height: "100%",
        background: "#edfdf4",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          [themeMUI.breakpoints.up("md")]: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 3,
          },
        }}
      >
        {isMdUp && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <NumoraDescription />
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
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
                isWalletConnected={walletConnected}
              />
            </Box>

            <ProgressSteps
              selfVerified={selfVerified}
              walletConnected={walletConnected}
            />
          </CustomCard>
        </Box>
      </Box>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "Center",
          alignItems: "center",
          flexDirection: "row",
          gap: 1,
        }}
      >
        <Typography sx={{ fontSize: isMdUp ? 14 : 11 }}>
          ¿Primera vez en Nummora?
        </Typography>
        <Typography
          component="a"
          href="https://self.xyz/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "primary.main",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
            fontSize: isMdUp ? 14 : 11,
          }}
        >
          Aprende más sobre Self
        </Typography>
      </Stack>
      <Typography
        sx={{
          mb: 4,
          fontSize: isMdUp ? 14 : 11,
        }}
      >
        Tu identidad y billetera están protegidas con encriptación de extremo a
        extremo
      </Typography>
    </Box>
  );
};
