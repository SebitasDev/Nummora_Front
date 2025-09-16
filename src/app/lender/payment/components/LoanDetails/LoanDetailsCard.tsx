import { Box, Typography, useMediaQuery, useTheme, Stack } from "@mui/material";
import { CustomCard } from "@/components/atoms/CustomCard";
import SectionHeader from "@/components/atoms/SectionHeader";

export const LoanDetailsCard = () => {
  const themeMUI = useTheme();
  const isMdUp = useMediaQuery(themeMUI.breakpoints.up("md"));

  const loanDetails = [
    { label: "ID del Préstamo:", value: "LOAN-2024-001" },
    { label: "Tasa de Interés:", value: "12.5%" },
    { label: "Plazo:", value: "12 meses" },
    { label: "Cuota Mensual:", value: "$8.900" },
  ];

  return (
    <CustomCard display="flex" flexDirection="column" gap={3} p={3}>
      <SectionHeader title="Detalles del Préstamo" />
      <Stack spacing={2}>
        {loanDetails.map((detail, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              fontWeight="bold"
              fontSize={isMdUp ? 14 : 11}
            >
              {detail.label}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              fontSize={isMdUp ? 14 : 11}
              fontWeight="bold"
            >
              {detail.value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </CustomCard>
  );
};
