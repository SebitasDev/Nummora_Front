import { Avatar, Box, Typography } from "@mui/material";

interface StepLabelProps {
  number: number;
  title: string;
}

export const StepLabel = ({ number, title }: StepLabelProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        width: "100%",
        gap: 1.5,
        marginTop: "1%",
      }}
    >
      <Avatar
        sx={{
          bgcolor: "grey.200",
          color: "grey.800",
          width: 24,
          height: 24,
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        {number}
      </Avatar>
      <Typography variant="body1" fontWeight={500} color="text.primary">
        {title}
      </Typography>
    </Box>
  );
};
