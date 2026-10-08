"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, register } from "@/app/actions/auth";
import { initialAuthState } from "@/lib/auth/types";

const inputClass = "mt-2 w-full rounded-xl border border-[#0F766E]/30 bg-white px-4 py-3 text-[#052E2B] outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#34D399]/40";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
    const isRegister = mode === "register";
    const [state, formAction, pending] = useActionState(isRegister ? register : login, initialAuthState);

    return (
        <>
            <h2 className="text-3xl font-semibold tracking-tight">{isRegister ? "Comece pelo seu futuro" : "Bem-vindo de volta"}</h2>
            <p className="mt-3 mb-8 text-[#0F766E]">{isRegister ? "Crie sua conta no Granlume." : "Entre para acompanhar sua vida financeira."}</p>

            <form action={formAction} className="space-y-5" aria-busy={pending}>
                <fieldset disabled={pending} className="space-y-5 disabled:opacity-70">
                    {isRegister && <label className="block text-sm font-medium" htmlFor="name">Nome
                        <input id="name" name="name" autoComplete="name" required minLength={2} maxLength={80} className={inputClass} />
                    </label>}

                    <label className="block text-sm font-medium" htmlFor="email">E-mail
                        <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="voce@exemplo.com" className={inputClass} />
                    </label>

                    <label className="block text-sm font-medium" htmlFor="password">Senha
                        <input id="password" name="password" type="password" autoComplete={isRegister ? "new-password" : "current-password"} required minLength={isRegister ? 8 : undefined} maxLength={72} aria-describedby={isRegister ? "password-help" : undefined} className={inputClass} />
                    </label>

                    {isRegister && <>
                        <p id="password-help" className="text-xs text-[#0F766E]">Pelo menos 8 caracteres, respeitando o limite de 72 bytes.</p>
                        <label className="block text-sm font-medium" htmlFor="confirmation">Confirme a senha
                            <input id="confirmation" name="confirmation" type="password" autoComplete="new-password" required minLength={8} maxLength={72} className={inputClass} />
                        </label>
                    </>}

                    <button type="submit" className="w-full cursor-pointer rounded-xl bg-[#0F766E] px-4 py-3 font-semibold text-white transition hover:bg-[#052E2B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E] disabled:cursor-wait">
                        {pending ? "Aguarde…" : isRegister ? "Criar minha conta" : "Entrar"}
                    </button>
                </fieldset>

            {state.message && <p role={state.status === "error" ? "alert" : "status"} className={`rounded-xl border p-4 text-sm leading-relaxed ${state.status === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-[#A7F3D0] bg-[#A7F3D0]/40 text-[#052E2B]"}`}>{state.message}</p>}
        </form>

            <p className="mt-7 text-center text-sm text-[#0F766E]">
                {isRegister ? "Já tem uma conta? " : "Ainda não tem uma conta? "}
                <Link 
                    href={isRegister ? "/login" : "/register"} 
                    className="font-semibold underline underline-offset-4"
                >
                    {isRegister ? "Entrar" : "Cadastre-se"}
                </Link>
            </p>
        </>
    );
}
