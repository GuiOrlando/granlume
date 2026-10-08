import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
    const tokenHash = request.nextUrl.searchParams.get("token_hash");
    const type = request.nextUrl.searchParams.get("type");

    let path = "/login?status=confirmation-error";

    if (tokenHash && tokenHash.length <= 256 && type === "email") {
        const supabase = await createClient();
        const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: "email" });

        if (!error) path = "/dashboard";
    }

    const response = NextResponse.redirect(new URL(path, request.url));

    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("Referrer-Policy", "no-referrer");
    
    return response;
}
