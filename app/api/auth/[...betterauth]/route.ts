import { auth, withCors } from "../../../lib/auth";

const handler = auth.handler;

export const GET = withCors(handler);
export const POST = withCors(handler);
export const OPTIONS = withCors(handler);
