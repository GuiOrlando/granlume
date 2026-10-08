"use client";

import { useActionState } from "react";
import { logout } from "@/app/actions/auth";
import { initialAuthState } from "@/lib/auth/types";

export function LogoutButton() {
    const [state, action, pending] = useActionState(logout, initialAuthState);
    return (
        <form action={action}>
            <button disabled={pending} className="cursor-pointer rounded-xl border border-[#0F766E]/30 bg-white px-4 py-2 text-sm font-medium text-[#052E2B] hover:bg-[#A7F3D0]/30 disabled:cursor-wait disabled:opacity-60">{pending ? "Saindo…" : "Sair"}</button>
            {state.message && <p role="alert" className="mt-2 text-sm text-red-800">{state.message}</p>}
        </form>
    );
}
