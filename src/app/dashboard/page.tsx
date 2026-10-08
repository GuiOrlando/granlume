import { Suspense } from "react";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/user";
import { LogoutButton } from "@/components/auth/logout-button";

export const metadata: Metadata = { title: "Dashboard | Granlume" };

async function DashboardContent() {
    const user = await requireUser();

    return (
        <main className="min-h-screen bg-[#ECFDF5] text-[#052E2B]">
            <header className="border-b border-[#A7F3D0] bg-white px-6 py-5">
                <div className="mx-auto flex max-w-5xl items-center justify-between gap-4"><span className="text-xl font-semibold">Granlume</span><LogoutButton /></div>
            </header>

            <section className="mx-auto max-w-5xl px-6 py-12">
                <p className="text-sm font-medium uppercase tracking-widest text-[#0F766E]">Sua visão financeira</p>
                <h1 className="mt-3 text-3xl font-semibold">Olá{user.name ? `, ${user.name}` : ""}.</h1>
                <p className="mt-3 text-[#0F766E]">Vamos dar clareza ao seu dinheiro, um passo de cada vez.</p>
                
                <div className="mt-9 rounded-2xl border border-[#A7F3D0] bg-white p-6">
                    <h2 className="text-lg font-semibold">Sua conta está pronta</h2>
                    <p className="mt-2 text-sm text-[#0F766E]">Você está conectado como <span className="font-medium break-all">{user.email}</span>.</p>
                    <p className="mt-4 text-sm leading-relaxed">O próximo passo será cadastrar suas contas e os primeiros lançamentos. Seus indicadores aparecerão aqui conforme você organizar suas finanças.</p>
                </div>
            </section>
        </main>
    );
}

export default function DashboardPage() {
    return <Suspense fallback={<main className="min-h-screen bg-[#ECFDF5] p-8 text-[#052E2B]"><p role="status">Carregando seu dashboard…</p></main>}><DashboardContent /></Suspense>;
}
