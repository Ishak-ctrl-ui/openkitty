import AppExplorer from "@/components/AppExplorer";
import { getTrendingApps } from "@/lib/data";

export default function TrendingPage() {
  const trending = getTrendingApps();

  return (
    <AppExplorer
      initialApps={trending}
      title="Trending & Breakout Apps"
      subtitle="Mobile apps gaining the fastest rank momentum, climbing daily store ranks with rapid adoption velocity."
      defaultSort="momentum"
    />
  );
}
