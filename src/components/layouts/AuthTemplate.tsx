"use client";

import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { ReactNode } from "react";
import { NumoraDescription } from "@/app/auth/components";

interface AuthTemplateProps {
  children: ReactNode;
}

export const AuthTemplate = ({ children }: AuthTemplateProps) => {
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
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: isMdUp ? "100%" : "80%",
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
            height: "100%",
          }}
        >
          {children}
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
          textAlign: "center",
        }}
      >
        Tu identidad y billetera están protegidas con encriptación de extremo a
        extremo
      </Typography>
    </Box>
  );
};
