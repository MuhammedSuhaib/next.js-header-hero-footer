import { betterAuth } from "better-auth";
import { Pool } from "pg";
const isProd = process.env.NODE_ENV === "production";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  emailAndPassword: { enabled: true },
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  cookies: {
    sameSite: "none",
    secure: true,
    ...(isProd ? {} : { domain: "localhost" }),
  },
});

export const withCors =
  (fn: (req: Request) => Promise<Response>) =>
  async (req: Request): Promise<Response> => {
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

    const res = await fn(req);

    if (
      origin === "http://localhost:3000" ||
      origin === "https://muhammedsuhaib.github.io"
    ) {
      res.headers.set("Access-Control-Allow-Origin", origin);
    }

    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.headers.set("Access-Control-Allow-Credentials", "true");

    return res;
  };
