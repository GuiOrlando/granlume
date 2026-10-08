"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { readText, validateCredentials, validateRegistration } from "@/lib/auth/validation";
import type { AuthState } from "@/lib/auth/types";

function failure(message: string): AuthState {
    return { status: "error", message };
}

function authError(code?: string): string {
    if (code === "email_not_confirmed") return "Confirme seu e-mail antes de entrar.";

    if (code === "over_email_send_rate_limit" || code === "over_request_rate_limit") {
        return "Muitas tentativas em pouco tempo. Aguarde e tente novamente.";
    }

    if (code === "email_address_not_authorized") {
        return "O envio para este endereço ainda não está habilitado. Confira as configurações de e-mail do projeto.";
    }

    if (code === "weak_password") return "A senha não atende aos requisitos de segurança. Escolha outra senha.";
    if (code === "signup_disabled") return "O cadastro está temporariamente indisponível.";

    return "Não foi possível concluir a solicitação. Tente novamente em instantes.";
}

export async function login(_state: AuthState, formData: FormData): Promise<AuthState> {
    const email = readText(formData, "email").trim().toLowerCase();
    const password = readText(formData, "password");
    const validation = validateCredentials(email, password);

    if (validation) return failure(validation);

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return failure(error.code === "invalid_credentials" ? "E-mail ou senha incorretos." : authError(error.code));
    }

    revalidatePath("/", "layout");
    redirect("/dashboard");
}

export async function register(_state: AuthState, formData: FormData): Promise<AuthState> {
    const name = readText(formData, "name").trim();
    const email = readText(formData, "email").trim().toLowerCase();
    const password = readText(formData, "password");
    const confirmation = readText(formData, "confirmation");
    const validation = validateCredentials(email, password) ?? validateRegistration(name, password, confirmation);

    if (validation) return failure(validation);

    const siteUrl = process.env.SITE_URL;

    if (!siteUrl) return failure("O endereço do aplicativo ainda não foi configurado.");
    let confirmationUrl: string;

    try {
        const base = new URL(siteUrl);
        if (base.protocol !== "http:" && base.protocol !== "https:") return failure("Endereço do aplicativo inválido.");
        confirmationUrl = new URL("/auth/confirm", base).toString();
    } catch {
        return failure("Endereço do aplicativo inválido.");
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name }, emailRedirectTo: confirmationUrl },
    });

    if (error && error.code !== "user_already_exists" && error.code !== "email_exists") {
        return failure(authError(error.code));
    }

    if (data.session) {
        revalidatePath("/", "layout");
        redirect("/dashboard");
    }

    return {
        status: "success",
        message: "Se o cadastro puder ser concluído, você receberá um e-mail de confirmação. Confira sua caixa de entrada e o spam. Se já possui conta, entre pelo login.",
    };
}

export async function logout(): Promise<AuthState> {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut({ scope: "local" });

    if (error) return failure("Não foi possível sair. Tente novamente.");

    revalidatePath("/", "layout");
    redirect("/login");
}
