import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET!,
    emailAndPassword: { enabled: true },
    database: new Pool({
        connectionString: process.env.DATABASE_URL,
    }),
});

// 👇 ADD ONLY THIS
    const handler = auth.handler;

    export const withCors = async (req: Request) => {
    const res = await handler(req);
    res.headers.set(
        "Access-Control-Allow-Origin",
        "https://muhammedsuhaib.github.io"
    );
    res.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    res.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS"
    );
    res.headers.set(
    "Access-Control-Allow-Credentials",
    "true"
    );
    return res;
    };
