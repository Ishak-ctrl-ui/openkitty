export interface InAppPurchase {
  name: string;
  price: string;
  period: "week" | "month" | "year" | "one-time";
}

export interface AppItem {
  id: string;
  slug: string;
  name: string;
  developer: string;
  category: string;
  genres: string[];
  platform: "ios" | "android";
  country: string;
  iconUrl: string;
  price: number;
  priceFormatted: string;
  rating: number;
  ratingCount: number;
  currentRank: number;
  rankYesterday: number;
  rankVelocity: number; // positive = moved up
  momentumScore: number;
  chartType: "grossing" | "free" | "paid";
  estMonthlyDownloads: number;
  estDailyDownloads: number;
  estLifetimeDownloads: number;
  estMonthlyRevenue: number;
  estDailyRevenue: number;
  estLifetimeRevenue: number;
  releaseDate: string;
  releaseYear?: number;
  isNewRelease?: boolean;
  screenshots: string[];
  activeAdsCount: number;
  adPlatforms: string[];
  metaAdLibraryUrl: string;
  iapTiers: InAppPurchase[];
  description: string;
}

export interface AdCreative {
  id: string;
  appId: string;
  appName: string;
  appIcon: string;
  category: string;
  platform: "Meta" | "TikTok" | "Google";
  format: "Video" | "Image" | "Carousel";
  hook: string;
  activeDays: number;
  estimatedSpend: string;
  firstSeen: string;
  thumbnailUrl: string;
  adUrl: string;
}

export interface PaywallItem {
  id: string;
  appId: string;
  appName: string;
  appIcon: string;
  category: string;
  paywallType: "Hard" | "Soft (Freemium)" | "Trial with Toggle";
  screenshotUrl: string;
  headline: string;
  weeklyPrice?: string;
  annualPrice?: string;
  monthlyPrice?: string;
  trialDays?: number;
  discountBadge?: string;
}

export interface ASOKeyword {
  keyword: string;
  popularity: number; // 0-100
  difficulty: number; // 0-100
  topAppRanked: string;
  topAppIcon: string;
  totalCompetitors: number;
}
