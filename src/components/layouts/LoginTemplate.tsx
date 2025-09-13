"use client";

import { Box, Typography } from "@mui/material";
import { LoginForm } from "@/app/auth/login/components";
import PillButton from "@/components/atoms/PillButton";
import dynamic from "next/dynamic";
import React, { useState } from "react";
// Import dinámico para SelfVerificationButton
const SelfVerificationButton = dynamic(
  () => import("../../../self/frontend/SelfVerificationButton"),
  { ssr: false }
);

// Import dinámico para SelfVerificationStatus
const SelfVerificationStatus = dynamic(
  () => import("../../../self/frontend/SelfVerificationStatus"),
  { ssr: false }
);

export const LoginTemplate = () => {
  const [sessionId, setSessionId] = useState("");

  return (
    <Box>
      <Typography
        variant={"h5"}
        sx={{ textAlign: "center", marginTop: "20px" }}
      >
        Nummora
      </Typography>

      <Typography
        variant={"h3"}
        fontWeight={"bold"}
        sx={{ textAlign: "center", marginTop: "15%" }}
      >
        Bienvenido a Nummora
      </Typography>
   

      <LoginForm />

  
      <PillButton
        sx={{
          mt: 2,
          width: "100%",
          fontWeight: 700,
        }}
      >
        Olvide mi contraseña
      </PillButton>

      <PillButton
        sx={{
          mt: 2,
          width: "100%",
          backgroundColor: "white",
          border: "1px solid #0000001F",
          fontWeight: 700,
        }}
      >
        Crear cuenta
      </PillButton>
       {/* Self QR */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <SelfVerificationButton onSessionId={setSessionId} />
        {sessionId && <SelfVerificationStatus sessionId={sessionId} />}
      </Box>
    </Box>
  );
};
