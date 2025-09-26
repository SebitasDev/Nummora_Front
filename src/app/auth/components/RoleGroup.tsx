import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Control, Controller, FieldErrors, useWatch } from "react-hook-form";
import { LoginFormData } from "@/types";
import { UserRoles } from "@/enums/UserRoles";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";
import { CustomCard } from "@/components/atoms/CustomCard";
import SectionHeader from "@/components/atoms/SectionHeader";

interface RoleGroupProps {
  control: Control<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  onIsRoleSelected: React.Dispatch<React.SetStateAction<boolean>>;
  OnRoleSelected: React.Dispatch<React.SetStateAction<number>>;
  previousStepCompleted?: boolean;
}

export const RoleGroup = ({
  control,
  errors,
  onIsRoleSelected,
  OnRoleSelected,
  previousStepCompleted = true,
}: RoleGroupProps) => {
  const role = useWatch({ control, name: "role" });
  const themeMUI = useTheme();
  const isMdUp = useMediaQuery(themeMUI.breakpoints.up("md"));
  return (
    <Box
      sx={{
        width: "100%",
        px: 1,
        mt: -3,
      }}
    >
      <FormControl fullWidth error={!!errors.role} sx={{ mt: 3 }}>
        <Controller
          name="role"
          defaultValue=""
          control={control}
          render={({ field }) => {
            const getStartIcon = () => {
              if (field.value === UserRoles.Lender.toString()) {
                return <TrendingUpIcon sx={{ color: "#4ade80" }} />;
              }
              if (field.value === UserRoles.Borrower.toString()) {
                return <PersonIcon color="primary" />;
              }
              return null;
            };

            return (
              <TextField
                {...field}
                hiddenLabel
                select
                disabled={!previousStepCompleted}
                fullWidth
                onChange={(event) => {
                  field.onChange(event);
                  OnRoleSelected(Number(event.target.value));
                  onIsRoleSelected(!!event.target.value);
                }}
                InputProps={{
                  startAdornment: field.value ? (
                    <InputAdornment position="start">
                      {getStartIcon()}
                    </InputAdornment>
                  ) : undefined,
                }}
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (value) => {
                    if (value === UserRoles.Lender.toString()) {
                      return "Prestamista";
                    }
                    if (value === UserRoles.Borrower.toString()) {
                      return "Deudor";
                    }
                    return "Selecciona tu rol en la plataforma";
                  },
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: isMdUp ? 18 : 14,
                  },
                }}
              >
                <MenuItem value={UserRoles.Lender.toString()} sx={{ p: 2 }}>
                  <CustomCard
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      border:
                        field.value === UserRoles.Lender.toString()
                          ? "2px solid #4ade80"
                          : "1px solid #e5e7eb",
                      backgroundColor:
                        field.value === UserRoles.Lender.toString()
                          ? "#ecfdf5"
                          : "#fff",
                    }}
                  >
                    <TrendingUpIcon
                      sx={{
                        color:
                          field.value === UserRoles.Lender.toString()
                            ? "#16a34a"
                            : "action.active",
                        mr: 2,
                      }}
                    />
                    <Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        fontSize={isMdUp ? 14 : 11}
                      >
                        Prestamista
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontSize={isMdUp ? 14 : 11}
                      >
                        Invierte tu dinero y obtén rendimientos
                      </Typography>
                    </Box>
                    {field.value === UserRoles.Lender.toString() && (
                      <CheckCircleIcon sx={{ color: "#16a34a", ml: "auto" }} />
                    )}
                  </CustomCard>
                </MenuItem>

                <MenuItem value={UserRoles.Borrower.toString()} sx={{ p: 2 }}>
                  <CustomCard
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      border:
                        field.value === UserRoles.Borrower.toString()
                          ? "2px solid #60a5fa"
                          : "1px solid #e5e7eb",
                      backgroundColor:
                        field.value === UserRoles.Borrower.toString()
                          ? "#eff6ff"
                          : "#fff",
                    }}
                  >
                    <PersonIcon
                      sx={{
                        color:
                          field.value === UserRoles.Borrower.toString()
                            ? "#2563eb"
                            : "action.active",
                        mr: 2,
                      }}
                    />
                    <Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        fontSize={isMdUp ? 14 : 11}
                      >
                        Deudor
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontSize={isMdUp ? 14 : 11}
                      >
                        Solicita préstamos para tus proyectos
                      </Typography>
                    </Box>
                    {field.value === UserRoles.Borrower.toString() && (
                      <CheckCircleIcon sx={{ color: "#2563eb", ml: "auto" }} />
                    )}
                  </CustomCard>
                </MenuItem>
              </TextField>
            );
          }}
        />

        {errors.role?.message && (
          <Box sx={{ color: "error.main", mt: 0.5 }}>{errors.role.message}</Box>
        )}
      </FormControl>
      {role === UserRoles.Lender.toString() && (
        <CustomCard
          sx={{
            mt: 1,
            p: 2,
            display: "flex",
            alignItems: "center",
            border: "1px solid #4ade80",
            backgroundColor: "#ecfdf5",
          }}
        >
          <SectionHeader
            title="Prestamista"
            titleSize={isMdUp ? 18 : 14}
            subtitle="Invierte tu dinero y obtén rendimientos"
            subtitleSize={isMdUp ? 14 : 11}
          />
        </CustomCard>
      )}
      {role === UserRoles.Borrower.toString() && (
        <CustomCard
          sx={{
            mt: 1,
            p: 2,
            display: "flex",
            alignItems: "center",
            border: "1px solid #60a5fa",
            backgroundColor: "#eff6ff",
          }}
        >
          <SectionHeader
            title="Deudor"
            titleSize={isMdUp ? 18 : 14}
            subtitle="Solicita préstamos para tus proyectos"
            subtitleSize={isMdUp ? 14 : 11}
          />
        </CustomCard>
      )}
    </Box>
  );
};
