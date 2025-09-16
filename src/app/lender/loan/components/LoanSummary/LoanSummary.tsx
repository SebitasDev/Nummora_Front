import { CustomCard } from "@/components/atoms/CustomCard";
import SectionHeader from "@/components/atoms/SectionHeader";
import PriceLabel from "@/components/atoms/PriceLabel";
import { LoanDetail } from "./LoanDetail";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Theme from "@/theme/theme";
import { Currency } from "@/enums";
import { CustomChip } from "@/components/atoms/CustomChip";

export const LoanSummary = () => {
  const themeMUI = useTheme();
  const isMdUp = useMediaQuery(themeMUI.breakpoints.up("md"));
  const theme = Theme;
  return (
    <CustomCard
      sx={{
        gap: 2,
        p: 3,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateAreas: `
            "header header"
            "leftCol rightCol"
          `,
      }}
    >
      <Box sx={{ gridArea: "header" }}>
        <SectionHeader
          title="Resumen del Prestamo"
          subtitle="Informacion principal del prestamo aprobado"
          icon={
            <TrendingUpIcon
              fontSize="large"
              sx={{ color: theme.palette.secondary.light }}
            />
          }
        />
      </Box>
      <Box
        gridArea={"leftCol"}
        display={"flex"}
        alignItems={"start"}
        justifyContent={"center"}
        flexDirection={"column"}
        sx={{
          borderRadius: "8px",
          height: "auto",
        }}
      >
        <LoanDetail
          title="Monto del Prestamo"
          content={
            <PriceLabel
              number="75.900"
              currency={Currency.COP}
              sx={{
                color: "#2A66EB",
              }}
            />
          }
        />
        <LoanDetail
          title="Porcentaje de Ganancia"
          content={
            <Typography
              variant="body2"
              noWrap
              color={theme.palette.primary.dark}
              sx={{
                fontFamily: "Inter",
                fontWeight: 800,
                fontSize: theme.fontSize.amountLabel.md,
                lineHeight: 1,
                letterSpacing: "0.02em",
                textAlign: "inherit",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                cursor: "default",
                [themeMUI.breakpoints.down("md")]: {
                  fontSize: theme.fontSize.amountLabel.xs,
                },
              }}
            >
              15.5%
            </Typography>
          }
        />
        <LoanDetail
          title="Proposito"
          content={
            <Typography fontWeight={600} fontSize={isMdUp ? 18 : 16}>
              Consolidacion de deudas
            </Typography>
          }
        />
      </Box>
      <Box
        gridArea={"rightCol"}
        display={"flex"}
        alignItems={"start"}
        justifyContent={"center"}
        flexDirection={"column"}
        sx={{
          borderRadius: "8px",
          height: "auto",
        }}
      >
        <LoanDetail
          title="Plazo"
          content={
            <Typography fontWeight={600} fontSize={isMdUp ? 18 : 16}>
              18 meses
            </Typography>
          }
        />
        <LoanDetail
          title="Cuota Mensual"
          content={
            <PriceLabel
              number="5.900"
              currency={Currency.COP}
              sx={{
                color: "#A355ED",
              }}
            />
          }
        />
        <LoanDetail
          title="Referencia"
          content={
            <CustomChip
              fontSizeXs={"12px"}
              fontSizeMd={"14px"}
              sx={{
                backgroundColor: "#eaf4fd",
                color: theme.palette.secondary.light,
                px: isMdUp ? 2 : 1.5,
                py: 0.3,
                borderRadius: "20px",
              }}
            >
              Completado
            </CustomChip>
          }
        />
      </Box>
    </CustomCard>
  );
};
