import { Suspense, type ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/user";
import { AuthFrame } from "@/components/auth/auth-frame";

async function AuthEntry({ children }: { children: ReactNode }) {
    if (await getCurrentUser()) redirect("/dashboard");
    return children;
}

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <AuthFrame>
            <Suspense fallback={<p role="status">Preparando sua conta…</p>}>
                <AuthEntry>{children}</AuthEntry>
            </Suspense>
        </AuthFrame>
    );
}
