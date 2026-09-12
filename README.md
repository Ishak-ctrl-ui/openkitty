# openkitty 🐱⚡

> **100% Free, Open-Source Mobile App & Game Market Intelligence Platform**  
> Operating at **$0/month** infrastructure & data costs forever.

A sleek, premium, high-performance alternative to AppKittie, Sensor Tower, and Data.ai — designed with a luxury minimalist black-and-white theme, built for product managers, indie hackers, and app founders.

---

## 🌟 Core Features

- **Whole Store Intelligence Bridge**: Combines an indexed database of **15,000+ top apps & games** with an on-demand live store query engine (`/api/search?live=true` and dynamic `/app/[slug]`) to query all 5,000,000+ apps across the entire App Store and Google Play Store.
- **Interactive Genre Performance Charts (`/charts`)**: Fully customizable comparative analytics engine where users can compare revenues, download volumes, market share %, and average revenue per app across 18 game subgenres and 24 utility categories.
- **✨ Latest Releases Filter (2025–2026)**: Instant toggle to explore 5,100+ breakout apps and games released in the current year.
- **Trending & Momentum (`/trending`)**: Real-time tracking of apps climbing store ranks with high adoption velocity.
- **Rising Stars (`/rising`)**: Breakout newcomers with rapid 24-hour rank ascents.
- **Mobile Ad Creative Spy (`/ads`)**: Active ad creatives across Meta (FB/IG) and TikTok with 1-click inspection directly in Meta Ad Library.
- **Paywall & Onboarding Teardowns (`/onboarding`)**: Subscription pricing architectures, annual vs weekly tier pricing, and free-trial conversion structures.
- **ASO Keyword Radar (`/aso`)**: High-intent App Store search queries, search popularity ratings, keyword difficulty scores, and competitor density.
- **App Deep-Dive Teardowns (`/app/[slug]`)**: Instant financial teardown, monthly revenue & download velocity, in-app purchases, and high-res store screenshots.

---

## 🛠️ Tech Stack & $0 Architecture

| Layer | Technology | Monthly Cost |
|---|---|---|
| **Framework** | Next.js 15 (App Router, React 19, TypeScript) | **$0** |
| **Styling** | Tailwind CSS v3 (Minimalist Luxury Monochrome) | **$0** |
| **Hosting** | Vercel Hobby Tier / Cloudflare Pages | **$0** |
| **Data Engine** | Apple RSS + iTunes Lookup + Google Play Bridge | **$0** |
| **Media Delivery** | Streamed directly from Apple/Google CDNs | **$0** |
| **Total Cost** | **Zero Data or Subscription Fees** | **$0.00 / month** |

---

## 🚀 Quick Start

### 1. Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/openkitty.git
cd openkitty

# Install dependencies with pnpm
pnpm install

# Start the development server
pnpm dev

# Or build and launch the production server
pnpm build
pnpm start
```

Visit `http://localhost:3000` in your browser.

---

## 🚢 Deploy to Vercel at $0

1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) (free Hobby account).
3. Click **"Add New Project"** and import your `openkitty` repository.
4. Leave all build settings as default (Framework: **Next.js**).
5. Click **"Deploy"** — your platform is live globally on a free `.vercel.app` domain with automatic HTTPS and edge caching!

---

## 📜 License

MIT License — free for personal and commercial use.
