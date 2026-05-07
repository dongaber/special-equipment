export function requireEnv(key: string): string {
    const value = process.env[key]?.trim();
    if (!value) throw new Error(`${key} is not set`);
    return value;
}
