import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = { title: "Entrar | Granlume" };
type LoginProps = { searchParams: Promise<{ status?: string | string[] }> };

async function LoginContent({ searchParams }: LoginProps) {
    const query = await searchParams;

    return (
        <>
            {query.status === "confirmation-error" && <p role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">O link de confirmação é inválido, expirou ou já foi utilizado. Se já confirmou o e-mail, tente entrar.</p>}

            <AuthForm mode="login" />
        </>
    );
}

export default function LoginPage(props: LoginProps) {
    return <Suspense fallback={<p role="status">Carregando login…</p>}><LoginContent {...props} /></Suspense>;
}