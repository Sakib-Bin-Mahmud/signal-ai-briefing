import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_FEEDS } from "@/lib/feeds";
import { buildDigest } from "@/lib/digest";
import { FeedSource } from "@/lib/types";

// Cache for 6 hours — news moves faster than research papers, but this
// still keeps us from re-fetching 10 feeds on every single page load.
export const revalidate = 21600;

export async function POST(req: NextRequest) {
  return handle(req);
}

export async function GET(req: NextRequest) {
  return handle(req);
}

async function handle(req: NextRequest) {
  let feeds: FeedSource[] = DEFAULT_FEEDS;
  try {
    const body = await req.json().catch(() => null);
    if (body?.feeds && Array.isArray(body.feeds) && body.feeds.length > 0) {
      feeds = body.feeds;
    }
  } catch {
    // GET request or no body — use defaults
  }

  const digest = await buildDigest(feeds);
  return NextResponse.json(digest);
}
