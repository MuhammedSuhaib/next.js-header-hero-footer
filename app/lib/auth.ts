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

    const ALLOWED_ORIGINS = [
        "https://muhammedsuhaib.github.io",
        "http://localhost:3000",
    ];

    export const withCors = async (req: Request) => {
    const origin = req.headers.get("origin");

    // preflight
    if (req.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": origin ?? "",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Credentials": "true",
            },
        });
    }

    const res = await handler(req);

    if (origin && ALLOWED_ORIGINS.includes(origin)) {
        res.headers.set(
            "Access-Control-Allow-Origin",
            origin
        );
    }
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
