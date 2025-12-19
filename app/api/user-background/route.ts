import { pool } from "./../../lib/db";
import { auth } from "./../../lib/auth";

    export async function POST(req: Request) {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { userId, data } = await req.json();

    for (const item of data) {
        await pool.query(
        `INSERT INTO user_background (user_id, question, answer)
        VALUES ($1, $2, $3)`,
        [userId, item.q, item.a]
        );
    }

    return Response.json({ ok: true });
    }
