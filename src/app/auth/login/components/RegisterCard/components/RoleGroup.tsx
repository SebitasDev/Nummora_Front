import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { LoginFormData } from "@/types";
import { UserRoles } from "@/enums/UserRoles";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";

interface RoleGroupProps {
  control: Control<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  onRoleSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RoleGroup = ({
  control,
  errors,
  onRoleSelected,
}: RoleGroupProps) => {
  return (
    <FormControl fullWidth error={!!errors.role} sx={{ mt: 3, px: 1 }}>
      <Controller
        name="role"
        defaultValue=""
        control={control}
        render={({ field }) => {
          const getStartIcon = () => {
            if (field.value === UserRoles.Lender.toString()) {
              return <TrendingUpIcon color="success" />;
            }
            if (field.value === UserRoles.Borrower.toString()) {
              return <PersonIcon color="primary" />;
            }
            return null;
          };

          return (
            <TextField
              {...field}
              select
              label="Selecciona tu rol en la plataforma"
              fullWidth
              onChange={(event) => {
                field.onChange(event);
                onRoleSelected(!!event.target.value);
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
            >
              {/* Prestamista */}
              <MenuItem value={UserRoles.Lender.toString()} sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    p: 1.5,
                    borderRadius: 2,
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
                    <Typography variant="subtitle1" fontWeight="bold">
                      Prestamista
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Invierte tu dinero y obtén rendimientos
                    </Typography>
                  </Box>
                  {field.value === UserRoles.Lender.toString() && (
                    <CheckCircleIcon sx={{ color: "#16a34a", ml: "auto" }} />
                  )}
                </Box>
              </MenuItem>

              {/* Deudor */}
              <MenuItem value={UserRoles.Borrower.toString()} sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    p: 1.5,
                    borderRadius: 2,
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
                    <Typography variant="subtitle1" fontWeight="bold">
                      Deudor
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Solicita préstamos para tus proyectos
                    </Typography>
                  </Box>
                  {field.value === UserRoles.Borrower.toString() && (
                    <CheckCircleIcon sx={{ color: "#2563eb", ml: "auto" }} />
                  )}
                </Box>
              </MenuItem>
            </TextField>
          );
        }}
      />

      {errors.role?.message && (
        <Box sx={{ color: "error.main", fontSize: 13, mt: 0.5 }}>
          {errors.role.message}
        </Box>
      )}
    </FormControl>
  );
};
