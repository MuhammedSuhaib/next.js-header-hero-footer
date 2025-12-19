import { withCors } from "./../../../lib/auth";
// export const runtime = "nodejs"; // IMPORTANT

    export async function OPTIONS(request: Request) {
    const origin = request.headers.get("origin");

    return new Response(null, {
        status: 204,
        headers: {
        "Access-Control-Allow-Origin": origin === "http://localhost:3000" ? origin : "https://muhammedsuhaib.github.io",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Credentials": "true",
        },
    });
    }

export const GET = withCors;
export const POST = withCors;
