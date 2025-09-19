import { Box, Typography } from "@mui/material";

interface PaymentDetailProps {
  title: string;
  content: React.ReactNode;
}

export const LoanDetail = ({ title, content }: PaymentDetailProps) => {
  return (
    <Box mb={1}>
      <Typography
        variant="body2"
        mt={0.5}
        sx={{
          fontWeight: "600",
          color: "gray",
        }}
      >
        {title}
      </Typography>
      {content}
    </Box>
  );
};
