import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET!,
    emailAndPassword: { enabled: true },
    database: new Pool({
        connectionString: process.env.DATABASE_URL,
    }),
    cookies: {
        sameSite: "none",
        secure: true,
        domain: ".yourdomain.com",
    },
});

// 👇 ADD ONLY THIS
    const handler = auth.handler;

    export const withCors = async (req: Request) => {
    const origin = req.headers.get("origin");

    if (req.method === "OPTIONS") {
        return new Response(null, {
            headers: {
                "Access-Control-Allow-Origin": origin ?? "",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Credentials": "true",
            },
        });
    }

    const res = await handler(req);

    if (
        origin === "https://muhammedsuhaib.github.io" ||
        origin === "http://localhost:3000"
    ) {
        res.headers.set("Access-Control-Allow-Origin", origin);
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
