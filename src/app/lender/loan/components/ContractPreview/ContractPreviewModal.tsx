import { Box, Typography, useMediaQuery, useTheme, Stack } from "@mui/material";
import Theme from "@/theme/theme";
import { CustomCard } from "@/components/atoms/CustomCard";
import SectionHeader from "@/components/atoms/SectionHeader";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

export const ContractPreview = () => {
  const themeMUI = useTheme();
  const isMdUp = useMediaQuery(themeMUI.breakpoints.up("md"));

  return (
    <CustomCard display="flex" flexDirection="column" gap={3} p={3}>
      <SectionHeader
        title="Vista Previa del Contrato"
        icon={<DescriptionOutlinedIcon sx={{ color: "#C084FC" }} />}
      />
      <Typography variant="body2" color="text.secondary">
        Contrato firmado el 2024-01-14
      </Typography>
      <CustomCard
        sx={{
          border: "2px dashed #E5E7EB",
          backgroundColor: "#F9FAFB",
        }}
      >
        <Typography
          component="pre"
          sx={{
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
            fontSize: isMdUp ? "14px" : "12px",
            color: "text.primary",
          }}
        >
          {`CONTRATO DE PRÉSTAMO P2P

Prestamista: Nummora Platform
Prestatario: Carlos Rodríguez
Monto: $75,000
Tasa: 15.5% anual
Plazo: 18 meses
Cuota: $5,200 mensual

TÉRMINOS Y CONDICIONES:
1. El prestatario se compromete a pagar...
2. Los pagos se realizarán mensualmente...
3. En caso de incumplimiento...

[Documento completo disponible para descarga]`}
        </Typography>
      </CustomCard>

      <Stack direction={isMdUp ? "row" : "column"} spacing={2}>
        <CustomCard
          display="flex"
          alignItems="center"
          gap={1}
          p={2}
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#f9fafb",
            },
          }}
        >
          <DownloadOutlinedIcon fontSize="small" />
          <Typography fontWeight="bold" fontSize={isMdUp ? 14 : 12}>
            Descargar Contrato Completo
          </Typography>
        </CustomCard>

        <CustomCard
          display="flex"
          alignItems="center"
          gap={1}
          p={2}
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#f9fafb",
            },
          }}
        >
          <ArticleOutlinedIcon fontSize="small" />
          <Typography fontWeight="bold" fontSize={isMdUp ? 14 : 12}>
            Ver Términos Legales
          </Typography>
        </CustomCard>
      </Stack>
    </CustomCard>
  );
};
