import { Avatar, Box, Typography, TypographyProps, Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CustomChip } from "@/components/atoms/CustomChip";
import theme from "@/theme/theme";

interface StepLabelProps extends TypographyProps {
  number: number;
  title: string;
  isDone?: boolean;
}

export const StepLabel = ({
  number,
  title,
  isDone = false,
  sx,
  ...rest
}: StepLabelProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        gap: 1.5,
        marginY: "1%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {isDone ? (
          <CheckCircleIcon
            sx={{ color: theme.palette.primary.dark, fontSize: 24 }}
          />
        ) : (
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
        )}

        <Typography
          variant="body1"
          fontWeight={500}
          color="text.primary"
          sx={{ ...sx }}
          {...rest}
        >
          {title}
        </Typography>
      </Box>
      {isDone && (
        <CustomChip
          sx={{
            color: theme.palette.primary.dark,
            backgroundColor: theme.palette.primary.background,
            fontWeight: 500,
            p: 0.3,
            px: 0.6,
          }}
        >
          Completado
        </CustomChip>
      )}
    </Box>
  );
};
