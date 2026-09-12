import AppExplorer from "@/components/AppExplorer";
import { allApps } from "@/lib/data";

export default function HomePage() {
  return (
    <AppExplorer
      initialApps={allApps}
      title="Mobile App Market Intelligence"
      subtitle="Track estimated app revenue, downloads, winning ad campaigns, and rank velocity updated daily."
      defaultSort="revenue"
    />
  );
}
