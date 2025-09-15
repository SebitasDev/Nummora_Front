import { Box, BoxProps, Typography } from "@mui/material";
import React from "react";

interface SectionHeaderProps extends BoxProps {
  title: string;
  subtitle?: string;
  titleSize?: number | string;
  subtitleSize?: number | string;
  icon?: React.ReactNode;
  titleColor?: string;
  subtitleColor?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  titleSize,
  subtitleSize,
  icon,
  titleColor,
  subtitleColor,
  sx,
  ...rest
}: SectionHeaderProps) {
  return (
    <Box sx={{ ...sx }} {...rest}>
      <Box display="flex" alignItems="center" gap={1}>
        {icon}
        <Typography
          variant="h5"
          fontWeight="bold"
          color={titleColor || "text.primary"}
          sx={{
            lineHeight: 1.2,
            fontSize: titleSize,
          }}
        >
          {title}
        </Typography>
      </Box>
      {subtitle && (
        <Typography
          variant="body2"
          mt={0.5}
          sx={{
            fontWeight: "600",
            color: subtitleColor || "gray",
            fontSize: subtitleSize,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
