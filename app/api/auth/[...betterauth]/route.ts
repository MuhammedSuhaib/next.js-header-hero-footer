import { withCors } from "./../../../lib/auth";
// export const runtime = "nodejs"; // IMPORTANT

    export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
        "Access-Control-Allow-Origin": "https://muhammedsuhaib.github.io",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Credentials": "true",
        },
    });
    }

export const GET = withCors;
export const POST = withCors;
