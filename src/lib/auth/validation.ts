export function readText(formData: FormData, field: string): string {
    const value = formData.get(field);
    return typeof value === "string" ? value : "";
}

export function validateCredentials(email: string, password: string): string | null {
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return "Informe um e-mail válido.";
    }

    if (!password || new TextEncoder().encode(password).length > 72) {
        return "Informe uma senha de até 72 bytes (acentos podem ocupar mais de um byte).";
    }

    return null;
}

export function validateRegistration(name: string, password: string, confirmation: string): string | null {
    if (name.length < 2 || name.length > 80) return "Informe um nome entre 2 e 80 caracteres.";
    if (password.length < 8) return "Use uma senha com pelo menos 8 caracteres.";
    if (password !== confirmation) return "As senhas precisam ser iguais.";

    return null;
}