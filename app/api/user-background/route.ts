import { pool } from "./../../lib/db";
import { auth } from "./../../lib/auth";

    export async function POST(req: Request) {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
        return new Response("Unauthorized", { status: 401 });
    }
    const { data } = await req.json();

    if (!Array.isArray(data)) {
        return new Response("Invalid payload", { status: 400 });
    }

    for (const item of data) {
        await pool.query(
            `INSERT INTO user_background (user_id, question, answer)
            VALUES ($1, $2, $3)`,
            [session.user.id, item.q, item.a]
        );
    }

    return Response.json({ ok: true });
    }
