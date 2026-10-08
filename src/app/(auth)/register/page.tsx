import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = { title: "Criar conta | Granlume" };

export default function RegisterPage() {
    return <AuthForm mode="register" />;
}