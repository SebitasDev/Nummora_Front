import { Typography, useMediaQuery, useTheme, Stack } from "@mui/material";
import { CustomCard } from "@/components/atoms/CustomCard";
import SectionHeader from "@/components/atoms/SectionHeader";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DownloadIcon from "@mui/icons-material/Download";

interface QuickActionsCardProps {
  onOpenContract: () => void;
}

export const QuickActionsCard = ({ onOpenContract }: QuickActionsCardProps) => {
  const themeMUI = useTheme();
  const isMdUp = useMediaQuery(themeMUI.breakpoints.up("md"));

  const actions = [
    {
      label: "Ver Contrato",
      icon: <VisibilityOutlinedIcon />,
      onClick: onOpenContract,
    },
    {
      label: "Descargar",
      icon: <DownloadIcon />,
      onClick: () => console.log("Descargar Contrato"),
    },
  ];

  return (
    <CustomCard display="flex" flexDirection="column" gap={3} p={3}>
      <SectionHeader title="Acciones Rápidas" />
      <Stack spacing={1.5}>
        {actions.map((action, index) => (
          <CustomCard
            key={index}
            display="flex"
            alignItems="center"
            gap={1.5}
            p={2}
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#f9fafb",
              },
            }}
            onClick={action.onClick}
          >
            {action.icon}
            <Typography
              variant="body1"
              color="text.secondary"
              fontSize={isMdUp ? 14 : 11}
              fontWeight="bold"
            >
              {action.label}
            </Typography>
          </CustomCard>
        ))}
      </Stack>
    </CustomCard>
  );
};
