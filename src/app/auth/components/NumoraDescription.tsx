import PriceLabel from "@/components/atoms/PriceLabel";
import SectionHeader from "@/components/atoms/SectionHeader";
import { ColouredCard } from "@/components/molecules/ColouredCard";
import { Currency } from "@/enums";
import theme from "@/theme/theme";
import { Box, Stack, Typography } from "@mui/material";

export const NumoraDescription = () => {
  return (
    <Box
      sx={{
        marginY: "1%",
        display: "flex",
        justifyContent: "start",
        flexDirection: "column",
        width: "75%",
      }}
    >
      <SectionHeader
        title={"Nummora"}
        titleSize={50}
        subtitle="La plataforma de préstamos P2P más confiable. Conectamos inversionistas con personas que necesitan financiamiento."
        subtitleSize={19}
        sx={{ marginBottom: 5 }}
      />
      <Stack
        sx={{
          display: "flex",
          justifyContent: "Center",
          alignItems: "center",
          flexDirection: "row",
          gap: 3,
        }}
      >
        <ColouredCard
          backgroundColor="#f3faf8ff"
          subtitle="Prestamos Otorgados"
          sx={{
            boxShadow: "0px",
            border: "0px",
          }}
        >
          <PriceLabel
            number={"2.5M+"}
            currency={Currency.COP}
            sx={{
              mb: 0.5,
              color: theme.palette.primary.dark,
            }}
          />
        </ColouredCard>
        <ColouredCard
          backgroundColor="#f3faf8ff"
          subtitle="Rendimiento Promedio"
          sx={{
            boxShadow: "0px",
            border: "0px",
          }}
        >
          <Typography
            color={theme.palette.primary.dark}
            fontWeight={"bold"}
            fontSize={"25px"}
          >
            15%
          </Typography>
        </ColouredCard>
      </Stack>
    </Box>
  );
};
