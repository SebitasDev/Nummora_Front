"use client";

import React, { useEffect } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

interface ProgressStepsProps {
  selfVerified: boolean;
  walletConnected: boolean;
  roleSelected: boolean;
  onAllStepsCompleted?: () => void;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  selfVerified,
  walletConnected,
  roleSelected,
  onAllStepsCompleted,
}) => {
  let completedSteps = 0;
  if (roleSelected) completedSteps += 1;
  if (selfVerified) completedSteps += 1;
  if (walletConnected) completedSteps += 1;

  const totalSteps = 3;
  const progress = (completedSteps / totalSteps) * 100;
  useEffect(() => {
    if (completedSteps === totalSteps) {
      onAllStepsCompleted?.();
    }
  }, [completedSteps]);

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
