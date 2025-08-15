import {z} from "zod";
import {LoginSchema} from "@/lib/zod/authShema";

export type UserProfile = {
    name: string;
    avatarUrl?: string;
}

export type LoginFormData = z.infer<typeof LoginSchema>;