import appsRaw from "@/data/apps.json";
import { AppItem, AdCreative, PaywallItem, ASOKeyword } from "./types";

export const allApps: AppItem[] = appsRaw as unknown as AppItem[];

export function getAppBySlug(slug: string): AppItem | undefined {
  return allApps.find((a) => a.slug === slug || a.id === slug);
}

export function getTrendingApps(): AppItem[] {
  return [...allApps].sort((a, b) => b.momentumScore - a.momentumScore);
}

export function getRisingApps(): AppItem[] {
  // Prioritize newly released apps (2025-2026) with climbing rank velocity
  return [...allApps].sort((a, b) => {
    const aNew = a.isNewRelease ? 1 : 0;
    const bNew = b.isNewRelease ? 1 : 0;
    if (aNew !== bNew) return bNew - aNew;
    return b.rankVelocity - a.rankVelocity;
  });
}

export function getAdCreatives(): AdCreative[] {
  const creatives: AdCreative[] = [];
  const hooks = [
    "Stop wasting hours editing videos manually with this AI shortcut",
    "How top creators are generating 10x more engagement",
    "The 1 habit that changed my daily productivity forever",
    "Try this before spending hundreds on expensive subscriptions",
    "Why 2M+ users switched to this over default mobile tools",
    "Hidden feature that 90% of people don't know exists",
    "POV: You discovered the cleanest workflow for 2026",
    "Transform your raw audio in 30 seconds with zero effort"
  ];

  allApps.filter(a => a.activeAdsCount > 0).forEach((app, idx) => {
    const screenshot = app.screenshots[0] || app.iconUrl;
    creatives.push({
      id: `ad-${app.id}-1`,
      appId: app.id,
      appName: app.name,
      appIcon: app.iconUrl,
      category: app.category,
      platform: app.adPlatforms.includes("TikTok") ? "TikTok" : "Meta",
      format: idx % 3 === 0 ? "Video" : (idx % 3 === 1 ? "Carousel" : "Image"),
      hook: hooks[idx % hooks.length],
      activeDays: 14 + (idx * 7) % 60,
      estimatedSpend: `$${(app.activeAdsCount * 850).toLocaleString()}`,
      firstSeen: "2026-08-15",
      thumbnailUrl: screenshot,
      adUrl: app.metaAdLibraryUrl
    });
  });

  return creatives;
}

export function getPaywalls(): PaywallItem[] {
  const paywalls: PaywallItem[] = [];
  allApps.filter(a => a.screenshots && a.screenshots.length > 0).forEach((app, idx) => {
    // Pick 2nd or 3rd screenshot which typically displays the premium features or paywall
    const screenshot = app.screenshots[1] || app.screenshots[0];
    paywalls.push({
      id: `pw-${app.id}`,
      appId: app.id,
      appName: app.name,
      appIcon: app.iconUrl,
      category: app.category,
      paywallType: idx % 3 === 0 ? "Hard" : (idx % 3 === 1 ? "Trial with Toggle" : "Soft (Freemium)"),
      screenshotUrl: screenshot,
      headline: `Unlock Unlimited ${app.name} Pro`,
      weeklyPrice: "$4.99 / week",
      monthlyPrice: "$12.99 / month",
      annualPrice: "$39.99 / year",
      trialDays: idx % 2 === 0 ? 3 : 7,
      discountBadge: idx % 2 === 0 ? "Save 60%" : undefined
    });
  });
  return paywalls;
}

export function getASOKeywords(): ASOKeyword[] {
  const keywords = [
    { kw: "ai photo editor", pop: 88, diff: 76, appId: "chatgpt" },
    { kw: "habit tracker free", pop: 74, diff: 54, appId: "chatgpt" },
    { kw: "video captions ai", pop: 82, diff: 68, appId: "youtube" },
    { kw: "budget planner monthly", pop: 69, diff: 49, appId: "chatgpt" },
    { kw: "workout planner home", pop: 85, diff: 72, appId: "tiktok" },
    { kw: "background remover video", pop: 79, diff: 63, appId: "youtube" },
    { kw: "podcast player offline", pop: 63, diff: 42, appId: "youtube" },
    { kw: "sleep sounds white noise", pop: 81, diff: 58, appId: "tiktok" },
    { kw: "pdf scanner ocr", pop: 86, diff: 77, appId: "chatgpt" },
    { kw: "language learning speaking", pop: 77, diff: 61, appId: "chatgpt" },
  ];

  return keywords.map((k, i) => {
    const matchedApp = allApps[i % allApps.length] || allApps[0];
    return {
      keyword: k.kw,
      popularity: k.pop,
      difficulty: k.diff,
      topAppRanked: matchedApp.name,
      topAppIcon: matchedApp.iconUrl,
      totalCompetitors: 140 + i * 23
    };
  });
}
