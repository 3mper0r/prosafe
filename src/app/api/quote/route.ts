import { createQuoteHandlers } from "@/features/quote/request/http.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const handlers = createQuoteHandlers();
export const GET = handlers.GET;
export const POST = handlers.POST;
