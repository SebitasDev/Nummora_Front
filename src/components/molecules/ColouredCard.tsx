import { Box, BoxProps, Typography } from "@mui/material";
import { CustomCard } from "../atoms/CustomCard";
import { useStyles } from "@/hooks/useStyles";

interface ColouredCardProps extends BoxProps {
  backgroundColor: string;
  subtitle: string;
}

export const ColouredCard = ({
  backgroundColor,
  subtitle,
  children,
  sx,
  ...rest
}: ColouredCardProps) => {
  const { theme, isMdDown } = useStyles();
  return (
    <Box width="100%" sx={{ ...sx }} {...rest}>
      <CustomCard
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        sx={{
          p: 2,
          borderRadius: "8px",
          height: "100px",
          backgroundColor: backgroundColor,
          borderColor: backgroundColor,
        }}
      >
        {children}
        <Typography
          variant="h6"
          fontSize={
            isMdDown ? theme.fontSize.labels.xs : theme.fontSize.labels.md
          }
          color={"gray"}
        >
          {subtitle}
        </Typography>
      </CustomCard>
    </Box>
  );
};
