    import { auth, withCors } from "../../lib/auth";
    import { NextResponse } from "next/server";

    async function handler(req: Request) {
    const session = await auth.api.getSession({
        headers: req.headers,
    });

    if (!session?.user) {
        return NextResponse.json(null, { status: 401 });
    }

    return NextResponse.json({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
    });
    }
    export const GET = withCors(handler);
