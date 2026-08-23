import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_FEEDS } from "@/lib/feeds";
import { buildDigest } from "@/lib/digest";
import { sendDigestEmail } from "@/lib/email";

// Vercel Cron hits this on a schedule (see vercel.json). If CRON_SECRET is
// set, only requests carrying it are honored — prevents anyone else from
// triggering (and consuming your Resend quota on) this route.
export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const digest = await buildDigest(DEFAULT_FEEDS);
  const result = await sendDigestEmail(digest);

  if (!result.ok) {
    return NextResponse.json({ sent: false, reason: result.detail }, { status: 500 });
  }

  return NextResponse.json({
    sent: true,
    totalScanned: digest.totalScanned,
    generatedAt: digest.generatedAt,
  });
}
