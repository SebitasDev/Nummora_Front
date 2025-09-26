import { CustomCard } from "@/components/atoms/CustomCard";
import SectionHeader from "@/components/atoms/SectionHeader";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Theme from "@/theme/theme";
import {
  Avatar,
  Box,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { useShortenedAddress } from "@/app/lender/dashboard/hooks/useShortenedAddress";

interface BorrowerInfoCardProps {
  borrowerName: string;
  score: string;
  paymentAddress: string;
  totalLoans: string;
}

export const BorrowerInfoCard = ({
  borrowerName,
  score,
  paymentAddress,
  totalLoans,
}: BorrowerInfoCardProps) => {
  const theme = Theme;
  const themeMUI = useTheme();
  const isMdUp = useMediaQuery(themeMUI.breakpoints.up("md"));
  const shortenAddress = useShortenedAddress;

  return (
    <CustomCard display="flex" flexDirection="column" gap={3} p={3}>
      <SectionHeader
        title="Información del deudor"
        icon={
          <PersonOutlineIcon
            fontSize="large"
            sx={{ color: theme.palette.secondary.light }}
          />
        }
      />
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          sx={{
            bgcolor: "#f4f5f7",
            color: "#f4f5f7",
            width: { xs: 35, md: 40 },
            height: { xs: 35, md: 40 },
          }}
        />
        <Stack spacing={1}>
          <Typography
            variant="body2"
            color="text.primary"
            fontWeight="bold"
            sx={{
              fontSize: `calc(${theme.fontSize.amountLabel.md} - 0.15rem)`,
              letterSpacing: "-0.5px",
              [themeMUI.breakpoints.down("md")]: {
                fontSize: `calc(${theme.fontSize.amountLabel.xs} - 0.15rem)`,
              },
              width: "fit-content",
            }}
          >
            {borrowerName}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight="bold"
            fontSize={isMdUp ? 14 : 11}
          >
            Score: {score}
          </Typography>
        </Stack>
      </Box>

      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "0.3rem",
        }}
      >
        <Typography
          variant="body1"
          color="text.secondary"
          fontSize={isMdUp ? 14 : 11}
          fontWeight="bold"
        >
          Dirección del pago
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          fontSize={isMdUp ? 14 : 11}
          fontWeight="bold"
        >
          {shortenAddress(paymentAddress)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "0.3rem",
        }}
      >
        <Typography
          variant="body1"
          color="text.secondary"
          fontSize={isMdUp ? 14 : 11}
          fontWeight="bold"
        >
          Total préstamos {totalLoans}
        </Typography>
      </Box>
    </CustomCard>
  );
};
