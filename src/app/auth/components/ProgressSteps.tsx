"use client";

import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

interface ProgressStepsProps {
  selfVerified: boolean;
  walletConnected?: boolean;
  roleSelected?: boolean;
}

export const ProgressSteps = ({
  selfVerified,
  walletConnected = false,
  roleSelected,
}: ProgressStepsProps) => {
  let completedSteps = 0;

  const includeRoleStep = roleSelected !== undefined;
  const totalSteps = includeRoleStep ? 3 : 2;

  if (includeRoleStep && roleSelected) completedSteps += 1;
  if (selfVerified) completedSteps += 1;
  if (walletConnected) completedSteps += 1;

  const progress = (completedSteps / totalSteps) * 100;

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 0.5,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Progreso
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {completedSteps}/{totalSteps}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 10,
          borderRadius: 5,
          [`& .MuiLinearProgress-bar`]: {
            borderRadius: 5,
            background: "linear-gradient(90deg, #00C853, #2979FF)",
          },
        }}
      />
    </Box>
  );
};
