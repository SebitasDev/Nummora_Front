import { Box, Typography, useMediaQuery, useTheme, Stack } from "@mui/material";
import Theme from "@/theme/theme";
import { CustomCard } from "@/components/atoms/CustomCard";
import SectionHeader from "@/components/atoms/SectionHeader";

export const ContractInfoCard = () => {
  const themeMUI = useTheme();
  const isMdUp = useMediaQuery(themeMUI.breakpoints.up("md"));
  const theme = Theme;

  const loanDetails = [
    { label: "Numero:", value: "CNT-2024-001" },
    { label: "Fecha de Firma:", value: "2024-01-14" },
    { label: "Primer Pago:", value: "2024-02-14" },
    {
      label: "Estado legal:",
      value: "Valido",
      color: theme.palette.primary.dark,
    },
  ];

  return (
    <CustomCard display="flex" flexDirection="column" gap={3} p={3}>
      <SectionHeader title="Informacion del Contrato" />
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
              color={detail?.color || "text.secondary"}
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
