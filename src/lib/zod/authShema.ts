import {z} from "zod";
import {UserRoles} from "@/enums/UserRoles";

export const LoginSchema = z.object({
    username: z.string().min(1, "El usuario es requerido"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
    role: z.enum([UserRoles.Borrower.toString(), UserRoles.Lender.toString()], {
        required_error: "El rol es requerido",
    })
});