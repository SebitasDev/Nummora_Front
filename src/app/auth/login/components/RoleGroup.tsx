import {Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {Control, Controller, FieldErrors} from "react-hook-form";
import {LoginFormData} from "@/types";
import {UserRoles} from "@/enums/UserRoles";

interface RoleGroupProps {
    control: Control<LoginFormData>;
    errors: FieldErrors<LoginFormData>;
}

export const RoleGroup = (
    { control, errors }: RoleGroupProps
) => {
    
    return (
        <FormControl error={!!errors.role} sx={{ mt: 3, px: 1 }}>
            <FormLabel id="role-group-label">Iniciar como</FormLabel>

            <Controller
                name="role"
                defaultValue="1"
                control={control}
                render={({ field }) => (
                    <RadioGroup
                        {...field}
                        row
                        aria-labelledby="role-group-label"
                    >
                        <FormControlLabel value={UserRoles.Borrower.toString()} control={<Radio />} label="Deudor" />
                        <FormControlLabel value={UserRoles.Lender.toString()} control={<Radio />} label="Prestamista" />
                    </RadioGroup>
                )}
            />

            {errors.role?.message && (
                <Box sx={{ color: "error.main", fontSize: 13, mt: 0.5 }}>
                    {errors.role.message}
                </Box>
            )}
        </FormControl>
    );
}