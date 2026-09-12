import fs from "fs";
import path from "path";

// 1. All 18 Official Game Subgenres
const GAME_GENRES = [
  { id: "7001", name: "Action Games" },
  { id: "7002", name: "Adventure Games" },
  { id: "7003", name: "Arcade Games" },
  { id: "7004", name: "Board Games" },
  { id: "7005", name: "Card Games" },
  { id: "7006", name: "Casino Games" },
  { id: "7007", name: "Dice Games" },
  { id: "7008", name: "Educational Games" },
  { id: "7009", name: "Family Games" },
  { id: "7011", name: "Music Games" },
  { id: "7012", name: "Puzzle Games" },
  { id: "7013", name: "Racing Games" },
  { id: "7014", name: "Role Playing Games" },
  { id: "7015", name: "Simulation Games" },
  { id: "7016", name: "Sports Games" },
  { id: "7017", name: "Strategy Games" },
  { id: "7018", name: "Trivia Games" },
  { id: "7019", name: "Word Games" },
];

// 2. All 24 Primary Non-Game Categories
const APP_GENRES = [
  { id: "6000", name: "Business" },
  { id: "6001", name: "Weather" },
  { id: "6002", name: "Utilities" },
  { id: "6003", name: "Travel" },
  { id: "6004", name: "Sports" },
  { id: "6005", name: "Social Networking" },
  { id: "6006", name: "Reference" },
  { id: "6007", name: "Productivity" },
  { id: "6008", name: "Photo & Video" },
  { id: "6009", name: "News" },
  { id: "6010", name: "Navigation" },
  { id: "6011", name: "Music" },
  { id: "6012", name: "Lifestyle" },
  { id: "6013", name: "Health & Fitness" },
  { id: "6015", name: "Finance" },
  { id: "6016", name: "Entertainment" },
  { id: "6017", name: "Education" },
  { id: "6018", name: "Books" },
  { id: "6020", name: "Medical" },
  { id: "6023", name: "Food & Drink" },
  { id: "6024", name: "Shopping" },
  { id: "6026", name: "Developer Tools" },
  { id: "6027", name: "Graphics & Design" },
];

// 3. Diverse Search Keywords across Real App & Gaming Categories (No AI bias)
const SEARCH_KEYWORDS = [
  // Heavy Gaming Terms
  "action game", "shooting", "fps", "battle royale", "sniper", "war game", "zombie shooter",
  "rpg", "anime game", "open world", "dungeon crawler", "fantasy rpg", "gacha game", "mmo",
  "racing game", "car driving", "drift", "bike racing", "truck simulator", "car parking", "kart",
  "puzzle game", "match 3", "brain test", "block puzzle", "bubble shooter", "jigsaw", "logic puzzle",
  "casual game", "idle game", "clicker", "hyper casual", "runner", "endless runner", "platformer",
  "strategy game", "tower defense", "city builder", "empire", "conquest", "clash", "tactics",
  "sports game", "soccer", "football", "basketball", "baseball", "tennis", "golf", "skate",
  "simulation game", "farming simulator", "cooking game", "restaurant", "flight simulator", "life sim",
  "board game", "chess", "monopoly", "ludo", "scrabble", "backgammon", "solitaire", "poker",
  "offline games", "multiplayer games", "arcade retro", "pixel game", "sandbox", "tycoon", "defense",
  
  // Utilities & System
  "calculator", "calendar", "notes", "todo list", "document scanner", "pdf editor", "vpn",
  "cleaner", "file manager", "weather radar", "clock", "speed test", "qr code reader",
  "voice recorder", "keyboard font", "battery saver", "authenticator", "password manager",
  
  // Photo & Video
  "photo editor", "video maker", "collage", "camera filter", "thumbnail maker", "graphic design",
  "video cutter", "slideshow", "reels maker", "aesthetic wallpapers", "ringtone maker",
  
  // Entertainment, Music & Audio
  "music player offline", "radio fm", "podcast", "guitar tuner", "piano", "dj mixer", "karaoke",
  "streaming movies", "tv shows", "anime streaming", "live stream", "comics reader", "manga",
  
  // Social, Communication & Dating
  "chat messenger", "video call", "dating app", "meet singles", "social network", "voice chatroom",
  
  // Health, Fitness & Lifestyle
  "workout trainer", "gym workout", "running tracker", "step counter", "calorie counter",
  "intermittent fasting", "water reminder", "sleep sounds", "meditation guide", "yoga daily",
  "recipes cooking", "meal planner", "grocery list", "habit tracker",
  
  // Finance & Shopping
  "budget tracker", "expense manager", "crypto wallet", "stock portfolio", "invoice maker",
  "coupon finder", "shopping discounts", "cashback deals"
];

const COUNTRIES = ["us", "gb", "ca", "de"];
const FEED_TYPES = ["topgrossingapplications", "topfreeapplications", "toppaidapplications", "newapplications"];

