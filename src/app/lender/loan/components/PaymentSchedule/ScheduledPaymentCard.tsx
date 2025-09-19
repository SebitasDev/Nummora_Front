import { CustomCard } from "@/components/atoms/CustomCard";
import PriceLabel from "@/components/atoms/PriceLabel";
import { Currency } from "@/enums";
import {
  Avatar,
  Box,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Theme from "@/theme/theme";
import { CustomChip } from "@/components/atoms/CustomChip";

interface ScheduledPaymentCardProps {
  value: string;
  date: string;
  quotaNumber: string;
}

export const ScheduledPaymentCard = ({
  value,
  date,
  quotaNumber,
}: ScheduledPaymentCardProps) => {
  const themeMUI = useTheme();
  const isMdUp = useMediaQuery(themeMUI.breakpoints.up("md"));
  const theme = Theme;
  return (
    <CustomCard
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        borderWidth: 1,
        borderStyle: "solid",
        px: 2,
        py: 4.6,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "0.3rem",
        }}
        position={"initial"}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            sx={{
              backgroundColor: "#eaf4fd",
              color: theme.palette.secondary.light,
              width: {
                xs: 35,
                md: 40,
              },
              height: {
                xs: 35,
                md: 40,
              },
            }}
          >
            <CalendarTodayIcon sx={{ color: theme.palette.secondary.light }} />
          </Avatar>
          <Stack spacing={1}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: `calc(${theme.fontSize.amountLabel.md} - 0.15rem)`,
                letterSpacing: "-0.5px",
                [themeMUI.breakpoints.down("md")]: {
                  fontSize: `calc(${theme.fontSize.amountLabel.xs} - 0.15rem)`,
                },
                width: "fit-content",
              }}
            >
              {quotaNumber}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              fontSize={isMdUp ? 14 : 11}
            >
              {date}
            </Typography>
          </Stack>
        </Box>
        <Box>
          <Stack spacing={1} alignItems="center">
            <PriceLabel
              number={value}
              currency={Currency.COP}
              sx={{
                fontSize: `calc(${theme.fontSize.amountLabel.md} - 0.15rem)`,
                letterSpacing: "-0.5px",
                [themeMUI.breakpoints.down("md")]: {
                  fontSize: `calc(${theme.fontSize.amountLabel.xs} - 0.15rem)`,
                },
                width: "fit-content",
              }}
            />

            <CustomChip
              fontSizeXs={"12px"}
              fontSizeMd={"14px"}
              sx={{
                backgroundColor: "#ffffff",
                border: "1px solid #E0E0E0",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
                color: "#000000",
                px: isMdUp ? 2 : 1.5,
                py: 0.3,
                borderRadius: "20px",
              }}
            >
              Pendiente
            </CustomChip>
          </Stack>
        </Box>
      </Box>
    </CustomCard>
  );
};
