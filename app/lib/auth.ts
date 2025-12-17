import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET!,
    emailAndPassword: { enabled: true },
    database: new Pool({
        connectionString: process.env.DATABASE_URL,
    }),
});
