import { Box, Typography, useMediaQuery, useTheme, Stack } from "@mui/material";
import Theme from "@/theme/theme";
import { CustomCard } from "@/components/atoms/CustomCard";
import SectionHeader from "@/components/atoms/SectionHeader";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { CustomChip } from "@/components/atoms/CustomChip";

export const RiskEvaluationCard = () => {
  const themeMUI = useTheme();
  const isMdUp = useMediaQuery(themeMUI.breakpoints.up("md"));
  const theme = Theme;

  const riskDetails = [
    { label: "Score Crediticio:", value: "680/850" },
    { label: "Ratio Deuda/Ingreso:", value: "35%" },
    {
      label: "Historial de Pagos:",
      value: "Excelente",
      color: theme.palette.success.main,
    },
  ];

  return (
    <CustomCard display="flex" flexDirection="column" gap={3} p={3}>
      <SectionHeader
        title="Evaluación de Riesgo"
        icon={<WarningAmberIcon sx={{ color: theme.palette.warning.light }} />}
      />
      <Box
        sx={{
          width: "fit-content",
          display: "flex",
          margin: "0 auto",
        }}
      >
        <CustomChip
          fontSizeXs={"11px"}
          fontSizeMd={"14px"}
          sx={{
            backgroundColor: "#FFFDBD",
            color: "#7B491F",
            px: isMdUp ? 2 : 1.5,
            py: 0.3,
            borderRadius: "20px",
          }}
        >
          Riesgo Medio
        </CustomChip>
      </Box>
      <Stack spacing={2}>
        {riskDetails.map((detail, index) => (
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
