"use client";

import Link from "next/link";
import { AppItem } from "@/lib/types";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Star, 
  ExternalLink, 
  Eye, 
  DollarSign, 
  Download 
} from "lucide-react";

interface AppCardProps {
  app: AppItem;
  viewMode?: "grid" | "table";
}

export default function AppCard({ app, viewMode = "grid" }: AppCardProps) {
  const isClimbing = app.rankVelocity > 0;
  const isFalling = app.rankVelocity < 0;

  if (viewMode === "table") {
    return (
      <tr className="border-b border-zinc-800/60 hover:bg-zinc-900/60 transition text-sm">
        {/* Rank */}
        <td className="py-3 px-3 sm:px-4 font-mono font-bold text-zinc-400 text-xs sm:text-sm">
          #{app.currentRank}
        </td>

        {/* App Info */}
        <td className="py-3 px-3 sm:px-4">
          <Link href={`/app/${app.slug}`} className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 sm:h-11 sm:w-11 shrink-0 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 group-hover:border-zinc-500 transition">
              {app.iconUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={app.iconUrl}
                  alt={app.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="h-full w-full bg-zinc-800" />
              )}
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-white group-hover:text-zinc-300 transition truncate max-w-[140px] sm:max-w-[220px]">
                  {app.name}
                </span>
                {app.isNewRelease && (
                  <span className="shrink-0 rounded bg-white/10 border border-white/20 px-1.5 py-0.2 text-[9px] font-bold text-white">
                    NEW {app.releaseYear}
                  </span>
                )}
              </div>
              <span className="text-xs text-zinc-400 truncate max-w-[140px] sm:max-w-[200px]">
                {app.developer} • {app.releaseYear || "Classic"}
              </span>
            </div>
          </Link>
        </td>

        {/* Category */}
        <td className="py-3 px-4 hidden md:table-cell">
          <span className="rounded-md bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-xs text-zinc-300 font-medium">
            {app.category}
          </span>
        </td>

        {/* Est. Monthly Revenue */}
        <td className="py-3 px-3 sm:px-4 font-mono font-semibold text-white">
          {formatCurrency(app.estMonthlyRevenue)}
          <span className="text-[10px] text-zinc-500 font-normal block">/mo</span>
        </td>

        {/* Est. Monthly Downloads */}
        <td className="py-3 px-3 sm:px-4 font-mono text-zinc-300">
          {formatNumber(app.estMonthlyDownloads)}
          <span className="text-[10px] text-zinc-500 font-normal block">/mo</span>
        </td>

        {/* Rating */}
        <td className="py-3 px-4 hidden sm:table-cell">
          <div className="flex items-center gap-1 text-xs text-zinc-300">
            <Star className="h-3 w-3 fill-white text-white" />
            <span className="font-semibold text-white">{app.rating.toFixed(1)}</span>
            <span className="text-zinc-500">({formatNumber(app.ratingCount)})</span>
          </div>
        </td>

        {/* Velocity */}
        <td className="py-3 px-3 sm:px-4 text-right">
          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
              isClimbing
                ? "bg-zinc-800 text-white border border-zinc-700"
                : isFalling
                ? "bg-zinc-900 text-zinc-400 border border-zinc-800"
                : "bg-zinc-900 text-zinc-500"
            }`}
          >
            {isClimbing && <ArrowUpRight className="h-3 w-3 text-white" />}
            {isFalling && <ArrowDownRight className="h-3 w-3 text-zinc-400" />}
            {isClimbing ? `+${app.rankVelocity}` : app.rankVelocity}
          </span>
        </td>
      </tr>
    );
  }

  // Grid View (Mobile optimized card)
  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-950 p-4 sm:p-4.5 transition-all duration-200 hover:border-zinc-600 hover:shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
      <div>
        {/* Card Header: Icon, Rank & Details */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative h-13 w-13 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 group-hover:border-zinc-600 transition">
              {app.iconUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={app.iconUrl}
                  alt={app.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="h-full w-full bg-zinc-800" />
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <Link href={`/app/${app.slug}`}>
                <h3 className="font-bold text-white text-sm sm:text-base leading-snug group-hover:text-zinc-200 transition line-clamp-1">
                  {app.name}
                </h3>
              </Link>
              <p className="text-xs text-zinc-400 truncate">{app.developer}</p>
              
              {/* Badges */}
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                <span className="rounded bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-300 font-medium">
                  {app.category}
                </span>
                {app.isNewRelease ? (
                  <span className="rounded bg-white/10 border border-white/20 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    ✨ {app.releaseYear}
                  </span>
                ) : (
                  <span className="rounded bg-zinc-900/80 border border-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-500">
                    {app.releaseYear || "Classic"}
                  </span>
                )}
                {app.priceFormatted !== "Free" && (
                  <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    {app.priceFormatted}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0">
            <span className="font-mono text-xs font-bold text-zinc-500">
              #{app.currentRank}
            </span>
            <span
              className={`mt-1 inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[11px] font-semibold ${
                isClimbing
                  ? "bg-zinc-800 text-white border border-zinc-700"
                  : isFalling
                  ? "bg-zinc-900 text-zinc-400"
                  : "bg-zinc-900 text-zinc-600"
              }`}
            >
              {isClimbing && <ArrowUpRight className="h-3 w-3" />}
              {isFalling && <ArrowDownRight className="h-3 w-3" />}
              {isClimbing ? `+${app.rankVelocity}` : app.rankVelocity}
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-2.5">
          <div>
            <div className="flex items-center gap-1 text-[11px] text-zinc-400">
              <DollarSign className="h-3 w-3 text-zinc-300" />
              <span>Est. Revenue</span>
            </div>
            <div className="mt-0.5 font-mono text-sm sm:text-base font-bold text-white">
              {formatCurrency(app.estMonthlyRevenue)}
              <span className="text-[10px] text-zinc-500 font-normal">/mo</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1 text-[11px] text-zinc-400">
              <Download className="h-3 w-3 text-zinc-300" />
              <span>Est. Downloads</span>
            </div>
            <div className="mt-0.5 font-mono text-sm sm:text-base font-bold text-zinc-200">
              {formatNumber(app.estMonthlyDownloads)}
              <span className="text-[10px] text-zinc-500 font-normal">/mo</span>
            </div>
          </div>
        </div>

        {/* Rating & Ads Pill */}
        <div className="mt-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-zinc-300">
            <Star className="h-3 w-3 fill-white text-white" />
            <span className="font-semibold text-white">{app.rating.toFixed(1)}</span>
            <span className="text-zinc-500">({formatNumber(app.ratingCount)})</span>
          </div>

          {app.activeAdsCount > 0 ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[11px] font-medium text-zinc-300">
              <Eye className="h-3 w-3 text-white" />
              {app.activeAdsCount} Active Ads
            </span>
          ) : (
            <span className="text-[11px] text-zinc-600">No active ads</span>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-4 flex items-center gap-2 border-t border-zinc-800/80 pt-3">
        <Link
          href={`/app/${app.slug}`}
          className="flex-1 rounded-xl bg-white hover:bg-zinc-200 py-2 text-center text-xs font-bold text-black transition-colors"
        >
          View Teardown
        </Link>
        {app.metaAdLibraryUrl && (
          <a
            href={app.metaAdLibraryUrl}
            target="_blank"
            rel="noreferrer"
            title="Inspect live ads in Meta Ad Library"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
