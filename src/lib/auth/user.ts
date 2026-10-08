import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const getCurrentUser = cache(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error && (!error.status || error.status >= 500)) {
        throw new Error("Não foi possível verificar a sessão. Tente novamente em instantes.");
    }

    if (error || !data.user) return null;

    const name = data.user.user_metadata?.full_name;

    return {
        id: data.user.id,
        email: data.user.email ?? "",
        name: typeof name === "string" ? name.slice(0, 80) : "",
    };
});

export async function requireUser() {
    const user = await getCurrentUser();
    if (!user) redirect("/login");
    return user;
}