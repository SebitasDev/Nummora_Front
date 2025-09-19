"use client";

import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import {
  ImportantInfo,
  IndividualLoans,
  InvestConfiguration,
  InvestConfirmation,
  ProfitCalculator,
} from "@/app/lender/invest/components";
export const InvestTemplate = () => {
  const themeMUI = useTheme();
  const isMobile = useMediaQuery(themeMUI.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "grid",
        gap: 3.5,
        gridTemplateColumns: {
          xs: "1fr",
          lg: "1fr 450px",
        },
        [themeMUI.breakpoints.down("md")]: {
          gap: 1.7,
        },
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      {/* Columna izquierda - Ocupa el espacio restante */}
      <Box
        sx={{
          gridColumn: {
            xs: "1 / -1",
            lg: "1",
          },
          display: "flex",
          flexDirection: "column",
          gap: 3.5,
          [themeMUI.breakpoints.down("md")]: {
            gap: 1.7,
          },
          minWidth: 0,
          maxWidth: "100%",
        }}
      >
        {/* Configurar mi inversion */}
        <Box sx={{ order: { xs: 0, md: 0 }, minWidth: 0 }}>
          <InvestConfiguration />
        </Box>

        {/* Calculadora de ganancias - SOLO EN MÓVIL */}
        {isMobile && (
          <Box sx={{ order: 1, minWidth: 0 }}>
            <ProfitCalculator />
          </Box>
        )}

        {/* Informacion importante - SOLO EN MÓVIL */}
        {isMobile && (
          <Box sx={{ order: 2, minWidth: 0 }}>
            <ImportantInfo />
          </Box>
        )}

        {/* Botón de confirmar inversión - SOLO EN MÓVIL */}
        {isMobile && (
          <Box sx={{ order: 3, minWidth: 0 }}>
            <InvestConfirmation />
          </Box>
        )}

        {/* Prestamos individuales */}
        <Box sx={{ order: { xs: 4, md: 1 }, minWidth: 0 }}>
          <IndividualLoans />
        </Box>
      </Box>

      {/* Columna derecha - Ancho fijo de 450px - SOLO EN DESKTOP */}
      {!isMobile && (
        <Box
          sx={{
            gridColumn: "2",
            display: "flex",
            flexDirection: "column",
            gap: 3.5,
            minWidth: 0,
            maxWidth: "450px",
          }}
        >
          {/* Calculadora de ganancias - SOLO EN DESKTOP */}
          <ProfitCalculator />

          {/* Informacion importante - SOLO EN DESKTOP */}
          <ImportantInfo />

          {/* Botón de confirmar inversión - SOLO EN DESKTOP */}
          <InvestConfirmation />
        </Box>
      )}
    </Box>
  );
};
