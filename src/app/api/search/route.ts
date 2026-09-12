import { NextResponse } from "next/server";
import { allApps } from "@/lib/data";
import { searchWholeStoreLive } from "@/lib/store-live";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  const live = searchParams.get("live") === "true";

  if (!q) {
    return NextResponse.json({ results: allApps.slice(0, 48) });
  }

  // 1. Search local 2,050 apps
  const localMatches = allApps.filter(a => 
    a.name.toLowerCase().includes(q) ||
    a.developer.toLowerCase().includes(q) ||
    a.category.toLowerCase().includes(q)
  );

  // 2. If live search requested OR fewer than 4 local matches, query the whole store live
  if (live || localMatches.length < 4) {
    const liveMatches = await searchWholeStoreLive(q);
    
    // Deduplicate against local matches
    const seenIds = new Set(localMatches.map(a => a.id));
    const combined = [...localMatches];
    for (const item of liveMatches) {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        combined.push(item);
      }
    }
    return NextResponse.json({ results: combined, fromLiveStore: true });
  }

  return NextResponse.json({ results: localMatches, fromLiveStore: false });
}
