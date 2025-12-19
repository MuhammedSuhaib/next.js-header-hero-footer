import { pool } from "./../../lib/db";

    export async function POST(req: Request) {
    const { username, software, hardware, goal } = await req.json();

    if (!username || !software || !hardware || !goal) {
        return new Response("Bad request", { status: 400 });
    }

    await pool.query(
        `INSERT INTO user_background (username, software, hardware, goal)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (username)
        DO UPDATE SET software=$2, hardware=$3, goal=$4`,
        [username, software, hardware, goal]
    );

    return Response.json({ ok: true });
    }
