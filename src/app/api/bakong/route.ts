import { NextRequest, NextResponse } from "next/server";

const BAKONG_BASE_URL =
  process.env.BAKONG_BASE_URL ?? process.env.NEXT_PUBLIC_BAKONG_BASE_URL;
const BAKONG_BEARER_TOKEN =
  process.env.BAKONG_BEARER_TOKEN ?? process.env.NEXT_PUBLIC_BAKONG_BEARER_TOKEN;

function jsonError(message: string, status = 400) {
  return NextResponse.json({ message }, { status });
}

export async function POST(req: NextRequest) {
  if (!BAKONG_BASE_URL || !BAKONG_BEARER_TOKEN) {
    return jsonError("Bakong is not configured", 500);
  }

  let md5: string | undefined;
  try {
    const body = await req.json();
    md5 = body?.md5;
  } catch {
    return jsonError("Invalid JSON body");
  }

  if (!md5) return jsonError("md5 is required");
  if (!/^[a-fA-F0-9]{32}$/.test(md5)) {
    return jsonError("md5 must be a 32-character hex string");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const upstream = await fetch(
      `${BAKONG_BASE_URL}/v1/check_transaction_by_md5`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BAKONG_BEARER_TOKEN}`,
        },
        body: JSON.stringify({ md5 }),
        cache: "no-store",
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    const contentType = upstream.headers.get("content-type") || "";
    const payload = contentType.includes("application/json")
      ? await upstream.json()
      : { message: await upstream.text() };

    return NextResponse.json(payload, { status: upstream.status });
  } catch (err) {
    clearTimeout(timeout);
    const message =
      err instanceof Error && err.name === "AbortError"
        ? "Upstream timeout"
        : err instanceof Error
        ? err.message
        : "Upstream error";
    return jsonError(message, 502);
  }
}