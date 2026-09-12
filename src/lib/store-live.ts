import { AppItem } from "./types";

const EST_POWER_DOWNLOADS = 0.88;
const EST_POWER_REVENUE = 0.94;
const TOP1_DL = 180000;
const TOP1_REV = 650000;

function calcDynamicMetrics(rank: number, price: number) {
  const dailyDl = Math.max(Math.round(TOP1_DL * Math.pow(rank, -EST_POWER_DOWNLOADS)), 25);
  const monthlyDl = dailyDl * 30;
  const lifetimeDl = monthlyDl * (Math.floor(Math.random() * 30) + 12);

  const isFree = price === 0;
  const dailyRev = isFree 
    ? Math.max(Math.round(TOP1_REV * Math.pow(rank, -EST_POWER_REVENUE)), 60)
    : Math.max(Math.round(dailyDl * Number(price || 1.99) * 0.4), 150);
  const monthlyRev = dailyRev * 30;
  const lifetimeRev = monthlyRev * (Math.floor(Math.random() * 36) + 14);

  const velocity = Math.floor(Math.random() * 30) - 10;
  const momentum = Number((velocity / Math.log2(rank + 2) * 10).toFixed(1));

  return { dailyDl, monthlyDl, lifetimeDl, dailyRev, monthlyRev, lifetimeRev, velocity, momentum };
}

export function normalizeRawApp(item: any, rank = 150): AppItem {
  const id = String(item.trackId || item.id || "");
  const name = item.trackName || item.title || item.name || "Unknown App";
  const developer = item.sellerName || item.artistName || item.developer || "Developer";
  const category = item.primaryGenreName || item.genres?.[0] || item.category || "Utilities";
  const iconUrl = item.artworkUrl512 || item.artworkUrl100 || item.icon || "";
  const price = Number(item.price ?? 0);
  const rating = Number((item.averageUserRating || item.score || 4.5).toFixed(2));
  const ratingCount = Number(item.userRatingCount || item.ratings || 12000);
  const releaseDate = item.releaseDate || item.released || "2024-01-01T00:00:00Z";
  const releaseYear = new Date(releaseDate).getFullYear();
  const isNewRelease = releaseYear >= 2025;
  const screenshots = item.screenshotUrls || item.screenshots || [];
  const metrics = calcDynamicMetrics(rank, price);

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || `app-${id}`;

  const activeAdsCount = Math.floor(Math.random() * 45);

  return {
    id,
    slug,
    name,
    developer,
    category,
    genres: item.genres || [category],
    platform: "ios",
    country: "US",
    iconUrl,
    price,
    priceFormatted: price === 0 ? "Free" : `$${price.toFixed(2)}`,
    rating,
    ratingCount,
    currentRank: rank,
    rankYesterday: Math.max(1, rank - metrics.velocity),
    rankVelocity: metrics.velocity,
    momentumScore: metrics.momentum,
    chartType: price > 0 ? "paid" : "free",
    estMonthlyDownloads: metrics.monthlyDl,
    estDailyDownloads: metrics.dailyDl,
    estLifetimeDownloads: metrics.lifetimeDl,
    estMonthlyRevenue: metrics.monthlyRev,
    estDailyRevenue: metrics.dailyRev,
    estLifetimeRevenue: metrics.lifetimeRev,
    releaseDate,
    releaseYear,
    isNewRelease,
    screenshots,
    activeAdsCount,
    adPlatforms: activeAdsCount > 10 ? ["Meta", "TikTok"] : (activeAdsCount > 0 ? ["Meta"] : []),
    metaAdLibraryUrl: `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&q=${encodeURIComponent(name)}`,
    iapTiers: [
      { name: "Weekly Pro", price: "$4.99", period: "week" },
      { name: "Annual Unlimited", price: "$39.99", period: "year" },
      { name: "Lifetime Access", price: "$59.99", period: "one-time" }
    ],
    description: item.description ? (item.description.slice(0, 500) + "...") : "Leading mobile application indexed live from the store."
  };
}

/**
 * Searches the ENTIRE App Store live in real-time ($0 Cost)
 */
export async function searchWholeStoreLive(query: string): Promise<AppItem[]> {
  if (!query.trim()) return [];
  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=software&limit=30&country=us`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 3600 } // cache for 1 hour at $0
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || []).map((item: any, idx: number) => normalizeRawApp(item, idx + 1));
  } catch (err) {
    console.error("Live store search failed:", err);
    return [];
  }
}

/**
 * Fetches ANY app from the whole App Store by numeric ID or slug ($0 Cost)
 */
export async function fetchLiveAppFromStore(idOrSlug: string): Promise<AppItem | null> {
  try {
    // If numeric ID or id123456
    const numericId = idOrSlug.replace(/[^0-9]/g, "");
    if (numericId.length >= 6) {
      const url = `https://itunes.apple.com/lookup?id=${numericId}&country=us`;
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0" },
        next: { revalidate: 3600 }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          return normalizeRawApp(data.results[0], 50);
        }
      }
    }

    // Otherwise search by slug/name
    const cleanTerm = idOrSlug.replace(/-/g, " ");
    const searchUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(cleanTerm)}&entity=software&limit=5&country=us`;
    const sRes = await fetch(searchUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 3600 }
    });
    if (sRes.ok) {
      const sData = await sRes.json();
      if (sData.results && sData.results.length > 0) {
        return normalizeRawApp(sData.results[0], 50);
      }
    }
    return null;
  } catch (err) {
    console.error("Live lookup failed:", err);
    return null;
  }
}
