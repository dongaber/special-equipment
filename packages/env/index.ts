import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { config } from "dotenv";

function findEnvFile(startDir = process.cwd()) {
    let currentDir = startDir;

    while (true) {
        const envPath = join(currentDir, ".env");
        if (existsSync(envPath)) return envPath;

        const parentDir = dirname(currentDir);
        if (parentDir === currentDir) return undefined;

        currentDir = parentDir;
    }
}

const envPath = findEnvFile();
if (envPath) config({ path: envPath });

type EnvSource = Record<string, string | undefined>;
type EnvKey = string | readonly string[];

interface EnvField<T> {
    read(source: EnvSource): T;
}

type EnvSchema = Record<string, EnvField<unknown>>;
type InferEnv<TSchema extends EnvSchema> = {
    [Key in keyof TSchema]: TSchema[Key] extends EnvField<infer Value> ? Value : never;
};

function keysFor(key: EnvKey) {
    return Array.isArray(key) ? key : [key];
}

function readRaw(source: EnvSource, key: EnvKey) {
    const keys = keysFor(key);

    for (const currentKey of keys) {
        const value = source[currentKey]?.trim();
        if (value) return value;
    }

    return undefined;
}

function displayKey(key: EnvKey) {
    return keysFor(key).join(" or ");
}

function required(key: EnvKey, source: EnvSource) {
    const value = readRaw(source, key);
    if (!value) throw new Error(`${displayKey(key)} is not set`);
    return value;
}

export function requireEnv(key: string): string {
    return required(key, process.env);
}

export function createEnv<TSchema extends EnvSchema>(
    schema: TSchema,
    source: EnvSource = process.env,
): InferEnv<TSchema> {
    const values = {} as InferEnv<TSchema>;

    for (const key of Object.keys(schema) as Array<keyof TSchema>) {
        values[key] = schema[key].read(source) as InferEnv<TSchema>[typeof key];
    }

    return values;
}

export const field = {
    string(key: EnvKey): EnvField<string> {
        return {
            read: (source) => required(key, source),
        };
    },
    url(key: EnvKey): EnvField<string> {
        return {
            read(source) {
                const value = required(key, source);

                try {
                    new URL(value);
                    return value;
                } catch {
                    throw new Error(`${displayKey(key)} must be a valid URL`);
                }
            },
        };
    },
    port(key: EnvKey, fallback: number): EnvField<number> {
        return {
            read(source) {
                const rawPort = readRaw(source, key) ?? String(fallback);
                const port = Number.parseInt(rawPort, 10);

                if (!Number.isInteger(port) || port <= 0 || port > 65535) {
                    throw new Error(`${displayKey(key)} must be a valid TCP port`);
                }

                return port;
            },
        };
    },
};
