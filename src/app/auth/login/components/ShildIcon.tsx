import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import { Box, BoxProps } from "@mui/material";

export const ShieldIcon = ({ sx, ...rest }: BoxProps) => {
  return (
    <Box
      sx={{
        borderRadius: 5,
        background: "linear-gradient(90deg, #00C853, #2979FF)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
        p: 2,
      }}
      {...rest}
    >
      <ShieldOutlinedIcon sx={{ fontSize: 60, color: "white" }} />
    </Box>
  );
};
