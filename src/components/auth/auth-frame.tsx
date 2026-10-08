import type { ReactNode } from "react";

export function AuthFrame({ children }: { children: ReactNode }) {
    return (
        <main className="min-h-screen bg-[#ECFDF5] text-[#052E2B] lg:grid lg:grid-cols-2">
            <aside className="flex flex-col justify-between bg-[#052E2B] p-8 text-[#ECFDF5] lg:min-h-screen lg:p-16">
                <div className="flex items-center gap-3 text-xl font-semibold tracking-tight">
                    <span aria-hidden="true" className="grid size-10 place-items-center rounded-xl bg-[#34D399] text-[#052E2B]">G</span>
                        Granlume
                </div>

                <div className="my-10 max-w-md lg:my-20">
                    <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#A7F3D0]">Seu dinheiro, com clareza</p>
                    <h1 className="text-4xl font-semibold leading-tight lg:text-5xl">Cuide do presente.<br />Planeje o futuro.</h1>
                    <p className="mt-6 text-base leading-relaxed text-[#A7F3D0]">Um lugar para organizar suas contas, acompanhar seus cartões e construir seus objetivos.</p>
                </div>

                <p className="hidden text-sm text-[#A7F3D0] lg:block">Clareza para cuidar do seu dinheiro.</p>
            </aside>

            <section className="flex items-center justify-center px-6 py-12 lg:px-12">
                <div className="w-full max-w-md">{children}</div>
            </section>
        </main>
    );
}