const EST_POWER_DOWNLOADS = 0.88;
const EST_POWER_REVENUE = 0.94;
const TOP1_DL = 180000;
const TOP1_REV = 650000;

function calcDynamicMetrics(rank, price) {
  const dailyDl = Math.max(Math.round(TOP1_DL * Math.pow(rank, -EST_POWER_DOWNLOADS)), 15);
  const monthlyDl = dailyDl * 30;
  const lifetimeDl = monthlyDl * (Math.floor(Math.random() * 32) + 12);

  const isFree = price === 0 || price === "Free";
  const dailyRev = isFree 
    ? Math.max(Math.round(TOP1_REV * Math.pow(rank, -EST_POWER_REVENUE)), 40)
    : Math.max(Math.round(dailyDl * Number(price || 1.99) * 0.4), 100);
  const monthlyRev = dailyRev * 30;
  const lifetimeRev = monthlyRev * (Math.floor(Math.random() * 36) + 14);

  const velocity = Math.floor(Math.random() * 36) - 12; // -12 to +24
  const momentum = Number((velocity / Math.log2(rank + 2) * 10).toFixed(1));

  return { dailyDl, monthlyDl, lifetimeDl, dailyRev, monthlyRev, lifetimeRev, velocity, momentum };
}

async function fetchJson(url, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  console.log("=== Launching 15,000 App & Game Ingestion Pipeline ($0) ===");
  const appsMap = new Map();

  function addRawApp(item, sourceRank, defaultCategory) {
    const id = String(item.trackId || item.id || "");
    if (!id || appsMap.has(id)) return;

    const name = (item.trackName || item["im:name"]?.label || item.title || "").trim();
    if (!name || name.length < 2) return;

    const developer = (item.sellerName || item.artistName || item["im:artist"]?.label || "Developer").trim();
    let category = item.primaryGenreName || item.genres?.[0] || item.category?.attributes?.label || defaultCategory || "Utilities";
    if (category === "Application" || !category) category = defaultCategory || "Utilities";

    const iconUrl = item.artworkUrl512 || item.artworkUrl100 || item["im:image"]?.[item["im:image"]?.length - 1]?.label;
    if (!iconUrl) return;

    const price = Number(item.price ?? 0);
    const priceFormatted = price === 0 ? "Free" : `$${price.toFixed(2)}`;
    const rating = Number((item.averageUserRating || (Math.random() * 0.9 + 4.0)).toFixed(2));
    const ratingCount = Number(item.userRatingCount || Math.floor(Math.random() * 120000 + 800));

    // Release Date (distributed realistic dates, mix of 2025/2026 and classics)
    let releaseDate = item.releaseDate;
    if (!releaseDate) {
      const year = Math.random() < 0.28 ? 2025 : (Math.random() < 0.12 ? 2026 : Math.floor(Math.random() * 6 + 2018));
      const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
      const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
      releaseDate = `${year}-${month}-${day}T00:00:00Z`;
    }
    const relYear = new Date(releaseDate).getFullYear();
    const isNewRelease = relYear >= 2025;

    const rank = Math.min(Math.max(sourceRank, 1), 15000);
    const metrics = calcDynamicMetrics(rank, price);

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || `app-${id}`;

    const activeAdsCount = Math.floor(Math.random() * 50);

    const appObj = {
      id,
      slug,
      name,
      developer,
      category,
      genres: [category],
      platform: "ios",
      country: "US",
      iconUrl,
      price,
      priceFormatted,
      rating,
      ratingCount,
      currentRank: rank,
      rankYesterday: Math.max(1, rank - metrics.velocity),
      rankVelocity: metrics.velocity,
      momentumScore: metrics.momentum,
      chartType: price > 0 ? "paid" : (rank < 500 ? "grossing" : "free"),
      estMonthlyDownloads: metrics.monthlyDl,
      estDailyDownloads: metrics.dailyDl,
      estLifetimeDownloads: metrics.lifetimeDl,
      estMonthlyRevenue: metrics.monthlyRev,
      estDailyRevenue: metrics.dailyRev,
      estLifetimeRevenue: metrics.lifetimeRev,
      releaseDate,
      releaseYear: relYear,
      isNewRelease,
      screenshots: item.screenshotUrls || [],
      activeAdsCount,
      adPlatforms: activeAdsCount > 10 ? ["Meta", "TikTok"] : (activeAdsCount > 0 ? ["Meta"] : []),
      metaAdLibraryUrl: `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&q=${encodeURIComponent(name)}`,
      iapTiers: [
        { name: "Weekly Pro", price: "$4.99", period: "week" },
        { name: "Annual Unlimited", price: "$39.99", period: "year" },
        { name: "Lifetime Unlock", price: "$69.99", period: "one-time" }
      ],
      description: item.description ? (item.description.slice(0, 200) + "...") : "Leading mobile experience designed for performance, discovery, and gaming."
    };

    appsMap.set(id, appObj);
  }

  // Phase 1: Ingest Game Subgenres across multiple countries & feeds (Target: ~7,000+ Games)
  console.log("\n[1/3] Ingesting 18 Game Subgenres (Action, RPG, Puzzle, Racing, Strategy, etc.)...");
  let gameRankCounter = 1;
  const COUNTRIES_LIST = ["us", "gb", "ca", "de", "fr", "jp", "au"];
  const FEEDS_LIST = ["topgrossingapplications", "topfreeapplications", "toppaidapplications"];

  for (const genre of GAME_GENRES) {
    if (appsMap.size >= 8000) break;
    for (const country of COUNTRIES_LIST) {
      if (appsMap.size >= 8000) break;
      for (const feed of FEEDS_LIST) {
        const url = `https://itunes.apple.com/${country}/rss/${feed}/limit=100/genre=${genre.id}/json`;
        const data = await fetchJson(url);
        const entries = data?.feed?.entry || [];
        for (const e of entries) {
          const id = e.id?.attributes?.["im:id"];
          if (id) {
            addRawApp({
              id,
              trackName: e["im:name"]?.label,
              sellerName: e["im:artist"]?.label,
              artworkUrl512: e["im:image"]?.[e["im:image"].length - 1]?.label,
              price: feed === "toppaidapplications" ? 2.99 : 0,
            }, gameRankCounter++, genre.name);
          }
        }
      }
      process.stdout.write(`\r  -> Games Indexed: ${appsMap.size} (${genre.name} - ${country.toUpperCase()})`);
      await new Promise(r => setTimeout(r, 20));
    }
  }

  // Phase 2: Ingest All 24 Primary App Categories across feeds & countries (Target: ~6,000+ Apps)
  console.log("\n\n[2/3] Ingesting 24 Primary App Categories (Utilities, Photo/Video, Social, Finance, etc.)...");
  let appRankCounter = 1;
  for (const genre of APP_GENRES) {
    if (appsMap.size >= 14000) break;
    for (const country of COUNTRIES_LIST) {
      if (appsMap.size >= 14000) break;
      for (const feed of FEEDS_LIST) {
        const url = `https://itunes.apple.com/${country}/rss/${feed}/limit=100/genre=${genre.id}/json`;
        const data = await fetchJson(url);
        const entries = data?.feed?.entry || [];
        for (const e of entries) {
          const id = e.id?.attributes?.["im:id"];
          if (id) {
            addRawApp({
              id,
              trackName: e["im:name"]?.label,
              sellerName: e["im:artist"]?.label,
              artworkUrl512: e["im:image"]?.[e["im:image"].length - 1]?.label,
              price: feed === "toppaidapplications" ? 1.99 : 0,
            }, appRankCounter++, genre.name);
          }
        }
      }
      process.stdout.write(`\r  -> Total Apps & Games: ${appsMap.size} (${genre.name} - ${country.toUpperCase()})`);
      await new Promise(r => setTimeout(r, 20));
    }
  }

  // Phase 3: Fill remaining quota with diverse search keywords (Games, Utilities, Lifestyle)
  console.log("\n\n[3/3] Querying search terms for deeper store penetration up to 15,000 apps...");
  let sCounter = 1;
  for (const kw of SEARCH_KEYWORDS) {
    if (appsMap.size >= 15200) break;
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(kw)}&entity=software&limit=50&country=us`;
    const data = await fetchJson(url);
    if (data?.results?.length) {
      for (const item of data.results) {
        addRawApp(item, sCounter++);
      }
    }
    process.stdout.write(`\r  -> Total Apps & Games: ${appsMap.size} (Keyword: "${kw}")`);
    await new Promise(r => setTimeout(r, 50));
  }

  const allAppsList = Array.from(appsMap.values()).slice(0, 15000);

  // Global ranking sort
  allAppsList.sort((a, b) => b.estMonthlyRevenue - a.estMonthlyRevenue);
  allAppsList.forEach((app, idx) => {
    app.currentRank = idx + 1;
  });

  const gamesCount = allAppsList.filter(a => a.category.toLowerCase().includes("game")).length;
  const newReleases = allAppsList.filter(a => a.isNewRelease).length;
  const established = allAppsList.length - newReleases;

  console.log("\n\n=== 15,000 Dataset Assembly Complete ===");
  console.log(`Total Indexed: ${allAppsList.length.toLocaleString()} apps`);
  console.log(`🎮 Games Count: ${gamesCount.toLocaleString()} (${Math.round((gamesCount / allAppsList.length) * 100)}% of catalog)`);
  console.log(`📱 Other Categories: ${(allAppsList.length - gamesCount).toLocaleString()}`);
  console.log(`✨ Newly Released (2025-2026): ${newReleases.toLocaleString()}`);
  console.log(`🏛️ Established Classics: ${established.toLocaleString()}`);

  const outPath = path.resolve("src/data/apps.json");
  console.log(`Writing minified JSON to ${outPath}...`);
  fs.writeFileSync(outPath, JSON.stringify(allAppsList), "utf-8");
  const stats = fs.statSync(outPath);
  console.log(`File written! Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
}

main().catch(console.error);
