"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
    return (
        <section className="min-h-[50vh] bg-[#ECFDF5] p-8 text-[#052E2B]">
            <h2 className="text-2xl font-semibold">Não foi possível carregar esta página</h2>
            <p className="mt-3">Confira sua conexão e tente novamente.</p>

            <button 
                onClick={reset} 
                className="mt-6 cursor-pointer rounded-xl bg-[#0F766E] px-5 py-3 text-white"
            >
                Tentar novamente
            </button>

            <Link href="/login" className="ml-5 text-[#0F766E] underline">Voltar ao login</Link>
        </section>
    );
}
